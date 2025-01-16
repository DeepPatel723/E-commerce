import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axiosInsatnce from '../lib/axios';
import { motion } from "framer-motion";
import { CartesianAxis, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axiosInsatnce.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      };
    };
    fetchAnalyticsData();
  },[]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container analytics-container'>
      <div className="analytics-tabs">
        <AnalyticsCard title='Total Users' value={analyticsData.users.toLocaleString()} icon={Users} color='teal'/>
        <AnalyticsCard title='Total Products' value={analyticsData.products.toLocaleString()} icon={Package} color='teal'/>
        <AnalyticsCard title='Total Sales' value={analyticsData.totalSales.toLocaleString()} icon={ShoppingCart} color='teal'/>
        <AnalyticsCard title='Total Revenue' value={analyticsData.totalRevenue.toLocaleString()} icon={DollarSign} color='teal'/>
      </div>
      <motion.div
				className='analytics-chart-sec'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart data={dailySalesData}>
              <CartesianAxis strokeDasharray='3 3' />
              <XAxis dataKey='name' stroke='#D1D5DB'/>
              <YAxis yAxisId='left' stroke='#D1D5DB'/>
              <YAxis yAxisId='right' stroke='#D1D5DB' orientation='right'/>
              <Tooltip/>
              <Legend />
              <Line yAxisId='left' type='monotone' dataKey='sales' stroke='#10B981' activeDot={{ r: 8 }} name='Sales'/>
              <Line yAxisId='right' type='monotone' dataKey='revenue' stroke='#3B82F6' activeDot={{ r: 8 }} name='Revenue'/>
            </LineChart>
          </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`analytics-tab-card ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
        <div className='tab-content'>
          <div className='tab-info'>
            <p className='tab-title'>{title}</p>
            <h3 className='tab-count'>{value}</h3>
          </div>
        </div>
        <div className='tab-icons'>
          <Icon className='icon icon-tab' />
        </div>
  </motion.div>
);
