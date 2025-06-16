import Navbar from "../navBar/nav"
import Sidebar from "../sidebar/sideBar"


const Orders = () => {
  return (
    <div>
        <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex-1 p-8">
            Orders
        </main>
    </div>
    </div>
    </div>
  )
}

export default Orders

