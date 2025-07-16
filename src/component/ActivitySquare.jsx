import React from 'react';

const ActivityCard = ({ id, name, type, date, location, participants }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold mr-4"
                    style={{
                        background: 'linear-gradient(135deg, #165DFF 0%, #36BFFA 100%)',
                        color: 'white'
                    }}
                >
                    <span className="text-center">
                        <span className="block text-xs">{date.split('月')[0]}月</span>
                        <span className="block text-lg">{date.split('月')[1].split('日')[0]}</span>
                    </span>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center text-sm text-neutral-500 mt-1">
                        <span>{type}</span>
                        <span className="mx-2">•</span>
                        <i className="far fa-clock mr-1"></i>
                        <span>{date.split(' ')[1]}</span>
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
                <button className="text-white px-4 py-1.5 rounded-lg text-sm hover:shadow-md transition-all"
                    style={{
                        background: 'linear-gradient(135deg, #165DFF 0%, #36BFFA 100%)',
                        color: 'white'
                    }}
                >
                    立即报名
                </button>
            </div>
        </div>
    );
};

const ActivitySquare = () => {
    const upcomingActivities = [
        { id: 1, name: '周末足球友谊赛', type: '足球', date: '7月20日 周六 15:00', location: '东方足球场', participants: 12 },
        { id: 2, name: '晨跑团', type: '跑步', date: '7月18日 周四 06:30', location: '城市公园', participants: 28 },
        { id: 3, name: '羽毛球双打赛', type: '羽毛球', date: '7月19日 周五 19:00', location: '飞翔羽毛球馆', participants: 8 }
    ];
    return (
        <main className="pt-32 pl-16 md:pl-64 pb-10">
            <div className="container mx-auto px-4 py-6">
                {/* 即将开始的活动 */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">即将开始的活动</h2>
                    </div>

                    <div className="space-y-4">
                        {upcomingActivities.map(activity => (
                            <ActivityCard key={activity.id} {...activity} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ActivitySquare;
