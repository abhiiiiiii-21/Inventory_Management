import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../../navBar/nav";
import Sidebar from "../../sidebar/sideBar";

const AddCategory = () => {
  const [categories, setCategories] = useState([
    "Electronics",
    "Furniture",
    "Supplies",
    "Raw Materials",
    "Clothing",
    "Books",
    "Home Goods",
    "Groceries",
    "Tools & Hardware",
  ]);
  const [name, setName] = useState("");


  const isDuplicate = (test, skipIdx = -1) =>
    categories.some(
      (cat, i) => i !== skipIdx && cat.toLowerCase() === test.toLowerCase()
    );


  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    if (isDuplicate(trimmed)) {
      alert("Category already exists!");
      return;
    }

    setCategories((prev) => [...prev, trimmed]);
    setName("");
  };

  /* ---------- edit ---------- */
  const handleEdit = (idx) => {
    const current = categories[idx];
    const updated = prompt("Edit category name:", current);

    if (updated === null) return; // user cancelled
    const trimmed = updated.trim();
    if (!trimmed) return alert("Category name cannot be empty!");

    if (isDuplicate(trimmed, idx)) {
      return alert("That name already exists!");
    }

    setCategories((prev) =>
      prev.map((cat, i) => (i === idx ? trimmed : cat))
    );
  };

  /* ---------- delete ---------- */
  const handleDelete = (idx) => {
    if (!window.confirm("Delete this category?")) return;
    setCategories((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8 space-y-10">
          <h1 className="text-3xl font-semibold text-gray-800">Item Master</h1>

          {/* ---------------------- add form ---------------------- */}
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category Name
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" className="w-full rounded-lg border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"/>
              </div>
              <button type="submit" className="w-32 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition">Submit</button>
            </form>
          </div>

          {/* ---------------------- table ---------------------- */}
          <div className="bg-white shadow rounded-2xl overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1447E6] uppercase text-white text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">S.No</th>
                  <th className="px-6 py-3 text-left">Category Name</th>
                  <th className="px-6 py-3 text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{cat}</td>

                    {/* ---------- action buttons ---------- */}
                    <td className="px-6 py-3">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(idx)}
                          title="Edit"
                          className="p-1 rounded hover:bg-gray-200 transition"
                        >
                          <Pencil className="w-5 h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          title="Delete"
                          className="p-1 rounded hover:bg-gray-200 transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCategory;
