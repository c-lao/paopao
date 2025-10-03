import { BASE_URL } from '../contexts/index';
import { useCrispSimple } from '../hooks/useCrispSimple';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// 注册 ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const FloatingButtons: React.FC = () => {
  // 客服按钮配置 - 预留图片src和链接地址
  const customerServiceConfig = {
    imageSrc: `${BASE_URL}telegram.png`,
    linkUrl: 'https://t.me/popo_CS',
    altText: 'Customer Service',
  };

  // 从 URL 参数获取用户名
  const params = new URLSearchParams(window.location.search);
  const username = params.get('name');

  // 获取 Crisp Website ID
  const websiteId =
    import.meta.env.VITE_CRISP_WEBSITE_ID ||
    'b38d1c1c-3aef-4d57-be8e-753d7551a413';

  // 使用简化的 Crisp Hook
  useCrispSimple({
    username: username || undefined,
    websiteId,
  });

  const handleCustomerServiceClick = () => {
    // 预留：处理客服按钮点击事件
    // 可以在这里添加自定义逻辑，比如打开聊天窗口、跳转链接等
    if (customerServiceConfig.linkUrl) {
      window.open(customerServiceConfig.linkUrl, '_blank');
    }
  };

  return (
    <>
      <div className="right-6.5 fixed flex flex-col gap-4 bottom-24">
        <img
          src={customerServiceConfig.imageSrc}
          alt={customerServiceConfig.altText}
          className="w-14 cursor-pointer"
          onClick={handleCustomerServiceClick}
          title="联系客服"
        />
      </div>
    </>
  );
};

export default FloatingButtons;
