import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Navbar from "../../../navBar/Nav";
import Sidebar from "../../../sidebar/sideBar";

const PurchaseCustom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customer =
    location.state || JSON.parse(sessionStorage.getItem("selectedCustomer"));
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    sessionStorage.removeItem("selectedCustomer");
    navigate("/customers");
  };

  const purchaseHistory = [
    {
      invoice: "INV-2023001",
      date: "2025-06-10",
      items: "T-Shirts (x10), Jeans (x5)",
      total: "₹12,500",
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      deliveryStatus: "Delivered",
    },
    {
      invoice: "INV-2023002",
      date: "2025-06-14",
      items: "Jackets (x3)",
      total: "₹7,200",
      paymentStatus: "Partial",
      paymentMethod: "Card",
      deliveryStatus: "Pending",
    },
    {
      invoice: "INV-2023003",
      date: "2025-06-18",
      items: "Shoes (x2), Belts (x4)",
      total: "₹5,850",
      paymentStatus: "Due",
      paymentMethod: "Cash",
      deliveryStatus: "Cancelled",
    },
  ];

  if (!customer) {
    return (
      <div className="ml-64 p-8 text-red-500">Customer data not found.</div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Customer Info Card */}
            <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
              <div className="flex items-center gap-6">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.fullName}`}
                  alt="Customer"
                  className="w-20 h-20 rounded-full border-4 border-blue-600"
                />
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {customer.fullName}
                  </h1>
                  <p className="text-gray-500">{customer.type}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Edit functionality goes here.")}
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-lg text-sm hover:bg-red-200"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="flex gap-6 border-b border-gray-200">
              <NavLink
                to={`/customers/profile/${customer.id}`}
                end
                state={customer}
                className={({ isActive }) =>
                  isActive
                    ? "pb-2 text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "pb-2 text-gray-500 hover:text-blue-600"
                }
              >
                Overview
              </NavLink>
              <NavLink
                to={`/customers/profile/${customer.id}/financial-transactions`}
                state={customer}
                className={({ isActive }) =>
                  isActive
                    ? "pb-2 text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "pb-2 text-gray-500 hover:text-blue-600"
                }
              >
                Financial Transactions
              </NavLink>
              <NavLink
                to={`/customers/profile/${customer.id}/purchase-history`}
                state={customer}
                className={({ isActive }) =>
                  isActive
                    ? "pb-2 text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "pb-2 text-gray-500 hover:text-blue-600"
                }
              >
                Purchase History
              </NavLink>
            </div>

            {/* Purchase Table */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Purchase History
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Invoice No.</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Items Purchased</th>
                      <th className="px-4 py-3">Total Amount</th>
                      <th className="px-4 py-3">Payment Status</th>
                      <th className="px-4 py-3">Payment Method</th>
                      <th className="px-4 py-3">Delivery Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseHistory.map((purchase, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition duration-200 border-t"
                      >
                        <td className="px-4 py-4 font-medium text-blue-600">
                          {purchase.invoice}
                        </td>
                        <td className="px-4 py-4">{purchase.date}</td>
                        <td className="px-4 py-4">{purchase.items}</td>
                        <td className="px-4 py-4 font-semibold text-gray-800">
                          {purchase.total}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              purchase.paymentStatus === "Paid"
                                ? "bg-green-100 text-green-700"
                                : purchase.paymentStatus === "Partial"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {purchase.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4">{purchase.paymentMethod}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              purchase.deliveryStatus === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : purchase.deliveryStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {purchase.deliveryStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 space-x-2">
                          <button
                            onClick={() =>
                              alert(`Viewing invoice for ${purchase.invoice}`)
                            }
                            className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                          >
                            View Invoice
                          </button>
                          <button
                            onClick={() =>
                              alert(`Editing ${purchase.invoice}`)
                            }
                            className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              alert(`Deleting ${purchase.invoice}`)
                            }
                            className="px-2 py-1 text-xs rounded bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this customer profile?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseCustom;
