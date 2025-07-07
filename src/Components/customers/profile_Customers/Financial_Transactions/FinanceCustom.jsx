import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../../../navBar/Nav";
import Sidebar from "../../../sidebar/sideBar";
import { useEffect, useState } from "react";

const FinanceCustom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const customer =
    location.state || JSON.parse(sessionStorage.getItem("selectedCustomer"));

  useEffect(() => {
    if (location.state) {
      sessionStorage.setItem("selectedCustomer", JSON.stringify(location.state));
    }
  }, [location.state]);

  const handleDelete = () => {
    sessionStorage.removeItem("selectedCustomer");
    navigate("/customers");
  };

  if (!customer) {
    return <div className="ml-64 p-8 text-red-500">Customer data not found.</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header Card */}
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

            {/* Tab Navigation */}
            <div className="flex gap-6 border-b border-gray-200">
              <button
                className="pb-2 text-gray-500 hover:text-blue-600"
                onClick={() => navigate(`/customers/profile/${customer.id}`, { state: customer })}
              >
                Overview
              </button>
              <button
                className="pb-2 text-blue-600 border-b-2 border-blue-600 font-medium"
              >
                Financial Transactions
              </button>
              <button
                className="pb-2 text-gray-500 hover:text-blue-600"
                onClick={() =>
                  navigate(`/customers/profile/${customer.id}/purchase-history`, { state: customer })
                }
              >
                Purchase History
              </button>
            </div>

            {/* Financial Info Section */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Financial Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-sm text-gray-700">
                <div>
                  <strong>Outstanding Balance:</strong> ₹21,000
                </div>
                <div>
                  <strong>Credit Limit:</strong> ₹50,000
                </div>
                <div>
                  <strong>Next Payment Due Date:</strong> 2025-06-20
                </div>
                <div>
                  <strong>Total Purchase Value:</strong> ₹102,450
                </div>
                <div>
                  <strong>Average Order Value:</strong> ₹34,150
                </div>
                <div>
                  <strong>Last Payment Date:</strong> 2025-05-11
                </div>
                <div>
                  <strong>Last Payment Amount:</strong> ₹31,300
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Modal */}
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

export default FinanceCustom;
