import { useState } from 'react';
import AddCommentDialog from './AddCommentDialog';
import '@fortawesome/fontawesome-free/css/all.min.css';

const API_BASE_URL = 'http://127.0.0.1:7001';

const CommentCard = ({ username, comment, size='0.75em' }) => {
    const [isLiked, setIsLiked] = useState(true);
    const [likeCount, setLikeCount] = useState(0);
    const [showReplyDialog, setShowReplyDialog] = useState(false);

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

    const addReply = (formData) => {
        axios.post(`${API_BASE_URL}/reply`, formData).then(response => {
            console.log(response.message);
        }).catch(error => {
            handleAxiosError(error);
        })
    }
    
    return (
        <>
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 transition-all duration-300 hover:shadow-md">
            <div className="flex items-start">
                {/* 用户头像 */}
                <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
                        <img src={`http://127.0.0.1:7001/user/avatar/${comment.userId}`} alt={comment.username} className="w-full h-full object-cover" />
                    </div>
                </div>
                
                {/* 评论内容 */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-neutral-800">{comment.username}</h4>
                        <span className="text-xs text-neutral-400">{comment.time.split('T')[0]}  {comment.time.split('T')[1]}</span>
                    </div>
                    
                    <p className="text-neutral-600 mb-3">{comment.content}</p>
                    
                    {/* 点赞和回复按钮 */}
                    <div className="flex items-center text-sm justify-between">
                        {/* 点赞按钮 - 使用爱心图标 */}
                        <button
                            onClick={() => console.log('dianzan')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                                isLiked 
                                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            aria-label={isLiked ? "取消点赞" : "点赞"}
                            style={{ fontSize: size }}
                        >
                            {/* 纯CSS绘制的爱心图标 */}
                            <div 
                                className={'relative transition-all duration-300 hover:scale-110'}
                                style={{ 
                                    width: '1em', 
                                    height: '1em',
                                    transform: 'rotate(-45deg)',
                                    marginBottom: '0.15em'
                                }}
                            >
                                <div 
                                    className={`absolute transition-colors duration-300 ${
                                        isLiked ? 'bg-red-500' : 'bg-current'
                                    }`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        top: '-50%',
                                        left: '0'
                                    }}
                                />
                                <div 
                                    className={`absolute transition-colors duration-300 ${
                                        isLiked ? 'bg-red-500' : 'bg-current'
                                    }`}
                                    style={{
                                       width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        top: '0',
                                        left: '50%'
                                    }}
                                />
                                <div 
                                    className={`absolute transition-colors duration-300 ${
                                        isLiked ? 'bg-red-500' : 'bg-current'
                                    }`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        top: '0',
                                        left: '0'
                                    }}
                                />
                            </div>
                        </button>
                        <span>{comment.likes}</span>
                        
                        {/* 回复按钮 - 添加悬浮下划线效果 */}
                        <button className="flex items-center text-neutral-500 hover:text-primary transition-colors group ml-auto"
                            onClick={() => setShowReplyDialog(true)}
                        >
                             <i className="fa fa-reply mr-1 group-hover:underline transition-all"></i>
                            <span className="group-hover:underline transition-all">回复</span>
                        </button>
                    </div>
                    
                    {/* 回复列表 */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-neutral-100">
                            {comment.replies.map((reply, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <h5 className="font-medium text-neutral-700">{reply.username}</h5>
                                        <span className="text-xs text-neutral-400">{reply.time.split('T')[0]}  {reply.time.split('T')[1]}</span>
                                    </div>
                                    <p className="text-neutral-600 text-sm">{reply.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showReplyDialog && (
            <AddCommentDialog data={{
                    conmmentId: comment.id,
                    username: username,
                    time: new Date().toISOString().slice(0,16),
                }}
                cancel={() => setShowReplyDialog(false)}
                confirm={addReply}
            />
             )}       
        </div>
        </>
    );
};

export default CommentCard;