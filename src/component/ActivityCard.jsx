import { useState, useEffect } from 'react';
import axios from 'axios';

// 提取API基础URL，便于维护
const API_BASE_URL = 'http://127.0.0.1:7001/activity';

const ActivityCard = ({ userId, id, name, type, date, location }) => {
    const [state, setState] = useState("立即报名");
    const [participants, setParticipants] = useState("0");
    const [isLoading, setIsLoading] = useState(true); // 补充缺失的loading状态定义

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
            const formData = { userId: userId, activityId: id };
            const response = await axios.post(`${API_BASE_URL}/relationship`, formData);
            const flag = response.data.relationship;
            setState(flag ? '取消报名' : '立即报名');
        } catch (error) {
            handleAxiosError(error);
            setState('立即报名');
        }
    };

    // 使用await重构异步函数，增强可读性
    const fetchParticipants = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/participant/${id}`);
            setParticipants(response.data.data.count);
        } catch (error) {
            handleAxiosError(error);
            setParticipants("0");
        }
    };

    // 初始化加载数据逻辑
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // 并行请求，提升性能
                await Promise.all([fetchRelationship(), fetchParticipants()]);
            } catch (error) {
                console.log('数据加载失败');
            } finally {
                setIsLoading(false); // 无论成功失败都结束加载状态
            }
        };

        loadData();
    }, [userId, id]); // 依赖项正确配置

    // 修正异步处理，统一使用await语法
    const handleChange = async (e) => {
        e.stopPropagation();
        try {
            const formData = { userId: userId, activityId: id };
            const response = await axios.post(`${API_BASE_URL}/participation`, formData);
            console.log(response.data.message);
            // 操作成功后更新数据
            await Promise.all([fetchRelationship(), fetchParticipants()]);
        } catch (error) {
            handleAxiosError(error);
        }
    };
    const moreInf = () => {
        alert("hh");
    }
    return (
        <div className="border border-gray-400 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
            onClick={moreInf}
        >
            <div className="flex items-start">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-semibold mr-4"
                    style={{
                        background: 'linear-gradient(135deg, #165DFF 0%, #36BFFA 100%)',
                        color: 'white'
                    }}
                >
                    <span className="text-center">
                        <span className="block text-xs">{date.split('-')[0]}年</span>
                        <span className="block text-xs">{date.split('-')[1]}月</span>
                        <span className="block text-lg">{date.split('-')[2].split('T')[0]}日</span>
                    </span>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center text-sm text-neutral-500 mt-1">
                        <span>{type}</span>
                        <span className="mx-2">•</span>
                        <i className="far fa-clock mr-1"></i>
                        <span>{date.split('-')[2].split('T')[1]}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 mt-1">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        <span>{location}</span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-neutral-500">
                    <i className="fas fa-users mr-1"></i>
                    <span>{participants}人已报名</span>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button className={`${state === '立即报名'? 'bg-green-500': 'bg-red-500'} text-white px-4 py-1.5 rounded-lg text-sm hover:shadow-md transition-all`}
                    onClick={(e) => handleChange(e)}
                >
                    {state}
                </button>
            </div>
        </div>
    );
};

export default ActivityCard