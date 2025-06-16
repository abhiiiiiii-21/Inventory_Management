import { Routes, Route } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn';
import Dashboard from './Components/Dashboard/Dashboard';
import ItemMaster from './Components/itemMaster/addItem/Item';
import AddCategory from './Components/itemMaster/addCategory/AddCat';
import AddSubCategory from './Components/itemMaster/addSubCategory/AddSub';
import Inventory from './Components/inventory/inventory';
import Reports from './Components/reports/reports';
import Suppliers from './Components/suppliers/suppliers';
import Orders from './Components/orders/orders';
import ManageStore from './Components/manageStore/manage';
import Customers from './Components/customers/customers';
import Settings from './Components/settings/Settings';
import SignUp from './Components/signUp/signUp';
import Added_Items from './Components/itemMaster/added_Items/Added_Items';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/manage-store" element={<ManageStore />} />
      <Route path="/customers" element={<Customers />} />
      
      
      <Route path="/item-master/already-added-items" element={<Added_Items />} />
      <Route path="/item-master/add-item" element={<ItemMaster />} />
      <Route path="/item-master/add-category" element={<AddCategory />} />
      <Route path="/item-master/add-sub-category" element={<AddSubCategory />} />

      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
