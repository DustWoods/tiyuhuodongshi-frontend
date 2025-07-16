import React from 'react'
const UserAvatar = ({ src, size = 'w-10 h-10' }) => {
    return (
        <div className="relative">
            <div className={`${size} rounded-full bg-neutral-200 overflow-hidden border-2 border-white shadow-md`}>
                <img src={src} alt="用户头像" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};
// 导航栏组件
const NavBar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-28 flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center">
            <div className="flex-shrink-0 text-[48px] font-bold" style={{
                background: 'linear-gradient(135deg, #165DFF 0%, #36BFFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                体育活动室
            </div>
        </div>
        <div className="flex items-center">
            <UserAvatar src="https://picsum.photos/id/1005/100/100" size="w-26 h-26" />
        </div>
</div>
    );
};

export default NavBar