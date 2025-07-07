import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import dayjs from "dayjs";
import Sidebar from "../sidebar/sideBar";
import Navbar from "../navBar/nav";

const Orders = () => {
  const tableRef = useRef(null);

  const rowMenu = [
    {
      label: "<i class='lucide lucide-clipboard-check'></i> Mark Delivered",
      action: (_e, row) => row.update({ status: "Delivered" }),
    },
    {
      label: "<i class='lucide lucide-alert-circle'></i> Mark Delayed",
      action: (_e, row) => row.update({ status: "Delayed" }),
    },
    { separator: true },
    {
      label: "<i class='lucide lucide-trash-2'></i> Delete Row",
      action: (_e, row) => row.delete(),
    },
  ];

  const headerMenu = function () {
    const items = [];
    this.getColumns().forEach((col) => {
      const wrap = document.createElement("div");
      wrap.className =
        "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer";

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

      items.push({ label: wrap });
    });
    return items;
  };

  useEffect(() => {
    const data = [
      { product: "Maggi", orderValue: 4306, quantity: 43, orderId: 7535, delivery: "2025-06-11", status: "Delayed" },
      { product: "Monster", orderValue: 2557, quantity: 22, orderId: 5724, delivery: "2025-06-11", status: "Confirmed" },
      { product: "Red Bull", orderValue: 4075, quantity: 36, orderId: 2775, delivery: "2025-06-11", status: "Returned" },
      { product: "Bourn Vita", orderValue: 5052, quantity: 14, orderId: 2275, delivery: "2025-06-11", status: "Out for delivery" },
      { product: "Horlicks", orderValue: 5370, quantity: 5, orderId: 2427, delivery: "2025-06-11", status: "Returned" },
      { product: "Harpic", orderValue: 6065, quantity: 10, orderId: 2578, delivery: "2025-06-11", status: "Out for delivery" },
      { product: "Fanta", orderValue: 4078, quantity: 23, orderId: 2757, delivery: "2025-06-11", status: "Delayed" },
      { product: "Pepsi", orderValue: 3559, quantity: 43, orderId: 3757, delivery: "2025-06-11", status: "Confirmed" },
      { product: "Coca cola", orderValue: 2055, quantity: 41, orderId: 2474, delivery: "2025-06-11", status: "Delayed" },
    ];

    const table = new Tabulator(tableRef.current, {
      layout: "fitColumns",
      height: "auto",
      selectable: 1,
      rowContextMenu: rowMenu,
      data,
      columns: [
        { title: "Products", field: "product", sorter: "string", headerMenu },
        {
          title: "Order Value",
          field: "orderValue",
          sorter: "number",
          headerMenu,
          formatter: (cell) => `₹${cell.getValue().toLocaleString()}`,
          hozAlign: "right",
        },
        {
          title: "Quantity",
          field: "quantity",
          sorter: "number",
          headerMenu,
          formatter: (cell) => `${cell.getValue()} Packets`,
          hozAlign: "right",
        },
        { title: "Order ID", field: "orderId", sorter: "number", headerMenu },
        {
          title: "Expected Delivery",
          field: "delivery",
          sorter: "date",
          headerMenu,
          formatter: (cell) => dayjs(cell.getValue()).format("DD/MM/YY"),
        },
        {
          title: "Status",
          field: "status",
          sorter: "string",
          headerMenu,
          formatter: (cell) => {
            const status = cell.getValue();
            let color =
              status === "Confirmed"
                ? "text-blue-600"
                : status === "Delayed"
                ? "text-orange-500"
                : status === "Returned"
                ? "text-gray-500"
                : "text-green-600";
            return `<span class="${color}">${status}</span>`;
          },
        },
      ],
    });

    const fieldEl = document.getElementById("ord-sort-field");
    const dirEl = document.getElementById("ord-sort-dir");
    document.getElementById("ord-sort-btn").addEventListener("click", () =>
      table.setSort(fieldEl.value, dirEl.value)
    );

    return () => table.destroy();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8">
          {/* Overall Orders Summary */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                title: "Total Orders",
                value: "37",
                color: "text-blue-600",
                subtext: "Last 7 days",
                icon: <i className="lucide lucide-package text-2xl" />,
              },
              {
                title: "Total Received",
                value: "32",
                subvalue: "₹25000",
                color: "text-orange-500",
                subtext: "Last 7 days",
                icon: <i className="lucide lucide-check-circle text-2xl" />,
              },
              {
                title: "Total Returned",
                value: "5",
                subvalue: "₹2500",
                color: "text-purple-600",
                subtext: "Last 7 days",
                icon: <i className="lucide lucide-repeat text-2xl" />,
              },
              {
                title: "On the Way",
                value: "12",
                subvalue: "₹2356",
                color: "text-red-600",
                subtext: "Ordered",
                icon: <i className="lucide lucide-truck text-2xl" />,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-gray-500">
                    {card.title}
                  </div>
                  {card.icon}
                </div>
                <div className="flex items-end gap-2">
                  <div className={`text-3xl font-bold ${card.color}`}>
                    {card.value}
                  </div>
                  {card.subvalue && (
                    <div className="text-base font-medium text-gray-700">
                      {card.subvalue}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {card.subtext}
                </div>
              </div>
            ))}
          </section>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>

          {/* Sort Controls */}
          <div className="flex items-center gap-4 mb-4">
            <select
              id="ord-sort-field"
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="product">Products</option>
              <option value="orderValue">Order Value</option>
              <option value="quantity">Quantity</option>
              <option value="orderId">Order ID</option>
              <option value="delivery">Expected Delivery</option>
              <option value="status">Status</option>
            </select>

            <select
              id="ord-sort-dir"
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <button
              id="ord-sort-btn"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sort Now
            </button>
          </div>

          {/* Table Container */}
          <div
            ref={tableRef}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
          />
        </main>
      </div>
    </div>
  );
};

export default Orders;
