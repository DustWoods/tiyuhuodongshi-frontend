import ActivityCard from './ActivityCard'

const ActivitySquare = ({userId, activities, onClickCard}) => {
    return (
        <main className="pt-28 pl-32 md:pl-64 pb-10">
            <div className="container mx-auto px-4 py-6">
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
