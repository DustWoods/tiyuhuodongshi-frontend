import React, { useState } from 'react';
import UserAvatar from './UserAvatar'

const AccountManager = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    avatarUrl: userData.avatarUrl,
    username: userData.username,
    password: '',
    confirmPassword: '',
  });

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
        <div className="flex items-center justify-center">
          <UserAvatar src={formData.avatarUrl} size="w-40 h-40" />
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
      </div>

      {/* 确认对话框 */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl transform transition-all">
            <h3 className="text-lg font-medium text-gray-900 mb-2">确认修改</h3>
            <p className="text-sm text-gray-600 mb-4">您确定要修改这些信息吗？修改后将立即生效。</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                确定修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;  