import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import AddCommentDialog from './AddCommentDialog';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:7001';

const ActivityDetailCard = ({ userId, username, activity, setSideBar }) => {
    const [state, setState] = useState("立即报名");
    const [participants, setParticipants] = useState("0");
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    // 提取公共错误处理函数，减少重复代码
    const handleAxiosError = (error) => {
        if (error.response) {
            console.log(error.response.data.message);
        } else if (error.request) {
            console.log('请求未响应');
        } else {
            console.log('请求失败');
        }
    };

    // 使用await重构异步函数，增强可读性
    const fetchRelationship = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/activity/relationship/${userId}/${activity.id}`);
            setState(response.data.state);
        } catch (error) {
            handleAxiosError(error);
            setState('立即报名');
        }
    };

    // 使用await重构异步函数，增强可读性
    const fetchParticipants = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/activity/participant/${activity.id}`);
            setParticipants(response.data.data.count);
        } catch (error) {
            handleAxiosError(error);
            setParticipants("0");
        }
    };

    // 初始化加载数据逻辑
    useEffect(() => {
        const loadData = async () => {
            try {
                // 并行请求，提升性能
                await Promise.all([fetchRelationship(), fetchParticipants()]);
            } catch (error) {
                console.log('数据加载失败');
            } finally {
                
            }
        };

        loadData();
    }, [userId, activity]); // 依赖项正确配置

    // 修正异步处理，统一使用await语法
    const handleChange = async (e) => {
        e.stopPropagation();
        if(state === '取消活动'){
            setShowCancelDialog(true);
        }
        else{
            try {
                const formData = { userId: userId, activityId: activity.id };
                const response = await axios.post(`${API_BASE_URL}/activity/participation`, formData);
                console.log(response.data.message);
                // 操作成功后更新数据
                await Promise.all([fetchRelationship(), fetchParticipants()]);
            } catch (error) {
                handleAxiosError(error);
            }
        }
    };

    const deleteActivity = () => {
        axios.get(`${API_BASE_URL}/${id}`).then(response => {
            console.log(response.data.message);
            onActivityDeleted && onActivityDeleted();
        }).catch(error => {
            handleAxiosError(error);
        })
    }

    const goBack = () => {
        const src = localStorage.getItem('source');
        localStorage.setItem('sideBar', src);
        setSideBar(src);
    }   

    const addComment = (formData) => {
        axios.post(`${API_BASE_URL}/comment`, formData).then(response => {
            console.log(response.data.message);
        }).catch(error => {
            handleAxiosError(error);
        })
        setShowAddComment(false);
    }
    
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
        <>
        <div className="pt-28 pl-32 md:pl-64 pb-10 container mx-auto px-4 py-6">
            {/* 返回按钮 */}
            <div className="mb-6 mt-6">
                <button 
                    onClick={goBack}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <span className="mr-2">←</span>
                    <span>返回活动列表</span>
                </button>
            </div>
            
            {/* 活动标题 */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">{activity.project}</h2>
            </div>
            
            {/* 活动信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <span className="text-primary mr-2">📅</span>
                        <span className="font-medium">活动时间</span>
                    </div>
                    <p className="text-neutral-600">{activity.date.split('T')[0]}  {activity.date.split('T')[1]}</p>
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
                    <p className="text-neutral-600">{participants}人已报名</p>
                </div>
            </div>
            
            {/* 活动描述 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">活动详情</h3>
                <p className="text-neutral-600 leading-relaxed">
                    {activity.description}
                </p>
            </div>
            
            {/* 参与按钮 */}
            <div className="mt-8">
                <button 
                    className={`${state === '立即报名'? 'bg-green-600': 'bg-red-600'} text-white w-full py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    onClick={handleChange}
                >
                    {state}
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
                    onClick={() => setShowAddComment(true)}
                >
                    <span className="mr-2">💬</span>
                    <span>发表评论</span>
                </button>
            </div>
        </div>
        {showCancelDialog && (
            <ConfirmationDialog cancel={() => setShowCancelDialog(false)} confirm={deleteActivity} 
                prompt={{first: '确定取消活动', second: '您确定取消活动吗？点击确定无法找回任何信息。'}}
            />
        )}
        {showAddComment && (
            <AddCommentDialog data={{
                    activityId: activity.id,
                    userId: userId,
                    username: username,
                    time: new Date().toISOString().slice(0,16),
                }}
                cancel={() => setShowAddComment(false)}
                confirm={addComment}
            />
        )}
        </>
    );
};

export default ActivityDetailCard;    