import React from 'react';
import CommentCard from './CommentCard'

const ActivityDetailCard = ({ activity }) => {
const sampleComments = [
        {
            id: 1,
            username: "张三",
            avatar: "https://picsum.photos/id/1001/100/100",
            time: "2小时前",
            content: "这个活动看起来非常有趣，我很期待参加！",
            likes: 12,
            replies: [
                {
                    username: "李四",
                    time: "1小时前",
                    content: "是的，我也报名了，到时见！"
                }
            ]
        },
        {
            id: 2,
            username: "王五",
            avatar: "https://picsum.photos/id/1002/100/100",
            time: "昨天",
            content: "请问需要自备装备吗？",
            likes: 5
        }
    ];
    return (
        <div className="pt-28 pl-32 md:pl-64 pb-10 container mx-auto px-4 py-6">
            {/* 返回按钮 */}
            <div className="mb-6 mt-6">
                <button 
                    // onClick
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <span className="mr-2">←</span>
                    <span>返回活动列表</span>
                </button>
            </div>
            
            {/* 活动标题 */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">{activity.name}</h2>
            </div>
            
            {/* 活动信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <span className="text-primary mr-2">📅</span>
                        <span className="font-medium">活动时间</span>
                    </div>
                    <p className="text-neutral-600">{activity.date}</p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <span className="text-primary mr-2">📍</span>
                        <span className="font-medium">活动地点</span>
                    </div>
                    <p className="text-neutral-600">{activity.location}</p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <span className="text-primary mr-2">⚽</span>
                        <span className="font-medium">活动类型</span>
                    </div>
                    <p className="text-neutral-600">{activity.type}</p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <span className="text-primary mr-2">👥</span>
                        <span className="font-medium">参与人数</span>
                    </div>
                    <p className="text-neutral-600">{activity.participants}人已报名</p>
                </div>
            </div>
            
            {/* 活动描述 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">活动详情</h3>
                <p className="text-neutral-600 leading-relaxed">
                    这是一场精彩的{activity.type}活动，欢迎各位爱好者踊跃参加！活动将在{activity.date}于{activity.location}举行，
                    旨在为大家提供一个交流和锻炼的平台。无论您是初学者还是有经验的选手，都能在这里找到乐趣和挑战。
                </p>
            </div>
            
            {/* 参与按钮 */}
            <div className="mt-8">
                <button 
                    className="w-full py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                        background: 'linear-gradient(135deg, #165DFF 0%, #36BFFA 100%)',
                        color: 'white'
                    }}
                >
                    立即报名参加
                </button>
            </div>
            
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">活动评论 ({sampleComments.length})</h3>
                
                评论列表
                <div className="space-y-4 mb-6">
                    {sampleComments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
                
                {/* 发表评论按钮 */}
                <button 
                    className="w-full py-2 rounded-lg font-medium shadow hover:shadow-md transition-all duration-200 flex items-center justify-center border border-primary text-primary hover:bg-primary/5"
                >
                    <span className="mr-2">💬</span>
                    <span>发表评论</span>
                </button>
            </div>
        </div>
    );
};

export default ActivityDetailCard;    