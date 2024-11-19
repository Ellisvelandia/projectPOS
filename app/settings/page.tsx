'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Building2, User, CreditCard, Bell, Save, Upload } from 'lucide-react';

interface TabProps {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { id: 'general', label: 'General', icon: <Building2 className="w-5 h-5" /> },
  { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[2000px] mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" placeholder="Enter business name" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="businessEmail">Business Email</Label>
                        <Input id="businessEmail" type="email" placeholder="Enter business email" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter phone number" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Enter business address" className="mt-1.5" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Business Description</Label>
                        <textarea
                          id="description"
                          rows={4}
                          className="w-full mt-1.5 p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                          placeholder="Enter business description"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h2>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative">
                        <User className="w-12 h-12 text-gray-400" />
                        <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border shadow-sm hover:shadow-md transition-shadow duration-200">
                          <Upload className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Profile Photo</h3>
                        <p className="text-sm text-gray-500 mt-1">Upload a new profile photo</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter first name" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter last name" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" placeholder="Enter role" className="mt-1.5" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing Information</h2>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">Visa ending in 4242</p>
                              <p className="text-sm text-gray-500">Expires 12/24</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      <Button className="w-full">Add Payment Method</Button>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">Invoice #{2024001 + i}</p>
                              <p className="text-sm text-gray-500">Jan {i}, 2024</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-green-600 font-medium">$99.00</span>
                              <Button variant="outline" size="sm">Download</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { title: 'Order Updates', description: 'Receive notifications about new orders and updates' },
                        { title: 'Payment Notifications', description: 'Get notified about payment status changes' },
                        { title: 'Inventory Alerts', description: 'Receive alerts when items are running low' },
                        { title: 'System Updates', description: 'Get notified about system updates and maintenance' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t">
                  <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm transition-all duration-200 hover:shadow-md">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}