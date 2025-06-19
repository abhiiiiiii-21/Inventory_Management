import { useState } from "react";
import Sidebar from "../../sidebar/sideBar";
import Navbar from "../../navBar/nav";

// Initial state
const initialFormState = {
  itemName: "",
  itemCode: "",
  category: "",
  subCategory: "",
  brand: "",
  dateAdded: "",
  specification: "",
  uom: "",
  openingStock: "",
  openingStockDate: "",
  minStock: "",
  unitPrice: "",
  gstRate: ""
};

// Sub-category options based on category
const subCategoryOptions = {
  Electronics: ["Mobile Phones", "Laptops", "Headphones", "TVs"],
  Furniture: ["Sofas", "Tables", "Chairs", "Beds"],
  Clothing: ["T-Shirts", "Jeans", "Jackets"],
  Groceries: ["Fruits", "Vegetables", "Snacks"],
  Books: ["Novels", "Textbooks", "Comics"],
  "Tools & Hardware": ["Drills", "Hammers", "Screwdrivers"]
};

const ItemMaster = () => {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset subCategory when category changes
    if (name === "category") {
      setForm((prev) => ({ ...prev, category: value, subCategory: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Item Master</h2>

          {/* Item Info */}
          <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Item Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Item Name</label>
                <input name="itemName" value={form.itemName} onChange={handleChange} type="text" placeholder="Enter item name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Item Code</label>
                <input name="itemCode" value={form.itemCode} onChange={handleChange} type="text" placeholder="Enter item code" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange} type="text" placeholder="Enter brand name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Date Added</label>
                <input name="dateAdded" value={form.dateAdded} onChange={handleChange} type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>

              {/* Category + Sub Category in same row */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black">
                  <option value="" disabled>Select Category</option>
                  {Object.keys(subCategoryOptions).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Sub Category</label>
                <select name="subCategory" value={form.subCategory} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black">
                  <option value="" disabled>Select Sub Category</option>
                  {subCategoryOptions[form.category]?.map((subCat, idx) => (
                    <option key={idx} value={subCat}>{subCat}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Specification</label>
                <textarea name="specification" value={form.specification} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500 h-24 resize-none" placeholder="Enter specification..."></textarea>
              </div>
            </div>
          </section>

          {/* UOM */}
          <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Unit of Measurement</h3>
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium text-gray-600 mb-2 block">Select UOM</label>
              <select name="uom" value={form.uom} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black">
                <option value="" disabled>Select UOM</option>
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="ltr">Litres</option>
                <option value="box">Box</option>
              </select>
            </div>
          </section>

          {/* Stock Details */}
          <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Stock Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Opening Stock</label>
                <input name="openingStock" value={form.openingStock} onChange={handleChange} type="number" placeholder="Enter opening stock" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Opening Stock Date</label>
                <input name="openingStockDate" value={form.openingStockDate} onChange={handleChange} type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Minimum Stock Level</label>
                <input name="minStock" value={form.minStock} onChange={handleChange} type="number" placeholder="Enter minimum stock level" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
            </div>
          </section>

          {/* Price Details */}
          <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Price Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">Unit Price</label>
                <input name="unitPrice" value={form.unitPrice} onChange={handleChange} type="number" placeholder="Enter unit price" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">GST Rate (%)</label>
                <input name="gstRate" value={form.gstRate} onChange={handleChange} type="number" placeholder="Enter GST rate" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-500" />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex gap-4 mt-12 justify-center">
            <button onClick={handleReset} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Reset</button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Submit</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ItemMaster;
