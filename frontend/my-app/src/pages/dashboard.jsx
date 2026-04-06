export default function DashboardHome() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Products */}
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="mt-2 text-3xl font-bold">128</p>
          </div>
          <div className="text-sm opacity-75 mt-2">All products in inventory</div>
        </div>

        {/* Categories */}
        <div className="bg-green-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">Todays Sale</h3>
            <p className="mt-2 text-3xl font-bold">12</p>
          </div>
          <div className="text-sm opacity-75 mt-2">Today's sale for in nick spare parts</div>
        </div>

        {/* Low Stock */}
        <div className="bg-red-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">Low Stock</h3>
            <p className="mt-2 text-3xl font-bold">5</p>
          </div>
          <div className="text-sm opacity-75 mt-2">Products running out of stock</div>
        </div>

        {/* Registered Users */}
        <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">stockOut</h3>
            <p className="mt-2 text-3xl font-bold">2</p>
          </div>
          <div className="text-sm opacity-75 mt-2">Total product sold</div>
        </div>

      </div>
    </div>
  );
}