import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import dayjs from "dayjs";
import Sidebar from "../../sidebar/sideBar";
import Navbar from "../../navBar/nav";

const Added_Items = () => {
  const tableRef = useRef(null);

  const rowMenu = [
    {
      label: "<i class='lucide lucide-pencil'></i> Change Description",
      action: (_e, row) => row.update({ description: "Updated Description" }),
    },
    {
      label: "<i class='lucide lucide-check-square'></i> Select Row",
      action: (_e, row) => row.select(),
    },
    { separator: true },
    {
      label: "Admin Functions",
      menu: [
        {
          label: "<i class='lucide lucide-trash-2'></i> Delete Row",
          action: (_e, row) => row.delete(),
        },
        {
          label: "<i class='lucide lucide-ban'></i> Disabled Option",
          disabled: true,
        },
      ],
    },
  ];

  const headerMenu = function () {
    const menu = [];
    this.getColumns().forEach((column) => {
      const container = document.createElement("div");
      container.className =
        "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = column.isVisible();
      checkbox.readOnly = true;
      checkbox.className = "form-checkbox h-4 w-4 text-blue-600";

      const label = document.createElement("span");
      label.textContent = column.getDefinition().title;

      container.appendChild(checkbox);
      container.appendChild(label);

      container.addEventListener("click", (e) => {
        e.stopPropagation();
        column.toggle();
        checkbox.checked = column.isVisible();
      });

      menu.push({ label: container });
    });
    return menu;
  };

  useEffect(() => {
    const table = new Tabulator(tableRef.current, {
      height: "auto",
      layout: "fitColumns",
      selectable: 1,
      rowContextMenu: rowMenu,
      data: [
        {
          id: 0,
          sku: "MILK",
          description: "Full Cream Milk",
          uom: "Litres",
          shelfLife: "5 days",
          batch: "BATCH-001",
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
          batch: "BATCH-002",
          weight: 1000,
          leadTime: "2 days",
          safetyStock: 200,
          currentStock: 300,
          expiry: "2026-05-31",
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
          id: 3,
          sku: "COCOA",
          description: "Cocoa Powder",
          uom: "Kg",
          shelfLife: "180 days",
          batch: "BATCH-004",
          weight: 1200,
          leadTime: "5 days",
          safetyStock: 150,
          currentStock: 170,
          expiry: "2025-10-01",
        },
        {
          id: 4,
          sku: "CHOCO-ICE",
          description: "Chocolate Ice Cream",
          uom: "Units",
          shelfLife: "365 days",
          batch: "BATCH-005",
          weight: 500,
          leadTime: "6 days",
          safetyStock: 90,
          currentStock: 120,
          expiry: "2025-08-15",
        },
      ],
      columns: [
        { title: "SKU", field: "sku", sorter: "string", headerMenu },
        { title: "Description", field: "description", sorter: "string", headerMenu },
        { title: "UOM", field: "uom", sorter: "string", hozAlign: "center", headerMenu },
        { title: "Shelf Life", field: "shelfLife", sorter: "string", hozAlign: "center", headerMenu },
        { title: "Batch", field: "batch", sorter: "string", headerMenu },
        { title: "Weight", field: "weight", sorter: "number", hozAlign: "right", headerMenu },
        { title: "Lead Time", field: "leadTime", sorter: "string", hozAlign: "center", headerMenu },
        { title: "Safety Stock", field: "safetyStock", sorter: "number", hozAlign: "right", headerMenu },
        { title: "Current Stock", field: "currentStock", sorter: "number", hozAlign: "right", headerMenu },
        {
          title: "Expiry",
          field: "expiry",
          sorter: "date",
          formatter: "datetime",
          formatterParams: { inputFormat: "YYYY-MM-DD", outputFormat: "YYYY-MM-DD" },
          headerMenu,
        },
        {
          title: "Status",
          headerMenu,
          formatter: (cell) => {
            const { expiry } = cell.getRow().getData();
            const daysLeft = dayjs(expiry).diff(dayjs(), "day");
            let label, classes;
            if (daysLeft < 0) {
              label = "Expired";
              classes = "bg-red-100 text-red-700";
            } else if (daysLeft <= 30) {
              label = "Expiring Soon";
              classes = "bg-yellow-100 text-yellow-800";
            } else {
              label = "Valid";
              classes = "bg-green-100 text-green-700";
            }
            return `<span class="${classes} px-2 py-1 rounded-full text-xs font-medium">${label}</span>`;
          },
        },
        {
          title: "Action",
          headerSort: false,
          formatter: () => `
            <div class="flex justify-center items-center gap-2">
              <button class="edit-btn text-blue-600 hover:text-blue-800">
                <i class="lucide lucide-pencil"></i>
              </button>
              <button class="delete-btn text-red-600 hover:text-red-800">
                <i class="lucide lucide-trash-2"></i>
              </button>
            </div>
          `,
          cellClick: (e, cell) => {
            const row = cell.getRow();
            if (e.target.closest(".edit-btn")) {
              alert(`Edit:\n${JSON.stringify(row.getData(), null, 2)}`);
            } else if (e.target.closest(".delete-btn")) {
              row.delete();
            }
          },
        },
      ],
    });

    // Sort button logic
    const fieldEl = document.getElementById("sort-field");
    const dirEl = document.getElementById("sort-direction");
    document.getElementById("sort-trigger").addEventListener("click", () => {
      const field = fieldEl.value;
      const dir = dirEl.value;
      table.setSort(field, dir);
    });

    return () => table.destroy();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Added Items</h1>

          {/* Sort Controls */}
          <div className="flex items-center gap-4 mb-4">
            <select id="sort-field" className="px-3 py-2 border border-gray-300 rounded">
              <option value="sku">SKU</option>
              <option value="description">Description</option>
              <option value="uom">UOM</option>
              <option value="shelfLife">Shelf Life</option>
              <option value="batch">Batch</option>
              <option value="weight">Weight</option>
              <option value="leadTime">Lead Time</option>
              <option value="safetyStock">Safety Stock</option>
              <option value="currentStock">Current Stock</option>
              <option value="expiry">Expiry</option>
            </select>

            <select id="sort-direction" className="px-3 py-2 border border-gray-300 rounded">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <button
              id="sort-trigger"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sort Now
            </button>
          </div>

          {/* Table */}
          <div
            ref={tableRef}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Added_Items;
