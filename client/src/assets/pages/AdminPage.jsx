import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import CreateProductForm from '../components/CreateProductForm';
import ProductsList from '../components/ProductsList';
import AnalyticsTab from '../components/AnalyticsTab';
import { useProductStore } from '../stores/useProductStore';

const tabs= [
  { id: "create", label:"Create Product", icon: PlusCircle },
  { id: "products", label:"Products", icon: ShoppingBasket },
  { id: "analytics", label:"Analytics", icon: BarChart },
]

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts()
  },[fetchAllProducts]);

  return (
    <div className='container'>
      <div className="admin-section">
        <motion.h1 className="sec-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
            Admin Dashboard
        </motion.h1>

        <div className="tab-container">
          {tabs.map((tab)=>(
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-list ${activeTab === tab.id ? "active" : ""}`}>
              <tab.icon className='icon tab-icon'/>
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  )
}

export default AdminPage;
