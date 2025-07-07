import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import Sidebar from "../sidebar/sideBar";
import Navbar from "../navBar/nav";
import dayjs from "dayjs";
import { UserPlus, Filter, Download, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const tableRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: "CUST-1010",
      fullName: "Nikhil Sharma",
      phone: "9876543210",
      email: "nikhil@gmail.com",
      product: "Parle-G",
      date: "2025-05-26",
      amountPaid: "₹3529",
      type: "Retail Customers",
    },
    {
      id: "CUST-1011",
      fullName: "Kavita Jain",
      phone: "9847654321",
      email: "kavita@gmail.com",
      product: "Good Day",
      date: "2025-05-24",
      amountPaid: "₹2069",
      type: "Wholesale Customers",
    },
  ]);

  const rowMenu = [
    {
      label: `<div class='flex items-center gap-2 px-2 py-1'>✏️ Edit Customer</div>`,
      action: (_e, row) => row.update({ fullName: "Updated Name" }),
    },
    {
      label: `<div class='flex items-center gap-2 px-2 py-1'>🗑️ Delete Customer</div>`,
      action: (_e, row) => row.delete(),
    },
  ];

  const headerMenu = function () {
    return this.getColumns().map((col) => {
      const wrap = document.createElement("div");
      wrap.className = "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = col.isVisible();
      cb.readOnly = true;
      cb.className = "form-checkbox h-4 w-4 text-blue-600";
      const label = document.createElement("span");
      label.textContent = col.getDefinition().title;
      wrap.appendChild(cb);
      wrap.appendChild(label);
      wrap.addEventListener("click", (e) => {
        e.stopPropagation();
        col.toggle();
        cb.checked = col.isVisible();
      });
      return { label: wrap };
    });
  };

  useEffect(() => {
    const table = new Tabulator(tableRef.current, {
      data,
      layout: "fitColumns",
      height: "auto",
      rowContextMenu: rowMenu,
      pagination: "local",
      paginationSize: 19,
      columns: [
        { title: "Customer ID", field: "id", sorter: "string", headerMenu },
        { title: "Full Name", field: "fullName", sorter: "string", headerMenu },
        { title: "Phone", field: "phone", sorter: "string", hozAlign: "center", headerMenu },
        { title: "Email", field: "email", sorter: "string", headerMenu },
        { title: "Product", field: "product", sorter: "string", headerMenu },
        {
          title: "Date",
          field: "date",
          sorter: "date",
          hozAlign: "center",
          formatter: (c) => dayjs(c.getValue()).format("YYYY-MM-DD"),
          headerMenu,
        },
        {
          title: "Amount Paid",
          field: "amountPaid",
          hozAlign: "right",
          headerMenu,
          sorter: (a, b) =>
            parseInt(a.replace(/[^\d]/g, "")) - parseInt(b.replace(/[^\d]/g, "")),
        },
        {
          title: "Customer Type",
          field: "type",
          sorter: "string",
          headerMenu,
        },
        {
          title: "View",
          formatter: () =>
            "<button class='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>View</button>",
          width: 100,
          hozAlign: "center",
          cellClick: function (e, cell) {
            const rowData = cell.getRow().getData();
            sessionStorage.setItem("selectedCustomer", JSON.stringify(rowData)); // ✅ Save to session
            navigate(`/customers/profile/${rowData.id}`, { state: rowData });
          },
        },
      ],
    });

    const fieldSel = document.getElementById("cust-sort-field");
    const dirSel = document.getElementById("cust-sort-dir");
    document
      .getElementById("cust-sort-btn")
      .addEventListener("click", () => table.setSort(fieldSel.value, dirSel.value));

    return () => table.destroy();
  }, [data]);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCustomer = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: form.fullName.value,
      phone: form.phone.value,
      email: form.email.value,
      product: form.product.value,
      date: form.date.value,
      amountPaid: `₹${form.amountPaid.value}`,
      type: form.type.value,
    };
    setData((prev) => [...prev, newCustomer]);
    form.reset();
    setShowModal(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
        <Navbar />
        <main className="p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          </div>

          {/* Sort Controls */}
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <select id="cust-sort-field" className="px-3 py-2 border rounded">
                <option value="id">Customer ID</option>
                <option value="fullName">Full Name</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="product">Product</option>
                <option value="date">Date</option>
                <option value="amountPaid">Amount Paid</option>
              </select>
              <select id="cust-sort-dir" className="px-3 py-2 border rounded">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <button
                id="cust-sort-btn"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sort Now
              </button>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <UserPlus size={18} /> Add Customer
              </button>
              <button className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                <Filter size={18} /> Filters
              </button>
              <button className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                <Download size={18} /> Download All
              </button>
            </div>
          </div>

          <div ref={tableRef} className="rounded-xl shadow border bg-white" />

          {/* Modal for Add Customer */}
          {showModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
              <form
                onSubmit={handleAddCustomer}
                className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-xl space-y-4 relative"
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X />
                </button>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Customer</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input name="fullName" required className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input name="phone" required className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input name="email" required type="email" className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Product</label>
                    <input name="product" required className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Amount Paid</label>
                    <input name="amountPaid" required type="number" className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <input name="date" required type="date" className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Customer Type</label>
                    <select name="type" required className="input">
                      <option>Retail Customers</option>
                      <option>Wholesale Customers</option>
                      <option>B2B Customers</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Add Customer
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Customers;
