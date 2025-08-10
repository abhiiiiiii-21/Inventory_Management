import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import dayjs from "dayjs";

import Navbar from "../navBar/nav";
import Sidebar from "../sidebar/sideBar";

import {
  AlertTriangle,
  Download,
  Filter,
  List,
  Package,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";

const StatCard = ({ title, value, subtitle, Icon, color }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-white/60 backdrop-blur-sm shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${color}-100 text-${color}-600`}>
      <Icon size={20} strokeWidth={2.2} />
    </div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  </div>
);

const badge = (st) => {
  const base = "px-3 py-0.5 rounded-full text-xs font-medium";
  if (st === "In stock") return `${base} bg-green-100 text-green-700`;
  if (st === "Out of stock") return `${base} bg-red-100 text-red-700`;
  return `${base} bg-yellow-100 text-yellow-700`;
};

const Inventory = () => {
  const navigate = useNavigate();

  const products = [
    { name: "Maggi", price: 430, qty: 43, th: 12, expiry: "11/12/25", status: "In stock", category: "Snacks" },
    { name: "Monster", price: 257, qty: 22, th: 12, expiry: "21/12/25", status: "Out of stock", category: "Beverages" },
    { name: "Red Bull", price: 405, qty: 36, th: 9, expiry: "08/05/25", status: "In stock", category: "Beverages" },
    { name: "Bourn Vita", price: 502, qty: 14, th: 6, expiry: "12/08/25", status: "Out of stock", category: "Beverages" },
    { name: "Horlicks", price: 530, qty: 5, th: 5, expiry: "01/09/26", status: "In stock", category: "Beverages" },
    { name: "Harpic", price: 605, qty: 10, th: 5, expiry: "01/09/26", status: "In stock", category: "Cleaning" },
    { name: "Ariel", price: 408, qty: 23, th: 7, expiry: "15/12/25", status: "Out of stock", category: "Cleaning" },
    { name: "Fanta", price: 359, qty: 43, th: 8, expiry: "06/06/26", status: "In stock", category: "Beverages" },
    { name: "Coca Cola", price: 205, qty: 41, th: 10, expiry: "11/11/25", status: "Low stock", category: "Beverages" },
  ];

  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], []);
  const filtered = useMemo(
    () => products.filter(
      (p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase())
    ),
    [cat, search]
  );

  const tableRef = useRef(null);
  const tableObj = useRef(null);

  const headerMenu = function () {
    const items = [];
    this.getColumns().forEach((col) => {
      const wrap = document.createElement("div");
      wrap.className = "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = col.isVisible();
      cb.readOnly = true;
      cb.className = "form-checkbox h-4 w-4 text-blue-600";
      const span = document.createElement("span");
      span.textContent = col.getDefinition().title;
      wrap.appendChild(cb);
      wrap.appendChild(span);
      wrap.addEventListener("click", (e) => {
        e.stopPropagation();
        col.toggle();
        cb.checked = col.isVisible();
      });
      items.push({ label: wrap });
    });
    return items;
  };

  useEffect(() => {
    tableObj.current = new Tabulator(tableRef.current, {
      layout: "fitColumns",
      height: "auto",
      pagination: "local",
      paginationSize: 10,
      paginationSizeSelector: [5, 10, 20],
      data: filtered,
      columns: [
        { title: "Product", field: "name", sorter: "string", headerMenu },
        {
          title: "Buying Price",
          field: "price",
          sorter: "number",
          headerMenu,
          formatter: (c) => `₹${c.getValue()}`,
          hozAlign: "right",
        },
        {
          title: "Quantity",
          field: "qty",
          sorter: "number",
          headerMenu,
          formatter: (c) => `${c.getValue()} Packets`,
          hozAlign: "right",
        },
        {
          title: "Threshold",
          field: "th",
          sorter: "number",
          headerMenu,
          formatter: (c) => `${c.getValue()} Packets`,
          hozAlign: "right",
        },
        {
          title: "Expiry",
          field: "expiry",
          sorter: "date",
          headerMenu,
          formatter: (c) =>
            dayjs(c.getValue(), "DD/MM/YY").isValid() ? c.getValue() : "Invalid Date",
          sorterParams: { format: "DD/MM/YY" },
        },
        {
          title: "Status",
          field: "status",
          sorter: "string",
          headerMenu,
          formatter: (c) => `<span class="${badge(c.getValue())}">${c.getValue()}</span>`
        },
        {
          title: "View",
          headerSort: false,
          formatter: () =>
            `<button class="view-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">View</button>`,
          width: 100,
          hozAlign: "center",
          cellClick: (_e, cell) => {
            const rowData = cell.getRow().getData();
            console.log("View Product:", rowData);
          },
        },
      ],
    });

    return () => tableObj.current?.destroy();
  }, []);

  useEffect(() => {
    tableObj.current?.replaceData(filtered);
  }, [filtered]);

  const applySort = () => {
    tableObj.current?.setSort(sortField, sortDir);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <Navbar />
        <main className="p-8 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Categories" value="14" subtitle="Last 7 days" Icon={List} color="blue" />
              <StatCard title="Total Products" value="868" subtitle="₹25 000 Revenue" Icon={Package} color="yellow" />
              <StatCard title="Top Selling" value="5" subtitle="₹2 500 Cost" Icon={TrendingUp} color="purple" />
              <StatCard title="Low Stocks" value="12" subtitle="2 not in stock" Icon={AlertTriangle} color="red" />
            </div>
          </section>

          <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200">
            <div className="flex flex-wrap gap-4 items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Products</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => navigate("/inventory/add")}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  <Plus className="mr-2 w-4 h-4" /> Add Product
                </button>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search product…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-2 border rounded-xl text-sm bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="px-3 py-2 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="px-3 py-2 border rounded-xl text-sm bg-white"
                >
                  <option value="name">Products</option>
                  <option value="price">Price</option>
                  <option value="qty">Quantity</option>
                  <option value="th">Threshold</option>
                  <option value="expiry">Expiry</option>
                  <option value="status">Status</option>
                </select>
                <select
                  value={sortDir}
                  onChange={(e) => setSortDir(e.target.value)}
                  className="px-3 py-2 border rounded-xl text-sm bg-white"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
                <button
                  onClick={applySort}
                  className="bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-xl shadow hover:bg-blue-700"
                >
                  Sort Now
                </button>
                <button className="flex items-center gap-2 bg-white border text-gray-700 text-sm font-medium px-3 py-2 rounded-xl hover:bg-gray-50">
                  <Filter size={16} /> Filter
                </button>
                <button className="flex items-center gap-2 bg-white border text-gray-700 text-sm font-medium px-3 py-2 rounded-xl hover:bg-gray-50">
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
            <div ref={tableRef} className="p-0" />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
