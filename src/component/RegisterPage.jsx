import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:7001/user/register', formData, { 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    })
      .then(response => {
        if(response.data.code == 200){
          setSuccess(true);
        }
      }) 
      .catch(error => {
        if(error.response){
          const errorData = error.response.data;
          setError(errorData.message);
        } 
        else if(error.request){
          console.log('服务器无响应');
          console.log(error);
        }
        else{
          console.log('请求错误');
        }
      });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 font-sans overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="flex-grow flex flex-col justify-center items-center px-4 py-16 relative z-10">
        <div className="w-full max-w-md">
          {success ? (
            // 注册成功提示
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa fa-check text-green-500 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">注册成功!</h2>
              <p className="text-gray-600 mb-6">您已成功注册账号，请跳转到登录页面...</p>
              <Link
                to="/login"
                className="inline-block bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-secondary/90 transform hover:-translate-y-1 transition-all duration-300"
              >
                立即登录
              </Link>
            </div>
          ) : (
            // 注册表单
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">注册账号</span>
                </h2>
                <p className="text-gray-500 mt-2">请填写以下信息创建您的账号</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* 错误提示 */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                {/* 用户名输入 */}
                <div className="mb-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 transition-all outline-none px-4 py-3 text-gray-700"
                      placeholder="请输入用户名"
                    />
                  </div>
                </div>

                {/* 密码输入 */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    密码
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 transition-all outline-none px-4 py-3 text-gray-700"
                      placeholder="请输入密码"
                    />
                  </div>
                </div>

                {/* 确认密码输入 */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    确认密码
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 transition-all outline-none px-4 py-3 text-gray-700"
                      placeholder="请再次输入密码"
                    />
                  </div>
                </div>

                {/* 注册按钮 */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-secondary/90 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <i className="fa fa-user-plus mr-2"></i>注册
                </button>
              </form>

              {/* 分隔线 */}
              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-500">已有账号?</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* 登录链接 */}
              <p className="text-center text-gray-600">
                <Link to="/login" className="text-primary hover:underline font-medium">立即登录</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;    