'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, DollarSign, ShoppingBag, Users, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

const mockSalesData: SalesData[] = [
  { date: '2024-01-01', revenue: 1200, orders: 45, customers: 38 },
  { date: '2024-01-02', revenue: 1500, orders: 52, customers: 41 },
  { date: '2024-01-03', revenue: 1100, orders: 38, customers: 35 },
  { date: '2024-01-04', revenue: 1800, orders: 65, customers: 55 },
  { date: '2024-01-05', revenue: 2000, orders: 72, customers: 60 },
];

const topProducts: TopProduct[] = [
  { name: 'Chicken Wings', sales: 245, revenue: 4900, growth: 12.5 },
  { name: 'French Fries', sales: 189, revenue: 945, growth: 8.3 },
  { name: 'Burger Deluxe', sales: 167, revenue: 2505, growth: -2.8 },
  { name: 'Caesar Salad', sales: 156, revenue: 1560, growth: 15.2 },
  { name: 'Iced Tea', sales: 145, revenue: 435, growth: 5.7 },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const totalRevenue = mockSalesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = mockSalesData.reduce((sum, day) => sum + day.orders, 0);
  const totalCustomers = mockSalesData.reduce((sum, day) => sum + day.customers, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[2000px] mx-auto p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Track your business performance and growth</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select
              className="flex-1 md:flex-none p-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm transition-all duration-200 hover:shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +8.2% from last period
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalOrders}</p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +12.5% from last period
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalCustomers}</p>
                <p className="text-sm text-red-600 flex items-center mt-2">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  -2.3% from last period
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Order Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${averageOrderValue.toFixed(2)}</p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +5.8% from last period
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Sales Trend</h2>
              <div className="flex gap-2">
                {['revenue', 'orders', 'customers'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedMetric === metric
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Chart visualization will be implemented here
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Products</h2>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${product.revenue}</p>
                      <p className={`text-sm ${
                        product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}