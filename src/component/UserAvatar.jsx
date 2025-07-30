
const UserAvatar = ({ avatarUrl, size = 'w-10 h-10' }) => {
    return (
        <div className="relative">
            <div className={`${size} rounded-full bg-neutral-200 overflow-hidden border-2 border-white shadow-md`}>
                <img src={avatarUrl} alt="用户头像" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default UserAvatar