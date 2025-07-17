import React from 'react';

const CommentCard = ({ comment }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 transition-all duration-300 hover:shadow-md">
            <div className="flex items-start">
                {/* 用户头像 */}
                <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
                        <img src={comment.avatar} alt={comment.username} className="w-full h-full object-cover" />
                    </div>
                </div>
                
                {/* 评论内容 */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-neutral-800">{comment.username}</h4>
                        <span className="text-xs text-neutral-400">{comment.time}</span>
                    </div>
                    
                    <p className="text-neutral-600 mb-3">{comment.content}</p>
                    
                    {/* 点赞和回复按钮 */}
                    <div className="flex items-center text-sm">
                        <button className="flex items-center text-neutral-500 hover:text-primary transition-colors mr-4">
                            <i className="fa fa-thumbs-o-up mr-1"></i>
                            <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center text-neutral-500 hover:text-primary transition-colors">
                            <i className="fa fa-reply mr-1"></i>
                            <span>回复</span>
                        </button>
                    </div>
                    
                    {/* 回复列表 */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-neutral-100">
                            {comment.replies.map((reply, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <h5 className="font-medium text-neutral-700">{reply.username}</h5>
                                        <span className="text-xs text-neutral-400">{reply.time}</span>
                                    </div>
                                    <p className="text-neutral-600 text-sm">{reply.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentCard;