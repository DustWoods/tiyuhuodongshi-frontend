import { useState } from 'react'

const ActivityCard = ({ id, name, type, date, location, participants }) => {
    const [state, setState] = useState("立即报名");
    const [color, setColor] = useState("blue-500");
    const handleChange = (e) => {
        e.stopPropagation();
        setState("取消报名");
        setColor("red-400");
    }
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
                <button className={`bg-${color} text-white px-4 py-1.5 rounded-lg text-sm hover:shadow-md transition-all`}
                    onClick={(e) => handleChange(e)}
                >
                    {state}
                </button>
            </div>
        </div>
    );
};

export default ActivityCard