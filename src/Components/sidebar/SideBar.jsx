import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Boxes, BarChart2, Users, Package, ClipboardList, User, Database, Settings, LogOut, ChevronDown, ChevronUp} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { label: 'Dashboard', icon: <Home />, path: '/dashboard' },
  { label: 'Inventory', icon: <Boxes />, path: '/inventory' },
  { label: 'Reports', icon: <BarChart2 />, path: '/reports' },
  { label: 'Suppliers', icon: <Users />, path: '/suppliers' },
  { label: 'Orders', icon: <Package />, path: '/orders' },
  { label: 'Manage Store', icon: <ClipboardList />, path: '/manage-store' },
  { label: 'Customers', icon: <User />, path: '/customers' }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemMasterOpen, setItemMasterOpen] = useState(
    location.pathname.includes('/item-master')
  );

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm fixed left-0 top-0 flex flex-col justify-between">

      <div>
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <img src="/fullLogo.png" alt="Countrees Logo" className="h-18 w-auto"/>
        </div>

        {/* Main Nav */}
        <nav className="p-4 space-y-1">
          {menuItems.map(({ label, icon, path }) => (
            <NavLink key={label} to={path} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${ isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100' }`}>
              <span className="w-5 h-5">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Collapsible Item Master */}
          <button
            onClick={() => setItemMasterOpen(!itemMasterOpen)} className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition duration-200 ${
              location.pathname.includes('/item-master')
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5" />
              <span>Item Master</span>
            </div>
            {itemMasterOpen ? (
              <ChevronUp className="w-4 h-4 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 transition-transform duration-300" />
            )}
          </button>

          {/* Animated Submenu */}
          <div
            className={`ml-8 overflow-hidden transition-all duration-300 ease-in-out ${
              itemMasterOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <NavLink
              to="/item-master/already-added-items"
              className={({ isActive }) =>
                `block px-3 py-1 text-sm rounded-md transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Added Items List
            </NavLink>
            <NavLink
              to="/item-master/add-item"
              className={({ isActive }) =>
                `block px-3 py-1 text-sm rounded-md transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Add Item 
            </NavLink>
            <NavLink
              to="/item-master/add-category"
              className={({ isActive }) =>
                `block px-3 py-1 text-sm rounded-md transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Add Category
            </NavLink>
            <NavLink
              to="/item-master/add-sub-category"
              className={({ isActive }) =>
                `block px-3 py-1 text-sm rounded-md transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Add Sub Category
            </NavLink>

          </div>
        </nav>
      </div>

      {/* Settings & Logout */}
      <div className="p-4 space-y-1 border-t border-gray-100">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
              isActive
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-gray-600 hover:bg-gray-100 transition duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
