

export default function DashboardHome () {
    return(
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 p-4 text-white">
                <div className="w-70 shadow-lg bg-blue-500 h-32 rounded">
                    Total-product
                    <p className="text-bold text-2xl ">128</p>
                </div>
                <div className="w-70 shadow-lg h-32 bg-blue-500 rounded">
                    <h3 >Categories</h3>
                    <p className="text-bold text-2xl">128</p>
                </div>
                <div className="w-70 shadow-lg h-32 bg-blue-500 rounded">
                    <h3>low-stock</h3>
                    <p className="text-bold text-2xl">5</p>
                </div>
                <div className="w-70 shadow-lg h-32 bg-blue-500 rounded">
                    <h3>Registered_User</h3>
                    <p className="text-bold text-2xl">2</p>
                </div>
            </div>
        </div>
    )
}