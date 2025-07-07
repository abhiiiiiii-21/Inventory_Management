import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import dayjs from "dayjs";
import Sidebar from "../sidebar/sideBar";
import Navbar from "../navBar/nav";
import { UserPlus, Filter, Download } from "lucide-react";

const Suppliers = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  let tableInstance = useRef(null);

  const rowMenu = [
    {
      label: "<i class='lucide lucide-mail'></i> Send Email",
      action: (_e, row) => alert(`Pretend email to ${row.getData().email}`),
    },
    { separator: true },
    {
      label: "<i class='lucide lucide-check-square'></i> Select Row",
      action: (_e, row) => row.select(),
    },
    {
      label: "<i class='lucide lucide-trash-2'></i> Delete Row",
      action: (_e, row) => row.delete(),
    },
  ];

  const headerMenu = function () {
    const items = [];
    this.getColumns().forEach((col) => {
      const wrapper = document.createElement("div");
      wrapper.className =
        "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = col.isVisible();
      cb.readOnly = true;
      cb.className = "form-checkbox h-4 w-4 text-blue-600";

      const label = document.createElement("span");
      label.textContent = col.getDefinition().title;

      wrapper.appendChild(cb);
      wrapper.appendChild(label);

      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        col.toggle();
        cb.checked = col.isVisible();
      });

      items.push({ label: wrapper });
    });
    return items;
  };

  useEffect(() => {
    const data = [
  {
    id: 1,
    name: "Rohan Naik",
    product: "Saffola, Good Day",
    phone: "9867545457",
    email: "ritwik@gmail.com",
    lastSupplied: "2025-06-01",
    rating: 4.5,
    address: `Rohan Food Distributors\nPlot 21, Sector 18,\nVashi, Navi Mumbai - 400703\nMaharashtra, India`
  },
  {
    id: 2,
    name: "Nirav Patel",
    product: "Maaza",
    phone: "9867545368",
    email: "niravpatel@gmail.com",
    lastSupplied: "2025-05-24",
    rating: 4,
    address: `Patel Beverages Pvt. Ltd.\nShop 5, GIDC Industrial Area,\nAhmedabad - 380015\nGujarat, India`
  },
  {
    id: 3,
    name: "Aniket Deshmukh",
    product: "Dairy Milk",
    phone: "9867545566",
    email: "aniket@gmail.com",
    lastSupplied: "2025-05-24",
    rating: 2.5,
    address: `Deshmukh Dairy Products\nLane 3, Shivaji Nagar,\nPune - 411005\nMaharashtra, India`
  },
  {
    id: 4,
    name: "Srinivas Rao",
    product: "Tomato",
    phone: "9267545457",
    email: "srinivas@gmail.com",
    lastSupplied: "2025-05-24",
    rating: 3.5,
    address: `Rao Agro Supplies\nWarehouse No. 12, Kothapet Market,\nHyderabad - 500035\nTelangana, India`
  },
  {
    id: 5,
    name: "Aditya Singh",
    product: "Milk Bikis",
    phone: "9367546531",
    email: "aditya@gmail.com",
    lastSupplied: "2025-05-24",
    rating: 4,
    address: `Singh FMCG Traders\nSector 62, Noida - 201301\nUttar Pradesh, India`
  },
  {
    id: 6,
    name: "Raghav Krishnan",
    product: "Marie Gold",
    phone: "9667545982",
    email: "raghav@gmail.com",
    lastSupplied: "2025-05-24",
    rating: 3.5,
    address: `Raghav Food Suppliers\nAnna Nagar East,\nChennai - 600102\nTamil Nadu, India`
  },
  {
    id: 7,
    name: "Bhavna Shah",
    product: "Coke, Fanta",
    phone: "9167545111",
    email: "bhavna@gmail.com",
    lastSupplied: "2025-05-22",
    rating: 4.2,
    address: `Shah Beverages\nSG Highway,\nAhmedabad - 380015\nGujarat, India`
  },
  {
    id: 8,
    name: "Tanmay Sinha",
    product: "Lays",
    phone: "9267545211",
    email: "tanmay@gmail.com",
    lastSupplied: "2025-05-23",
    rating: 3.2,
    address: `Sinha Snacks Distributor\nCivil Lines,\nBhopal - 462001\nMadhya Pradesh, India`
  },
  {
    id: 9,
    name: "Meera Iyer",
    product: "Horlicks",
    phone: "9067545322",
    email: "meera@gmail.com",
    lastSupplied: "2025-05-20",
    rating: 3.9,
    address: `Iyer Pharma Traders\nVelachery,\nChennai - 600042\nTamil Nadu, India`
  },
  {
    id: 10,
    name: "Karthik Pillai",
    product: "Bournvita",
    phone: "8867545533",
    email: "karthik@gmail.com",
    lastSupplied: "2025-05-20",
    rating: 4.1,
    address: `Pillai Distributors\nMG Road,\nErnakulam - 682011\nKerala, India`
  },
  {
    id: 11,
    name: "Sneha Kapoor",
    product: "Pepsi",
    phone: "9767545644",
    email: "sneha@gmail.com",
    lastSupplied: "2025-05-19",
    rating: 3.8,
    address: `Kapoor Cold Drinks Agency\nDLF Phase 3,\nGurgaon - 122002\nHaryana, India`
  },
  {
    id: 12,
    name: "Vikram Chauhan",
    product: "Oreo",
    phone: "9467545755",
    email: "vikram@gmail.com",
    lastSupplied: "2025-05-18",
    rating: 4.3,
    address: `Chauhan General Store\nPark Street,\nKolkata - 700016\nWest Bengal, India`
  },
  {
    id: 13,
    name: "Neha Verma",
    product: "Sprite",
    phone: "9667545866",
    email: "neha@gmail.com",
    lastSupplied: "2025-05-17",
    rating: 3.7,
    address: `Verma Beverages\nSector 18,\nNoida - 201301\nUttar Pradesh, India`
  },
  {
    id: 14,
    name: "Yusuf Khan",
    product: "Mirinda",
    phone: "9867545977",
    email: "yusuf@gmail.com",
    lastSupplied: "2025-05-16",
    rating: 2.9,
    address: `Khan Kirana Store\nLalbagh,\nLucknow - 226001\nUttar Pradesh, India`
  },
  {
    id: 15,
    name: "Aarti Mehta",
    product: "Chips",
    phone: "9767545088",
    email: "aarti@gmail.com",
    lastSupplied: "2025-05-15",
    rating: 4.6,
    address: `Mehta Snacks Center\nEllisbridge,\nAhmedabad - 380006\nGujarat, India`
  },
  {
    id: 16,
    name: "Ramesh Kamat",
    product: "Bisleri",
    phone: "9567545199",
    email: "ramesh@gmail.com",
    lastSupplied: "2025-05-14",
    rating: 3.4,
    address: `Kamat Water Agency\nMapusa,\nGoa - 403507\nIndia`
  },
  {
    id: 17,
    name: "Deepika Joshi",
    product: "Unibic Cookies",
    phone: "9367545200",
    email: "deepika@gmail.com",
    lastSupplied: "2025-05-13",
    rating: 4.7,
    address: `Joshi Food Supplies\nDehradun Road,\nRishikesh - 249201\nUttarakhand, India`
  },
  {
    id: 18,
    name: "Ajay Rathore",
    product: "Amul Milk",
    phone: "9267545301",
    email: "ajay@gmail.com",
    lastSupplied: "2025-05-12",
    rating: 3.6,
    address: `Rathore Dairy Products\nRatanada,\nJodhpur - 342001\nRajasthan, India`
  },
  {
    id: 19,
    name: "Divya Bhatt",
    product: "Nutella",
    phone: "9167545402",
    email: "divya@gmail.com",
    lastSupplied: "2025-05-11",
    rating: 4.8,
    address: `Bhatt Sweet World\nHazratganj,\nLucknow - 226001\nUttar Pradesh, India`
  },
  {
    id: 20,
    name: "Manoj Kumar",
    product: "Paper Boat",
    phone: "9067545503",
    email: "manoj@gmail.com",
    lastSupplied: "2025-05-10",
    rating: 4.4,
    address: `Kumar Fruit Juices\nKarol Bagh,\nNew Delhi - 110005\nDelhi, India`
  }
];


    const table = new Tabulator(tableRef.current, {
      height: "auto",
      layout: "fitColumns",
      pagination: "local",
      paginationSize: 20, // ✅ Set to 20
      paginationSizeSelector: [5, 10, 20],
      selectable: 1,
      rowContextMenu: rowMenu,
      data,
      columns: [
        { title: "Supplier Name", field: "name", sorter: "string", headerMenu },
        { title: "Product", field: "product", sorter: "string", headerMenu },
        { title: "Contact Number", field: "phone", sorter: "string", headerMenu },
        { title: "Email", field: "email", sorter: "string", headerMenu },
        {
          title: "Last Supplied Date",
          field: "lastSupplied",
          sorter: "date",
          headerMenu,
          formatter: (cell) => dayjs(cell.getValue()).format("YYYY-MM-DD"),
        },
        {
          title: "Supplier Review",
          field: "rating",
          sorter: "number",
          headerMenu,
          formatter: (cell) => {
            const rating = cell.getValue();
            const color =
              rating >= 4
                ? "text-green-600"
                : rating >= 3
                ? "text-orange-500"
                : "text-red-600";
            return `<span class="${color}">${rating}/5</span>`;
          },
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
            navigate("/suppliers/overview", { state: rowData });
          },
        },
      ],
    });

    tableInstance.current = table;

    const fieldEl = document.getElementById("ord-sort-field");
    const dirEl = document.getElementById("ord-sort-dir");

    document.getElementById("ord-sort-btn").addEventListener("click", () => {
      table.setSort(fieldEl.value, dirEl.value);
    });

    return () => table.destroy();
  }, [navigate]);

  const handleDownload = () => {
    if (tableInstance.current) {
      tableInstance.current.download("csv", "suppliers.csv");
    }
  };

  const handleFilter = () => {
    const value = document.getElementById("filter-input").value;
    tableInstance.current.setFilter("name", "like", value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Suppliers</h1>

          {/* Controls */}
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <select id="ord-sort-field" className="px-3 py-2 border rounded">
                <option value="name">Supplier Name</option>
                <option value="product">Product</option>
                <option value="phone">Contact Number</option>
                <option value="email">Email</option>
                <option value="lastSupplied">Last Supplied Date</option>
                <option value="rating">Supplier Review</option>
              </select>
              <select id="ord-sort-dir" className="px-3 py-2 border rounded">
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/suppliers/add")}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <UserPlus className="mr-2 w-4 h-4" /> Add Customer
              </button>

              <div className="flex items-center border rounded px-2">
                <Filter className="w-4 h-4 mr-1" />
                <input
                  id="filter-input"
                  onChange={handleFilter}
                  placeholder="Filter by name"
                  className="outline-none p-1"
                />
              </div>

              <button
                onClick={handleDownload}
                className="flex items-center border px-4 py-2 rounded hover:bg-gray-100"
              >
                <Download className="mr-2 w-4 h-4" /> Download All
              </button>
            </div>
          </div>

          <div
            ref={tableRef}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
          />
        </main>
      </div>
    </div>
  );
};

export default Suppliers;
