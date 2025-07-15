import React from 'react'
import { useNavigate } from 'react-router'

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans flex flex-col">
      {/* 主内容区 */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#165DFF]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#36BFFA]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          {/* 标题区域 */}
          <div className="mb-12">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gray-800 leading-tight mb-4">
              <span className="block text-[clamp(1.5rem,3vw,2.5rem)] font-medium mb-2 opacity-80">欢迎来到</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#165DFF] to-[#36BFFA] shadow-sm">体育活动室</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-6">
              找场地，找搭子，开启您的健康生活
            </p>
          </div>
          
          {/* 登录按钮 */}
          <div>
            <button 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#165DFF] to-[#36BFFA] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:from-[#165DFF]/90 hover:to-[#36BFFA]/90 transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              <span>登录</span>
              <i className="fa fa-arrow-right ml-2"></i>
            </button>
            <p className="mt-4 text-gray-500">
              还没有账号？
              <span 
                className="text-[#165DFF] hover:underline cursor-pointer"
                onClick={() => console.log('注册链接被点击')}
              >
                立即注册
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;    