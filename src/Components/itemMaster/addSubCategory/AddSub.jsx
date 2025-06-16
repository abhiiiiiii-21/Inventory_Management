import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../../navBar/nav";
import Sidebar from "../../sidebar/sideBar";

const AddSubCategory = () => {
  const [categories] = useState([
    "Electronics",
    "Furniture",
    "Supplies",
    "Raw Materials",
    "Clothing",
    "Books",
    "Home Appliances",
    "Toys",
    "Beauty Products",
    "Groceries",
    "Tools & Hardware",
    "Footwear",
    "Sports Equipment",
  ]);

  const [subCategories, setSubCategories] = useState([
    { category: "Furniture", sub: "Desks" },
    { category: "Furniture", sub: "Chairs" },
    { category: "Supplies", sub: "Pens" },
    { category: "Supplies", sub: "Notebooks" },
    { category: "Raw Materials", sub: "Wood Planks" },
    { category: "Raw Materials", sub: "Steel Rods" },
    { category: "Electronics", sub: "Monitors" },
    { category: "Electronics", sub: "Smartphones" },
    { category: "Electronics", sub: "Laptops" },
    { category: "Electronics", sub: "Headphones" },
    { category: "Clothing", sub: "T-Shirts" },
    { category: "Clothing", sub: "Jeans" },
    { category: "Books", sub: "Science Fiction" },
    { category: "Books", sub: "History" },
    { category: "Home Appliances", sub: "Refrigerators" },
    { category: "Home Appliances", sub: "Microwaves" },
    { category: "Toys", sub: "Building Blocks" },
    { category: "Toys", sub: "Dolls" },
    { category: "Beauty Products", sub: "Face Creams" },
    { category: "Beauty Products", sub: "Lipsticks" },
    { category: "Groceries", sub: "Rice" },
    { category: "Groceries", sub: "Pulses" },
    { category: "Tools & Hardware", sub: "Hammer" },
    { category: "Tools & Hardware", sub: "Screwdrivers" },
    { category: "Footwear", sub: "Sneakers" },
    { category: "Footwear", sub: "Formal Shoes" },
    { category: "Sports Equipment", sub: "Cricket Bats" },
    { category: "Sports Equipment", sub: "Football" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = subCategoryName.trim();
    if (!selectedCategory || !trimmed) {
      alert("Both fields are required.");
      return;
    }

    const exists = subCategories.some(
      (sc) =>
        sc.category.toLowerCase() === selectedCategory.toLowerCase() &&
        sc.sub.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert("Subcategory already exists in this category.");
      return;
    }

    setSubCategories((prev) => [
      ...prev,
      { category: selectedCategory, sub: trimmed },
    ]);
    setSubCategoryName("");
    setSelectedCategory("");
  };

  const handleEdit = (index) => {
    const current = subCategories[index];
    const newSub = prompt(
      `Edit Sub Category for "${current.category}":`,
      current.sub
    );
    if (!newSub) return;
    const trimmed = newSub.trim();
    if (!trimmed) return alert("Name cannot be empty");

    const exists = subCategories.some(
      (sc, i) =>
        i !== index &&
        sc.category.toLowerCase() === current.category.toLowerCase() &&
        sc.sub.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return alert("That name already exists.");

    const updated = [...subCategories];
    updated[index].sub = trimmed;
    setSubCategories(updated);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8 space-y-10">
          <h1 className="text-3xl font-semibold text-gray-800">
            Sub Category Master
          </h1>

          {/* ---------------------- Add Form ---------------------- */}
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Add Sub Category</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category Name*
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Name</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Sub Category Name*
                </label>
                <input
                  type="text"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  placeholder="Enter Sub Category Name"
                  className="w-full rounded-lg border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-32 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* ---------------------- Table ---------------------- */}
          <div className="bg-white shadow rounded-2xl overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 uppercase text-gray-600 text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">S.No</th>
                  <th className="px-6 py-3 text-left">Category Name</th>
                  <th className="px-6 py-3 text-left">Sub Category Name</th>
                  <th className="px-6 py-3 text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subCategories.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{entry.category}</td>
                    <td className="px-6 py-3">{entry.sub}</td>
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

export default AddSubCategory;
