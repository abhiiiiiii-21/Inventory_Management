import { useState } from "react";
import dayjs from "dayjs";
import Sidebar from "../../sidebar/sideBar";
import Navbar from "../../navBar/nav";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Added_Items = () => {
  const today = dayjs();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([
    {
      id: 4,
      sku: "CHOCO-ICE",
      description: "Chocolate Ice Cream",
      uom: "Units",
      shelfLife: "365 days",
      batch: "BATCH-001",
      weight: 500,
      leadTime: "6 days",
      safetyStock: 90,
      currentStock: 120,
      expiry: "2025-08-15",
    },
    {
      id: 3,
      sku: "COCOA",
      description: "Cocoa Powder",
      uom: "Kg",
      shelfLife: "180 days",
      batch: "BATCH-002",
      weight: 1200,
      leadTime: "5 days",
      safetyStock: 150,
      currentStock: 170,
      expiry: "2025-10-01",
    },
    {
      id: 2,
      sku: "CREAM",
      description: "Fresh Cream",
      uom: "Litres",
      shelfLife: "10 days",
      batch: "BATCH-003",
      weight: 800,
      leadTime: "4 days",
      safetyStock: 80,
      currentStock: 60,
      expiry: "2025-06-25",
    },
    {
      id: 0,
      sku: "MILK",
      description: "Full Cream Milk",
      uom: "Litres",
      shelfLife: "5 days",
      batch: "BATCH-004",
      weight: 1000,
      leadTime: "3 days",
      safetyStock: 100,
      currentStock: 500,
      expiry: "2025-06-05",
    },
    {
      id: 1,
      sku: "SUGAR",
      description: "Refined Sugar",
      uom: "Kg",
      shelfLife: "365 days",
      batch: "BATCH-005",
      weight: 1000,
      leadTime: "2 days",
      safetyStock: 200,
      currentStock: 300,
      expiry: "2026-05-31",
    }
  ]);

  const [editItem, setEditItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleEditSave = () => {
    setItems(items.map((item) => (item.id === editItem.id ? editItem : item)));
    setEditItem(null);
  };

  const getExpiryStatus = (dateStr) => {
    const daysLeft = dayjs(dateStr).diff(today, "day");
    if (daysLeft < 0) return ["Expired", "bg-red-100 text-red-700"];
    if (daysLeft <= 30) return ["Expiring Soon", "bg-yellow-100 text-yellow-800"];
    return ["Valid", "bg-green-100 text-green-700"];
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8 overflow-x-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex justify-center">
              <input
                type="text"
                placeholder="🔍 Search by SKU or Description"
                className="w-3xl px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm text-sm"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/item-master/add-item")}
                className="flex items-center gap-2 bg-[#1447E6] hover:bg-[#0f3bd0] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 font-bold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add More Items
              </button>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-xl ring-1 ring-gray-200 overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1447E6] text-white text-xs uppercase tracking-wider">
                <tr>
                  {["Batch", "SKU", "Description", "UOM", "Weight", "Shelf Life", "Lead Time", "Safety", "Stock", "Expiry", "Status", "Action"].map((title, i) => (
                    <th key={i} className="px-5 py-3 text-left font-semibold">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items
                  .filter(
                    (item) =>
                      item.sku.toLowerCase().includes(filter.toLowerCase()) ||
                      item.description.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((item) => {
                    const isLow = item.currentStock < item.safetyStock;
                    const [statusLabel, statusClass] = getExpiryStatus(item.expiry);

                    return (
                      <tr
                        key={item.id}
                        className={`transition hover:bg-gray-100 ${
                          isLow ? "bg-red-50" : "bg-white"
                        }`}
                      >
                        <td className="px-5 py-3">{item.batch}</td>
                        <td className="px-5 py-3 font-medium">{item.sku}</td>
                        <td className="px-5 py-3">{item.description}</td>
                        <td className="px-5 py-3">{item.uom}</td>
                        <td className="px-5 py-3">{item.weight}</td>
                        <td className="px-5 py-3">{item.shelfLife}</td>
                        <td className="px-5 py-3">{item.leadTime}</td>
                        <td className="px-5 py-3">{item.safetyStock}</td>
                        <td className={`px-5 py-3 font-bold ${isLow ? "text-red-600" : ""}`}>{item.currentStock}</td>
                        <td className="px-5 py-3">{item.expiry}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-5 py-3 space-x-2">
                          <button onClick={() => setEditItem({ ...item })}>
                            <Pencil size={16} className="text-indigo-600 hover:text-indigo-800" />
                          </button>
                          <button onClick={() => handleDelete(item.id)}>
                            <Trash2 size={16} className="text-red-600 hover:text-red-800" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {editItem && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg space-y-4">
                <h2 className="text-lg font-semibold">Edit Item</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editItem.description}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    className="border p-2 rounded"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={editItem.currentStock}
                    onChange={(e) => setEditItem({ ...editItem, currentStock: Number(e.target.value) })}
                    className="border p-2 rounded"
                    placeholder="Current Stock"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button onClick={() => setEditItem(null)} className="px-4 py-2 bg-gray-200 rounded">
                    Cancel
                  </button>
                  <button onClick={handleEditSave} className="px-4 py-2 bg-indigo-600 text-white rounded">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Added_Items;
