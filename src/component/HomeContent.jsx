
const HomeContent = (props) => {
    return (
        <main className="pt-28 pl-32 md:pl-64 pb-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">嗨，{props.username}</h1>
                        <p className="text-neutral-500">今天准备好一起运动了吗？</p>
                    </div>
                </div>
                <div>
                    <img 
                        src="../../public/image1.png" 
                        alt="示例风景图片" 
                        className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    ></img>
                </div>
            </div>
        </main>
    );
}

export default HomeContent