import { useState, useEffect, useRef } from 'react'
import ActivityCard from './ActivityCard'

const ActivitySquare = ({userId, activities, onClickCard, onSubmit, onCancel}) => {
    // 状态管理
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const prevSearchTerm = useRef(''); // 用于记录上一次的搜索值

    useEffect(() => {
        // 当searchTerm从有值变为空字符串且失去焦点时
        if (searchTerm === '' && prevSearchTerm.current !== '') {
            console.log('zzzzzzzz');
            onCancel();
        }
        // 更新上一次的搜索值
        prevSearchTerm.current = searchTerm;
    }, [searchTerm, onCancel]);
    
    // 处理搜索提交
    const handleSubmit = (e) => {
        e.preventDefault();
        // 确定按钮功能 - 留空
        console.log('搜索提交:', searchTerm);
        onSubmit(searchTerm);
        // 可以在这里添加实际的搜索逻辑
    };

    // 处理取消操作
    const handleCancel = () => {
        // 取消按钮功能 - 留空
        setSearchTerm('');
        console.log('搜索取消');
        onCancel()
        // 可以在这里添加实际的取消逻辑
    };

    // 处理输入变化
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <main className="pt-28 pl-32 md:pl-64 pb-10">
            <div className="container mx-auto px-4 py-6">
                <form 
                    onSubmit={handleSubmit}
                    className={`relative flex items-center transition-all duration-300 mb-6 ${
                        isFocused ? 'scale-105' : 'hover:scale-102'
                    }`}
                >
                    {/* 搜索输入框 */}
                    <input
                        type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="请输入搜索内容..."
                            className="w-full py-3 pl-10 pr-40 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-md"
                    />
      
                    {/* 搜索图标 */}
                    <svg
                        className="absolute left-4 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
      
                    {/* 按钮组 */}
                    <div className="absolute right-2 flex space-x-2">
                        {/* 取消按钮 */}
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={!searchTerm}
                            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                searchTerm
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            取消
                        </button>
        
                        {/* 确定按钮 */}
                        <button
                            type="submit"
                            disabled={!searchTerm.trim()}
                            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                searchTerm.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
                                : 'bg-blue-200 text-blue-400 cursor-not-allowed'
                            }`}
                        >
                            确定
                        </button>
                    </div>
                </form>
                {/* 即将开始的活动 */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">即将开始的活动</h2>
                    </div>

                    <div className="space-y-4">
                        {activities.map(activity => (
                            <ActivityCard userId={userId} key={activity.id} activity={activity} onClickCard={onClickCard} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ActivitySquare;
