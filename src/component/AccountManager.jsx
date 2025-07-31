import { useState } from 'react';
import { useNavigate } from 'react-router';
import UserAvatar from './UserAvatar';
import ConfirmationDialog from './ConfirmationDialog';
import axios from 'axios';

const AccountManager = ({ id, userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    avatarUrl: userData.avatarUrl,
    username: userData.username,
    password: '',
    confirmPassword: '',
  });

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showLogOutDialog, setShowLogOutDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatarUrl: reader.result,
        }));
        setIsEditingAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const logOut = () => {
    localStorage.setItem('id', '');
    localStorage.setItem('username', '');
    localStorage.setItem('avatarUrl', '');
    navigate('/');
  }

  const logout = () => {
    axios.get(`http://127.0.0.1:7001/user/logout/${id}`).then(response => {
      console.log(response.data.message);
      logOut();
    }).catch(error => {
      if(error.response){
        console.log(error.response.data.message);
      }
      else if(error.request){
        console.log('请求未响应');
      }
      else{
        console.log('请求失败');
      }
    })
  }

  const hasChanges = () => {
    return (
      formData.avatarUrl !== userData.avatarUrl ||
      formData.username !== userData.username ||
      formData.password !== ''
    );
  };

  const handleSubmit = () => {
    if (!hasChanges()) return;

    if (formData.password !== formData.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmUpdate = () => {
    const updatedData = {};

    if (formData.avatarUrl !== userData.avatarUrl) {
      updatedData.avatarUrl = formData.avatarUrl;
    }
    if (formData.username !== userData.username) {
      updatedData.username = formData.username;
    }
    if (formData.password !== '') {
      updatedData.password = formData.password;
    }
    
    onUpdate(updatedData);
    setShowConfirmDialog(false);
  };

  return (
    <div className="pt-28 pl-32 md:pl-64 pb-10">
      <div className="container mx-auto px-4 py-6">
        <div className="container mx-auto mt-8 flex justify-start">
          <button
            className="px-5 py-2.5 rounded-lg font-medium btn-transition flex items-center space-x-2 border border-primary/30 bg-secondary/30 text-primary hover:bg-primary/10 hover:border-primary active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => setShowLogOutDialog(true)}
          >
            <i className="fa fa-sign-out"></i>
            <span>退出登录</span>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <UserAvatar avatarUrl={userData.avatarUrl} size="w-40 h-40" />
          <p className="mt-3 text-lg font-semibold text-gray-800">{userData.username}</p>
        </div>
        {/* 分隔线 */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">修改个人信息</h3>
        </div>
        <div className="px-6 py-6 space-y-6">
          {/* 头像修改区域 */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {isEditingAvatar ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <label className="cursor-pointer">
                    <div className="text-center">
                      {/* 替换为普通文本图标 */}
                      <div className="text-gray-400 text-3xl">
                        <span role="img" aria-label="用户图标">👤</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">上传头像</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={formData.avatarUrl}
                    alt="用户头像"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setIsEditingAvatar(true)}
                    className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    {/* 替换为普通文本图标 */}
                  <span className="text-white">✎</span>
                  </button>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">点击头像更改图片</p>
              {isEditingAvatar && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, avatarUrl: userData.avatarUrl }));
                      setIsEditingAvatar(false);
                    }}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => setIsEditingAvatar(false)}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    确定
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 用户名修改 */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              用户名
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* 密码修改 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              新密码
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="留空则不修改密码"
            />
          </div>

          {/* 确认密码 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              确认新密码
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="再次输入新密码"
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSubmit}
            className={`w-full px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              hasChanges()
                ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                : 'bg-green-100 text-green-700 cursor-not-allowed'
            }`}
          >
            确定修改
          </button>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className={'w-full px-4 py-2 rounded-md font-medium transition-colors duration-300 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
          >
            注销账号
          </button>
        </div>
      </div>

      {/* 确认对话框 */}
      {showConfirmDialog && ( 
        <ConfirmationDialog cancel={() => setShowConfirmDialog(false)} confirm={confirmUpdate}
       prompt={{first: '确定修改', second: '您确定要修改这些信息吗？修改后将立即生效。'}} />
      )}

      {showLogOutDialog && (
        <ConfirmationDialog cancel={() => setShowLogOutDialog(false)} confirm={logOut}
        prompt={{first:'确定退出', second: '您确定退出吗？点击确定将立刻退出。'}} />
      )}

      {showLogoutDialog && (
        <ConfirmationDialog cancel={() => setShowLogoutDialog(false)} confirm={logout}
        prompt={{first:'确定注销', second: '您确定注销该账号吗？点击确定无法找回任何账号信息'}} />
      )}
    </div>
  );
};

export default AccountManager;  