import React from "react";
import { useLocation } from "react-router-dom";

const FinancialSup = () => {
  const location = useLocation();
  const supplier = location.state || JSON.parse(sessionStorage.getItem("selectedSupplier"));

  const financialInfo = {
    "Rohan Naik": {
      totalPurchases: 52000,
      totalPaid: 47000,
      pendingPayables: 5000,
      advancePaid: null,
      creditNotes: 1500,
      lastPaymentDate: "2025-06-05",
      nextPaymentDue: "2025-06-20",
    },
    "Nirav Patel": {
      totalPurchases: 60000,
      totalPaid: 60000,
      pendingPayables: 0,
      advancePaid: 2000,
      creditNotes: 0,
      lastPaymentDate: "2025-06-01",
      nextPaymentDue: "2025-06-18",
    },
  };

  const data = supplier ? financialInfo[supplier.name] : null;

  if (!supplier || !data) {
    return <div className="text-red-500">Financial data not available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <div>
        <strong>Total Purchases:</strong> ₹{data.totalPurchases.toLocaleString()}
      </div>
      <div>
        <strong>Total Paid:</strong> ₹{data.totalPaid.toLocaleString()}
      </div>
      <div>
        <strong>Pending Payables:</strong> ₹{data.pendingPayables.toLocaleString()}
      </div>
      <div>
        <strong>Advance Paid:</strong>{" "}
        {data.advancePaid !== null ? `₹${data.advancePaid.toLocaleString()}` : "N/A"}
      </div>
      <div>
        <strong>Credit Notes:</strong> ₹{data.creditNotes.toLocaleString()}
      </div>
      <div>
        <strong>Last Payment Date:</strong> {data.lastPaymentDate}
      </div>
      <div>
        <strong>Next Payment Due:</strong> {data.nextPaymentDue}
      </div>
    </div>
  );
};

export default FinancialSup;
