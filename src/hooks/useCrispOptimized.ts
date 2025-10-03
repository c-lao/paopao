import { useEffect, useRef, useState } from 'react';
import { Crisp } from 'crisp-sdk-web';

interface UseCrispOptimizedOptions {
  username?: string;
  websiteId?: string;
  debug?: boolean;
}

export const useCrispOptimized = ({ 
  username, 
  websiteId, 
  debug = false 
}: UseCrispOptimizedOptions) => {
  const hasConfiguredRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlow, setIsSlow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadTime, setLoadTime] = useState<number>(0);

  const log = (message: string, type: 'info' | 'warn' | 'error' = 'info') => {
    if (debug) {
      const timestamp = new Date().toLocaleTimeString();
      const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : 'ℹ️';
      console.log(`[${timestamp}] ${prefix} [Crisp] ${message}`);
    }
  };

  useEffect(() => {
    if (hasConfiguredRef.current) return;
    hasConfiguredRef.current = true;

    const startTime = Date.now();
    log('开始初始化 Crisp 客服系统');

    const initializeCrisp = async () => {
      try {
        // 获取 Website ID
        const crispWebsiteId = websiteId || import.meta.env.VITE_CRISP_WEBSITE_ID || 'b38d1c1c-3aef-4d57-be8e-753d7551a413';
        
        log(`Website ID: ${crispWebsiteId}`);
        log(`环境变量 VITE_CRISP_WEBSITE_ID: ${import.meta.env.VITE_CRISP_WEBSITE_ID || '未设置'}`);

        // 检查是否已经加载
        if (Crisp.isCrispInjected()) {
          log('Crisp 已经加载，跳过初始化');
          setIsLoading(false);
          setIsReady(true);
          setLoadTime(Date.now() - startTime);
          return;
        }

        // 设置超时检测
        const timeoutTimer = setTimeout(() => {
          log('Crisp 加载超时 (15秒)', 'warn');
          setError('加载超时，请检查网络连接');
          setIsLoading(false);
        }, 15000);

        // 设置慢加载检测
        const slowTimer = setTimeout(() => {
          log('Crisp 加载较慢 (5秒)', 'warn');
          setIsSlow(true);
        }, 5000);

        // 配置 Crisp
        Crisp.configure(crispWebsiteId);
        log('Crisp 配置完成');

        // 初始化全局队列
        const w = window as unknown as { $crisp?: any[] };
        if (!w.$crisp) w.$crisp = [];

        // 处理用户名
        if (username && username.trim()) {
          w.$crisp.push(['set', 'user:nickname', [username.trim()]]);
          log(`用户昵称已设置: ${username.trim()}`);
        }

        // 设置会话数据
        const sessionData = [
          ['source', 'website'],
          ['timestamp', new Date().toISOString()],
          ['load_time', startTime]
        ];

        if (username) {
          sessionData.push(['username', username]);
        }

        w.$crisp.push(['set', 'session:data', [sessionData]]);
        log('会话数据已设置');

        // 监听加载完成事件
        w.$crisp.push(['on', 'session:loaded', () => {
          const loadTime = Date.now() - startTime;
          log(`Crisp 会话已加载，耗时: ${loadTime}ms`);
          
          clearTimeout(timeoutTimer);
          clearTimeout(slowTimer);
          setIsLoading(false);
          setIsSlow(false);
          setIsReady(true);
          setLoadTime(loadTime);
        }]);

        // 监听错误事件
        w.$crisp.push(['on', 'chat:error', (error: any) => {
          log(`聊天错误: ${JSON.stringify(error)}`, 'error');
          setError(error.message || '聊天系统错误');
          setIsLoading(false);
        }]);

        // 监听聊天打开事件
        w.$crisp.push(['on', 'chat:opened', () => {
          log('聊天已打开');
        }]);

        // 监听聊天关闭事件
        w.$crisp.push(['on', 'chat:closed', () => {
          log('聊天已关闭');
        }]);

        // 立即检查 Crisp 是否可用
        const checkCrisp = () => {
          if (Crisp.isCrispInjected()) {
            const loadTime = Date.now() - startTime;
            log(`Crisp 已注入，立即可用，耗时: ${loadTime}ms`);
            clearTimeout(timeoutTimer);
            clearTimeout(slowTimer);
            setIsLoading(false);
            setIsReady(true);
            setLoadTime(loadTime);
          } else {
            // 继续等待
            setTimeout(checkCrisp, 100);
          }
        };

        // 开始检查
        checkCrisp();

      } catch (err) {
        log(`初始化失败: ${err}`, 'error');
        setError(err instanceof Error ? err.message : '初始化失败');
        setIsLoading(false);
      }
    };

    initializeCrisp();
  }, [username, websiteId, debug]);

  const openChat = () => {
    if (Crisp && typeof Crisp.chat.open === 'function') {
      log('打开聊天');
      Crisp.chat.open();
    } else {
      log('聊天功能不可用', 'warn');
    }
  };

  const closeChat = () => {
    if (Crisp && typeof Crisp.chat.close === 'function') {
      log('关闭聊天');
      Crisp.chat.close();
    }
  };

  const hideChat = () => {
    if (Crisp && typeof Crisp.chat.hide === 'function') {
      log('隐藏聊天');
      Crisp.chat.hide();
    }
  };

  const showChat = () => {
    if (Crisp && typeof Crisp.chat.show === 'function') {
      log('显示聊天');
      Crisp.chat.show();
    }
  };

  return {
    isLoading,
    isSlow,
    error,
    isReady,
    loadTime,
    openChat,
    closeChat,
    hideChat,
    showChat,
  };
};
