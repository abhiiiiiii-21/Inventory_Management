import { Routes, Route } from 'react-router-dom';

import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/signUp/SignUp';
import Dashboard from './Components/dashboard/Dashboard';
import Inventory from './Components/inventory/Inventory';
import Reports from './Components/reports/Reports';

import Suppliers from './Components/suppliers/Suppliers';
import OverviewSupp from './Components/suppliers/profile_Suppliers/Overview_Supp/OverviewSupp';
import FinancialSupp from './Components/suppliers/profile_Suppliers/Financial_Supp/FinancialSup';
import HistorySupp from './Components/suppliers/profile_Suppliers/Purchase_Supp/HistorySupp';

import Orders from './Components/orders/Orders';
import ManageStore from './Components/manageStore/Manage';
import Customers from './Components/customers/Customers';
import Settings from './Components/settings/Settings';

import Added_Items from './Components/itemMaster/added_Items/Added_Items';
import ItemMaster from './Components/itemMaster/addItem/Item'
import AddCategory from './Components/itemMaster/addCategory/AddCat';
import AddSubCategory from './Components/itemMaster/addSubCategory/AddSub';

import ProfileCustom from './Components/customers/profile_Customers/Main_Section/ProfileCustom';
import FinanceCustom from './Components/customers/profile_Customers/Financial_Transactions/FinanceCustom';
import PurchaseCustom from './Components/customers/profile_Customers/Purchase_History/PurchaseCustom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/suppliers" element={<Suppliers />} />

      {/* ✅ Supplier Overview + Nested Pages */}
      <Route path="/suppliers/overview" element={<OverviewSupp />}>
        <Route path="financial-transactions" element={<FinancialSupp />} />
        <Route path="purchase-history" element={<HistorySupp />} />
      </Route>

      <Route path="/orders" element={<Orders />} />
      <Route path="/manage-store" element={<ManageStore />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/item-master/already-added-items" element={<Added_Items />} />
      <Route path="/item-master/add-item" element={<ItemMaster />} />
      <Route path="/item-master/add-category" element={<AddCategory />} />
      <Route path="/item-master/add-sub-category" element={<AddSubCategory />} />

      {/* ✅ Customer Profile Pages */}
      <Route path="/customers/profile/:id" element={<ProfileCustom />} />
      <Route path="/customers/profile/:id/financial-transactions" element={<FinanceCustom />} />
      <Route path="/customers/profile/:id/purchase-history" element={<PurchaseCustom />} />
    </Routes>
  );
};

export default App;
