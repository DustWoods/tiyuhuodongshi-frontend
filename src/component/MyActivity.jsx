import React from 'react';
import ActivityCard from './ActivityCard'

const MyActivity = () => {
    const upcomingActivities = [
        { id: 1, name: '周末足球友谊赛', type: '足球', date: '7月20日 周六 15:00', location: '东方足球场', participants: 12 },
        { id: 2, name: '晨跑团', type: '跑步', date: '7月18日 周四 06:30', location: '城市公园', participants: 28 },
        { id: 3, name: '羽毛球双打赛', type: '羽毛球', date: '7月19日 周五 19:00', location: '飞翔羽毛球馆', participants: 8 }
    ];
    return (
        <main className="pt-32 pl-16 md:pl-64 pb-10">
            <div className="container mx-auto px-4 py-6">
                {/* 我发起的活动 */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">我发起的活动</h2>
                    </div>

                    <div className="space-y-4">
                        {upcomingActivities.map(activity => (
                            <ActivityCard key={activity.id} {...activity} />
                        ))}
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">我参加的活动</h2>
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

export default MyActivity;
