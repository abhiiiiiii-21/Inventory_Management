import { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../../../navBar/Nav";
import Sidebar from "../../../sidebar/sideBar";

const ProfileCustom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
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
            {/* Profile Header */}
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

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200">
              <NavLink
                to=""
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
                to="financial-transactions"
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
                to="purchase-history"
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

            {/* Content */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Customer ID:</strong> {customer.id || "CUST-0007"}
                </div>
                <div>
                  <strong>Customer Type:</strong> {customer.type || "Business"}
                </div>
                <div>
                  <strong>Contact Person:</strong>{" "}
                  {customer.contactPerson || "Rakesh Mehta"}
                </div>
                <div>
                  <strong>Phone Number:</strong>{" "}
                  {customer.phone || "98789 86757"}
                </div>
                <div>
                  <strong>Email Address:</strong>{" "}
                  {customer.email || "rohannaik@gmail.com"}
                </div>
                <div>
                  <strong>GST Number:</strong>{" "}
                  {customer.gst || "27AABCN1234H1ZV"}
                </div>
                <div className="sm:col-span-2">
                  <strong>Billing Address:</strong>
                  <br />
                  <pre className="whitespace-pre-wrap">
                    {customer.address ||
                      `Sunrise Traders Pvt. Ltd.,
2nd Floor, Vaibhav Chambers,
Andheri East, Mumbai - 400059, Maharashtra, India`}
                  </pre>
                </div>
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

export default ProfileCustom;
