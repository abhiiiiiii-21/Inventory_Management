import React from "react";
import { useLocation } from "react-router-dom";

const HistorySupp = () => {
  const location = useLocation();
  const supplier =
    location.state || JSON.parse(sessionStorage.getItem("selectedSupplier"));

  const purchaseHistory = Array(10).fill({
    orderId: "ORD10123",
    orderDate: "2025-06-01",
    product: "Saffola",
    quantity: "50 L",
    amount: "₹5,500",
    deliveryDate: "2025-06-02",
    status: "Delivered",
  });

  if (!supplier) {
    return <div className="text-red-500">Supplier data not found.</div>;
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800">Purchase History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3">Products Supplied</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Total Amount (₹)</th>
              <th className="px-4 py-3">Delivery Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((entry, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-blue-600 font-medium">{entry.orderId}</td>
                <td className="px-4 py-3">{entry.orderDate}</td>
                <td className="px-4 py-3">{entry.product}</td>
                <td className="px-4 py-3">{entry.quantity}</td>
                <td className="px-4 py-3 font-semibold">{entry.amount}</td>
                <td className="px-4 py-3">{entry.deliveryDate}</td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {entry.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => alert(`Viewing invoice for ${entry.orderId}`)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistorySupp;
