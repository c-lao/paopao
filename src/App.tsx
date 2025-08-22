import logo from './assets/logo.png';
import bg001 from './assets/bg001.png';
import btn_win from './assets/btn-win.png';
import { useState } from 'react';
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
      </div>
    </div>
  );
}

function Header() {
  const [active, setActive] = useState(0);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#A3F4FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src={logo} className="w-24" alt="" />

            <div className="w-44 h-10 text-sm items-center bg-white/40 backdrop-blur border p-[3px] border-white rounded-full hidden md:flex">
              <div
                onClick={() => {
                  document.getElementById('home')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                  setActive(0);
                }}
                className={`flex-1 flex items-center justify-center ${
                  active === 0 ? 'bg-white h-full rounded-full' : ''
                }`}
              >
                首页
              </div>
              <div
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                  setActive(1);
                }}
                className={`flex-1 flex items-center justify-center ${
                  active === 1 ? 'bg-white h-full rounded-full' : ''
                }`}
              >
                功能介绍
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                window.open('https://paoscrm.com/#/', '_blank');
              }}
              className="bg-black py-2 px-3 rounded-full text-white text-sm"
            >
              平台快速登录
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-[#A3F4FC] to-white py-16 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                全球出海
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                私域AI客服聚合平台
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              一个平台的互动,连接的是整个世界。多合一聚合便捷聊天·谷歌实时双向翻译·智能快捷多模式回复·指纹浏览器
            </p>
            <div className="flex flex-wrap gap-4">
              <img
                onClick={() => {
                  window.open(
                    'https://s3.ap-southeast-1.amazonaws.com/app.paoscrm.com/bubbles-0.3.2-setup.exe',
                    '_blank'
                  );
                }}
                className="w-44"
                src={btn_win}
                alt=""
              />
            </div>
          </div>

          {/* Right side - Illustration */}
          <img src={bg001} alt="" />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-[#A3F4FC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center text-gray-800">
            <div className="text-3xl lg:text-4xl font-bold mb-2">1000+</div>
            <div className="text-gray-600">下载量</div>
          </div>
          <div className="text-center text-gray-800">
            <div className="text-3xl lg:text-4xl font-bold mb-2">100%</div>
            <div className="text-gray-600">产品好评</div>
          </div>
          <div className="text-center text-gray-800">
            <div className="text-3xl lg:text-4xl font-bold mb-2">1000+</div>
            <div className="text-gray-600">用户</div>
          </div>
          <div className="text-center text-gray-800">
            <div className="text-3xl lg:text-4xl font-bold mb-2">1000+</div>
            <div className="text-gray-600">激活账号</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            产品功能
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            优势强势来袭,多平台引流计数,全球双向翻译,多开独立防封,流畅运行不闪退
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                全球多语言实时翻译 NEW
              </h3>
              <span className="bg-[#A3F4FC]/20 text-[#A3F4FC] text-sm px-3 py-1 rounded-full font-medium">
                NEW
              </span>
            </div>
            <ul className="space-y-3">
              {[
                '支持200+全球语言',
                'DeepL/谷歌专业线路',
                '实时秒翻高准确率',
                '支持境外主流社交APP',
                '安全跨国通信平台',
                '多线路智能切换',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 relative">
            <div className="absolute top-4 right-4 w-16 h-16 bg-[#A3F4FC]/30 rounded-full opacity-30"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              智能营销与用户管理
            </h3>
            <ul className="space-y-3">
              {[
                '多形式营销文案发送',
                '文本/图片/视频支持',
                '多分类分组管理',
                '快速导入导出功能',
                '精准用户画像建立',
                '提升效率30%以上',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
