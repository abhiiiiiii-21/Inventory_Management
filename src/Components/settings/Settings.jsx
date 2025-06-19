import { useState } from "react";
import Sidebar from "../sidebar/sideBar";
import Navbar from "../navBar/nav";

const Settings = () => {
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    expiryAlert: false,
  });

  const [users] = useState([
    { id: 1, name: "Admin User", role: "Admin", email: "admin@example.com" },
    { id: 2, name: "Store Manager", role: "Manager", email: "manager@example.com" },
  ]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    alert("Company profile saved");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h2>

          {/* Company Profile */}
          <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Company Profile</h3>
            <form onSubmit={handleCompanySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Company Name</label>
                <input
                  name="name"
                  value={company.name}
                  onChange={handleCompanyChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400"
                  placeholder="Enter company name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  name="email"
                  value={company.email}
                  onChange={handleCompanyChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  name="phone"
                  value={company.phone}
                  onChange={handleCompanyChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Address</label>
                <input
                  name="address"
                  value={company.address}
                  onChange={handleCompanyChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400"
                  placeholder="Enter address"
                />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Profile
                </button>
              </div>
            </form>
          </section>

          {/* Notifications */}
          <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Notifications</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Low Stock Alert</span>
                <input
                  type="checkbox"
                  checked={notifications.lowStock}
                  onChange={() => handleNotificationToggle("lowStock")}
                  className="w-5 h-5"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Expiry Date Alert</span>
                <input
                  type="checkbox"
                  checked={notifications.expiryAlert}
                  onChange={() => handleNotificationToggle("expiryAlert")}
                  className="w-5 h-5"
                />
              </div>
            </div>
          </section>

          {/* User Roles */}
          <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">User Roles</h3>
            <table className="w-full text-left border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;