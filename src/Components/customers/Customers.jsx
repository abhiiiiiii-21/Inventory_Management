import Navbar from "../navBar/nav"
import Sidebar from "../sidebar/sideBar"


const Customers = () => {
  return (
    <div>
        <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex-1 p-8">
            Customers
        </main>
    </div>
    </div>
    </div>
  )
}

export default Customers
