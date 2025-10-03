import { useEffect, useRef, useState } from 'react';
import { Crisp } from 'crisp-sdk-web';

// Crisp 命令类型定义
type CrispOnSessionLoadedCommand = ['on', 'session:loaded', () => void];
type CrispOnChatErrorCommand = ['on', 'chat:error', (error: any) => void];
type CrispSetUserNicknameCommand = ['set', 'user:nickname', [string]];
type CrispSetSessionDataCommand = [
  'set',
  'session:data',
  [Array<[string, string | number | boolean]>]
];
type CrispQueueCommand = 
  | CrispOnSessionLoadedCommand 
  | CrispOnChatErrorCommand
  | CrispSetUserNicknameCommand 
  | CrispSetSessionDataCommand;

interface UseCrispSimpleOptions {
  username?: string;
  websiteId?: string;
}

export const useCrispSimple = ({ username, websiteId }: UseCrispSimpleOptions) => {
  const hasConfiguredRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlow, setIsSlow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 防止重复初始化
    if (hasConfiguredRef.current) return;
    hasConfiguredRef.current = true;

    const initializeCrisp = async () => {
      try {
        console.log("🔧 初始化 Crisp 客服系统...");
        
        // 使用提供的 websiteId 或环境变量或默认值
        const crispWebsiteId = websiteId || import.meta.env.VITE_CRISP_WEBSITE_ID || 'b38d1c1c-3aef-4d57-be8e-753d7551a413';
        
        console.log("📋 Crisp Website ID:", crispWebsiteId);
        console.log("🌍 环境变量 VITE_CRISP_WEBSITE_ID:", import.meta.env.VITE_CRISP_WEBSITE_ID);

        // 检查 Crisp 是否已经加载
        if (Crisp.isCrispInjected()) {
          console.log("✅ Crisp 已经加载，跳过初始化");
          setIsLoading(false);
          setIsReady(true);
          return;
        }

        // 配置 Crisp
        Crisp.configure(crispWebsiteId);

        // 设置超时检测
        const timeoutTimer = setTimeout(() => {
          console.warn("⏰ Crisp 加载超时");
          setIsSlow(true);
          setIsLoading(false);
        }, 10000); // 10秒超时

        // 设置慢加载检测
        const slowTimer = setTimeout(() => {
          console.warn("🐌 Crisp 加载较慢");
          setIsSlow(true);
        }, 5000); // 5秒慢加载警告

        // 初始化 Crisp 全局队列
        const w = window as unknown as { $crisp?: CrispQueueCommand[] };
        if (!w.$crisp) w.$crisp = [];

        // 处理用户名
        const nicknameParts: string[] = [];
        if (typeof username === 'string' && username.trim().length > 0) {
          nicknameParts.push(username.trim());
        }

        // 监听 Crisp 加载完成事件
        w.$crisp.push(['on', 'session:loaded', () => {
          console.log("🎉 Crisp 会话已加载");
          clearTimeout(timeoutTimer);
          clearTimeout(slowTimer);
          setIsLoading(false);
          setIsSlow(false);
          setIsReady(true);

          // 设置用户昵称
          if (nicknameParts.length > 0) {
            w.$crisp!.push(['set', 'user:nickname', [nicknameParts.join(' ')] as CrispSetUserNicknameCommand[2]]);
            console.log("👤 用户昵称已设置:", nicknameParts.join(' '));
          }

          // 设置会话数据
          const sessionData: Array<[string, string | number | boolean]> = [
            ['source', 'website'],
            ['timestamp', new Date().toISOString()],
          ];

          if (username) {
            sessionData.push(['username', username]);
          }

          w.$crisp!.push(['set', 'session:data', [sessionData] as CrispSetSessionDataCommand[2]]);
          console.log("📊 会话数据已设置");
        }]);

        // 监听 Crisp 错误事件
        w.$crisp.push(['on', 'chat:error', (error: any) => {
          console.error("❌ Crisp 聊天错误:", error);
          setError(error.message || '聊天系统错误');
          setIsLoading(false);
        }]);

        // 立即检查 Crisp 是否可用
        const checkCrisp = () => {
          if (Crisp.isCrispInjected()) {
            console.log("✅ Crisp 已注入，立即可用");
            clearTimeout(timeoutTimer);
            clearTimeout(slowTimer);
            setIsLoading(false);
            setIsReady(true);
          } else {
            // 如果还没注入，继续等待
            setTimeout(checkCrisp, 100);
          }
        };

        // 开始检查
        checkCrisp();

      } catch (err) {
        console.error('❌ [Crisp] 初始化失败:', err);
        setError(err instanceof Error ? err.message : '初始化失败');
        setIsLoading(false);
      }
    };

    initializeCrisp();
  }, [username, websiteId]);

  const openChat = () => {
    if (Crisp && typeof Crisp.chat.open === 'function') {
      Crisp.chat.open();
    } else {
      console.warn('[Crisp] 聊天功能不可用');
    }
  };

  const closeChat = () => {
    if (Crisp && typeof Crisp.chat.close === 'function') {
      Crisp.chat.close();
    }
  };

  const hideChat = () => {
    if (Crisp && typeof Crisp.chat.hide === 'function') {
      Crisp.chat.hide();
    }
  };

  const showChat = () => {
    if (Crisp && typeof Crisp.chat.show === 'function') {
      Crisp.chat.show();
    }
  };

  return {
    isLoading,
    isSlow,
    error,
    isReady,
    openChat,
    closeChat,
    hideChat,
    showChat,
  };
};
