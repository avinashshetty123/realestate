"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Home,
  Plus,
  Trash2,
  Edit,
  Eye,
  Calendar,
  MapPin,
  IndianRupee,
  MessageSquare,
  Mail,
  Phone,
  Filter,
  X as CloseIcon,
  Upload,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
);

const VISITOR_DATA = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Website Visitors",
      data: [1200, 1900, 3000, 5000, 4200, 6800],
      backgroundColor: "rgba(20, 184, 166, 0.8)",
      borderColor: "rgba(20, 184, 166, 1)",
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

const PROPERTY_TYPES = {
  labels: ["Residential", "Commercial", "Plots", "Investment"],
  datasets: [
    {
      data: [45, 25, 20, 10],
      backgroundColor: [
        "rgba(20, 184, 166, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(239, 68, 68, 0.8)",
      ],
      borderWidth: 0,
    },
  ],
};

const MONTHLY_SALES = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales (₹ Crores)",
      data: [12, 19, 25, 32, 28, 45],
      borderColor: "rgba(20, 184, 166, 1)",
      backgroundColor: "rgba(20, 184, 166, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [properties, setProperties] = useState<Array<any>>([]);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [priceUnit, setPriceUnit] = useState<"crore" | "lakh">("crore");
  const [newProperty, setNewProperty] = useState<{
    title: string;
    description: string;
    price: string;
    location: string;
    type: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    areaUnit: string;
    images: Array<{ url: string; public_id: string }>;
    amenities: string[];
    uploadingImages: boolean;
  }>({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "residential",
    bedrooms: "",
    bathrooms: "",
    area: "",
    areaUnit: "sqft",
    images: [],
    amenities: [],
    uploadingImages: false,
  });
  const [contacts, setContacts] = useState<Array<any>>([]);
  const [monthlyVisitors, setMonthlyVisitors] = useState<string>("...");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
      fetchContacts();
      fetchProperties();
      fetchVisitors();
    } else {
      router.push("/admin");
    }
  }, [router]);

  const handleImageUpload = async (files: FileList) => {
    setNewProperty((prev) => ({ ...prev, uploadingImages: true }));
    const uploadedImages: Array<{ url: string; public_id: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          uploadedImages.push({
            url: result.url,
            public_id: result.public_id,
          });
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }

    setNewProperty((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
      uploadingImages: false,
    }));
  };

  const removeImage = (index: number) => {
    setNewProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  async function fetchProperties() {
    try {
      const response = await fetch("/api/properties");
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties || []);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  }

  const handleAddProperty = async () => {
    try {
      const multiplier = priceUnit === "crore" ? 10000000 : 100000;
      const propertyData = {
        ...newProperty,
        price: parseFloat(newProperty.price) * multiplier,
        bedrooms: parseInt(newProperty.bedrooms) || 0,
        bathrooms: parseInt(newProperty.bathrooms) || 0,
        area: parseInt(newProperty.area) || 0,
        amenities: newProperty.amenities.filter((a) => a.trim() !== ""),
      };

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        fetchProperties();
        setShowAddProperty(false);
        setNewProperty({
          title: "",
          description: "",
          price: "",
          location: "",
          type: "residential",
          bedrooms: "",
          bathrooms: "",
          area: "",
          areaUnit: "sqft",
          images: [],
          amenities: [],
          uploadingImages: false,
        });
        setPriceUnit("crore");
        alert("Property added successfully!");
      }
    } catch (error) {
      console.error("Failed to add property:", error);
      alert("Failed to add property");
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(`/api/properties?id=${propertyId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchProperties();
          alert("Property deleted successfully!");
        }
      } catch (error) {
        console.error("Failed to delete property:", error);
        alert("Failed to delete property");
      }
    }
  };

  async function fetchVisitors() {
    try {
      const res = await fetch("/api/visitors");
      if (res.ok) {
        const data = await res.json();
        const count: number = data.count;
        setMonthlyVisitors(count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString());
      }
    } catch (error) {
      console.error("Failed to fetch visitors:", error);
    }
  }

  async function fetchContacts() {
    try {
      const response = await fetch("/api/admin/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  }

  const updateContactStatus = async (contactId: string, status: string) => {
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, status }),
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal to-teal-light rounded-xl flex items-center justify-center">
              <span className="font-black text-white">P</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-navy">PropVista Admin</h1>
              <p className="text-sm text-slate">Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-6">
            <div className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "contacts", label: "Contact Submissions", icon: Users },
                { id: "properties", label: "Properties", icon: Home },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? "bg-teal text-white"
                      : "text-slate hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-navy">
                Dashboard Overview
              </h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Properties",
                    value: properties.length.toString(),
                    icon: Home,
                    color: "from-teal to-teal-light",
                  },
                  {
                    label: "Active Listings",
                    value: properties
                      .filter((p) => p.status === "active")
                      .length.toString(),
                    icon: Eye,
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    label: "Monthly Visitors",
                    value: monthlyVisitors,
                    icon: Users,
                    color: "from-green-500 to-green-600",
                  },
                  {
                    label: "Contact Submissions",
                    value: contacts.length.toString(),
                    icon: MessageSquare,
                    color: "from-purple-500 to-purple-600",
                  },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-navy">
                      {stat.value}
                    </div>
                    <div className="text-slate text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Monthly Sales
                  </h3>
                  <div className="h-80">
                    <Line
                      data={MONTHLY_SALES}
                      options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'top'
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Property Types
                  </h3>
                  <div className="h-80">
                    <Doughnut
                      data={PROPERTY_TYPES}
                      options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "contacts" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-navy">
                  Contact Submissions
                </h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate" />
                  <select className="px-3 py-2 border border-slate-200 rounded-lg">
                    <option>All Status</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-navy">
                          Name
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Contact
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Property Type
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Message
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Date
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr
                          key={contact._id}
                          className="border-t hover:bg-slate-50"
                        >
                          <td className="p-4">
                            <div className="font-semibold text-navy">
                              {contact.name}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate">
                                <Mail className="w-4 h-4" />
                                {contact.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate">
                                <Phone className="w-4 h-4" />
                                {contact.phone}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-medium capitalize">
                              {contact.propertyType}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="max-w-xs truncate text-sm text-slate">
                              {contact.message}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-slate">
                              <Calendar className="w-4 h-4" />
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-4">
                            <select
                              value={contact.status}
                              onChange={(e) =>
                                updateContactStatus(contact._id, e.target.value)
                              }
                              className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${
                                contact.status === "new"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : contact.status === "contacted"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() =>
                                window.open(
                                  `https://wa.me/9195957${contact.phone.replace(/[^0-9]/g, "").slice(-5)}`,
                                  "_blank",
                                )
                              }
                              className="text-green-600 hover:text-green-800"
                            >
                              <MessageSquare className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {contacts.length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">
                        No contact submissions yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "properties" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-navy">
                  Property Management
                </h2>
                <button
                  onClick={() => setShowAddProperty(true)}
                  className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-xl hover:bg-teal-light transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Property
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-navy">
                          Property
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Location
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Price
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Views
                        </th>
                        <th className="text-left p-4 font-semibold text-navy">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr
                          key={property._id}
                          className="border-t hover:bg-slate-50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={
                                  property.images?.[0]?.url ||
                                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=100"
                                }
                                alt={property.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="font-semibold text-navy">
                                {property.title}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-slate">
                              <MapPin className="w-4 h-4" />
                              {property.location}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 font-semibold text-teal">
                              <IndianRupee className="w-4 h-4" />
                              {property.price >= 10000000
                                ? `${(property.price / 10000000).toFixed(1)} Cr`
                                : `${(property.price / 100000).toFixed(0)} L`}
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                property.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {property.status}
                            </span>
                          </td>
                          <td className="p-4 text-slate">
                            {property.views || 0}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteProperty(property._id)
                                }
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "visitors" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-navy">
                Visitor Analytics
              </h2>

              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-xl font-bold text-navy mb-4">
                  Monthly Website Visitors
                </h3>
                <div className="h-80">
                  <Bar
                    data={VISITOR_DATA}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'top'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return value.toLocaleString();
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                  <div className="text-3xl font-bold text-teal mb-2">6,847</div>
                  <div className="text-slate">Total Visitors This Month</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    2.4m
                  </div>
                  <div className="text-slate">Average Session Duration</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    68%
                  </div>
                  <div className="text-slate">Bounce Rate</div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-teal to-teal-light">
              <h3 className="text-2xl font-bold text-white">Add New Property</h3>
              <button
                onClick={() => setShowAddProperty(false)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-navy border-b pb-2">Basic Information</h4>
                    
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        value={newProperty.title}
                        onChange={(e) =>
                          setNewProperty((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                        placeholder="Enter property title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={newProperty.location}
                        onChange={(e) =>
                          setNewProperty((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                        placeholder="City, Area (e.g., Mumbai, Bandra)"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Description *
                      </label>
                      <textarea
                        value={newProperty.description}
                        onChange={(e) =>
                          setNewProperty((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all resize-none"
                        rows={4}
                        placeholder="Describe the property features and amenities"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-navy border-b pb-2">Property Details</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">Price *</label>
                        <div className="flex">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={newProperty.price}
                            onChange={(e) => setNewProperty((prev) => ({ ...prev, price: e.target.value }))}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                            placeholder={priceUnit === "crore" ? "2.5" : "45"}
                            required
                          />
                          <select
                            value={priceUnit}
                            onChange={(e) => setPriceUnit(e.target.value as "crore" | "lakh")}
                            className="px-3 py-3 border border-l-0 border-gray-200 rounded-r-xl bg-gray-50 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                          >
                            <option value="crore">Cr</option>
                            <option value="lakh">L</option>
                          </select>
                        </div>
                        <p className="text-xs text-slate mt-1">
                          {newProperty.price
                            ? `₹ ${(parseFloat(newProperty.price) * (priceUnit === "crore" ? 10000000 : 100000)).toLocaleString("en-IN")}`
                            : "Enter amount"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">Property Type *</label>
                        <select
                          value={newProperty.type}
                          onChange={(e) => setNewProperty((prev) => ({ ...prev, type: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                          required
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="plots">Plots / Land</option>
                          <option value="investment">Investment</option>
                        </select>
                      </div>
                    </div>

                    <div className={`grid gap-4 ${newProperty.type === "plots" ? "grid-cols-2" : "grid-cols-3"}`}>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          {newProperty.type === "plots" ? "Area *" : "Area (sq ft) *"}
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            min="0"
                            value={newProperty.area}
                            onChange={(e) => setNewProperty((prev) => ({ ...prev, area: e.target.value }))}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                            placeholder={newProperty.type === "plots" ? "500" : "1200"}
                            required
                          />
                          {newProperty.type === "plots" ? (
                            <select
                              value={newProperty.areaUnit}
                              onChange={(e) => setNewProperty((prev) => ({ ...prev, areaUnit: e.target.value }))}
                              className="px-3 py-3 border border-l-0 border-gray-200 rounded-r-xl bg-gray-50 text-xs font-semibold text-navy focus:outline-none"
                            >
                              <option value="sqft">sq ft</option>
                              <option value="sqyd">sq yd</option>
                              <option value="acre">acre</option>
                              <option value="guntha">guntha</option>
                            </select>
                          ) : (
                            <span className="px-3 py-3 border border-l-0 border-gray-200 rounded-r-xl bg-gray-50 text-xs font-semibold text-slate flex items-center">sq ft</span>
                          )}
                        </div>
                      </div>
                      {newProperty.type !== "plots" && (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-navy mb-2">Bedrooms</label>
                            <input
                              type="number"
                              min="0"
                              value={newProperty.bedrooms}
                              onChange={(e) => setNewProperty((prev) => ({ ...prev, bedrooms: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                              placeholder="3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-navy mb-2">Bathrooms</label>
                            <input
                              type="number"
                              min="0"
                              value={newProperty.bathrooms}
                              onChange={(e) => setNewProperty((prev) => ({ ...prev, bathrooms: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                              placeholder="2"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-navy border-b pb-2">Property Images</h4>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files && handleImageUpload(e.target.files)
                        }
                        className="hidden"
                        id="image-upload"
                        disabled={newProperty.uploadingImages}
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center">
                          <Upload className="w-6 h-6 text-teal" />
                        </div>
                        <div>
                          <p className="text-navy font-semibold">Upload Property Images</p>
                          <p className="text-sm text-slate">Drag & drop or click to browse</p>
                          <p className="text-xs text-slate mt-1">PNG, JPG up to 10MB each</p>
                        </div>
                      </label>
                    </div>

                    {newProperty.uploadingImages && (
                      <div className="text-center py-4">
                        <div className="inline-block w-8 h-8 border-3 border-teal border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-slate mt-2 font-medium">
                          Uploading images...
                        </p>
                      </div>
                    )}

                    {newProperty.images.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-navy">
                          Uploaded Images ({newProperty.images.length})
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {newProperty.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image.url}
                                alt={`Property ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-navy border-b pb-2">Amenities</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["Parking", "Security", "Gym", "Swimming Pool", "Garden", "Elevator", "Power Backup", "Water Supply"].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newProperty.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewProperty(prev => ({
                                  ...prev,
                                  amenities: [...prev.amenities, amenity]
                                }));
                              } else {
                                setNewProperty(prev => ({
                                  ...prev,
                                  amenities: prev.amenities.filter(a => a !== amenity)
                                }));
                              }
                            }}
                            className="w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                          />
                          <span className="text-sm text-navy">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t mt-8">
                <button
                  onClick={() => setShowAddProperty(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProperty}
                  disabled={!newProperty.title || !newProperty.location || !newProperty.price || newProperty.uploadingImages}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal to-teal-light text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newProperty.uploadingImages ? "Uploading..." : "Add Property"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
