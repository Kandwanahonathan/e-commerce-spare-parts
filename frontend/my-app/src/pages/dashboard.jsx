

export default function DashboardHome () {
    return(
        <div>
            <div className="grid grid-cols-4 p-6  text-white">
                <div className="w-70 shadow-lg bg-blue-500 rounded">
                    <h3>Total-product</h3>
                    <p>128</p>
                </div>
                <div className="w-70 shadow-lg bg-blue-500 rounded">
                    <h3>Categories</h3>
                    <p>128</p>
                </div>
                <div className="w-70 shadow-lg bg-blue-500 rounded">
                    <h3>low-stock</h3>
                    <p>5</p>
                </div>
                <div className="w-70 shadow-lg bg-blue-500 rounded">
                    <h3>Registered_User</h3>
                    <p>2</p>
                </div>
            </div>
        </div>
    )
}