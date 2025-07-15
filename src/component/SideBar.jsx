import React from 'react'

const MenuItem = ({ id, icon, label, isActive, onClick }) => {
    return (
        <button 
            className={`flex items-center w-full px-6 py-3 ${isActive ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-neutral-600 hover:bg-neutral-100 border-l-4 border-transparent'}`}
            onClick={() => onClick(id)}
        >
            <i className={`fa ${icon} text-lg md:text-xl ${isActive ? '' : 'text-neutral-400'}`}></i>
            <span className="ml-4 text-[20px] hidden md:block">{label}</span>
        </button>
    );
};

const CreateActivityButton = () => {
    return (
        <button
            className="w-full py-2 rounded-lg font-medium shadow hover:shadow-md transition-all duration-200 flex items-center justify-center"
            style={{
                background: 'linear-gradient(135deg, #165DFF 0%, #36BFFA 100%)',
                color: 'white'
            }}
        >
            <i className="fa fa-plus mr-2"></i>
            <span className="hidden md:block">创建活动</span>
        </button>
    );
};

const SideBar = ({ activeMenu, setActiveMenu }) => {
    const menuItems = [
        { id: 'dashboard', icon: 'fa-dashboard', label: '首页' },
        { id: 'activities', icon: 'fa-calendar', label: '活动广场' },
        { id: 'my-activities', icon: 'fa-user-circle', label: '我的活动' },
        { id: 'account', icon: 'fa-cog', label: '账号管理' }
    ];
            
    return (
        <aside className="fixed left-0 top-28 bottom-0 w-16 md:w-64 bg-white shadow-md overflow-y-auto transition-all duration-300">
            <div className="py-6">
                {menuItems.map(item => (
                    <MenuItem 
                        key={item.id}
                        id={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeMenu === item.id}
                        onClick={setActiveMenu}
                    />
                ))}
            </div>
                    
            {activeMenu === 'activities' && (
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
                    <CreateActivityButton />
                </div>
            )}
        </aside>
    );
};

export default SideBar