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
  RotateCcw,
  Search,
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
  const [newProperty, setNewProperty] = useState<{
    title: string;
    description: string;
    price: string;
    location: string;
    type: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
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
    images: [],
    amenities: [],
    uploadingImages: false,
  });
  const [contacts, setContacts] = useState<Array<any>>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [contactFilter, setContactFilter] = useState("all");
  const [chatSessions, setChatSessions] = useState<Array<any>>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [chatFilter, setChatFilter] = useState("all");
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [knowledgeEntries, setKnowledgeEntries] = useState<Array<any>>([]);
  const [showAddKnowledge, setShowAddKnowledge] = useState(false);
  const [newKnowledge, setNewKnowledge] = useState({ category: "", keywords: "", question: "", answer: "" });
  const [kbSaving, setKbSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchContacts();
      fetchProperties();
      fetchChatSessions();
      fetchKnowledge();
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
      const propertyData = {
        ...newProperty,
        price: parseInt(newProperty.price) * 10000000,
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
          images: [],
          amenities: [],
          uploadingImages: false,
        });
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

  async function fetchKnowledge() {
    try {
      const res = await fetch("/api/chat-knowledge");
      if (res.ok) {
        const data = await res.json();
        setKnowledgeEntries(data.entries || []);
      }
    } catch (error) {
      console.error("Failed to fetch knowledge:", error);
    }
  }

  const handleAddKnowledge = async () => {
    if (!newKnowledge.category || !newKnowledge.question || !newKnowledge.answer) return;
    setKbSaving(true);
    try {
      const res = await fetch("/api/chat-knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKnowledge),
      });
      if (res.ok) {
        setNewKnowledge({ category: "", keywords: "", question: "", answer: "" });
        setShowAddKnowledge(false);
        fetchKnowledge();
      }
    } catch (error) {
      console.error("Failed to add knowledge:", error);
    } finally {
      setKbSaving(false);
    }
  };

  const handleDeleteKnowledge = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await fetch(`/api/chat-knowledge?id=${id}`, { method: "DELETE" });
      fetchKnowledge();
    } catch (error) {
      console.error("Failed to delete knowledge:", error);
    }
  };

  async function fetchChatSessions() {
    try {
      const res = await fetch("/api/chat-sessions");
      if (res.ok) {
        const data = await res.json();
        setChatSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Failed to fetch chat sessions:", error);
    }
  }

  const updateSessionStatus = async (sessionId: string, status: string) => {
    try {
      await fetch("/api/chat-sessions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, status }),
      });
      fetchChatSessions();
    } catch (error) {
      console.error("Failed to update session:", error);
    }
  };

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
                { id: "chats", label: "Chat Queries", icon: MessageSquare },
                { id: "knowledge", label: "Knowledge Base", icon: MessageSquare },
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: "Monthly Visitors",
                    value: "6.8K",
                    icon: Users,
                    color: "from-green-500 to-green-600",
                  },
                  {
                    label: "Contact Submissions",
                    value: contacts.length.toString(),
                    icon: MessageSquare,
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    label: "Chat Sessions",
                    value: chatSessions.length.toString(),
                    icon: MessageSquare,
                    color: "from-pink-500 to-pink-600",
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
                  <select 
                    value={contactFilter}
                    onChange={(e) => setContactFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
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
                      {contacts
                        .filter((contact) => contactFilter === "all" || contact.status === contactFilter)
                        .map((contact) => (
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
                            <button
                              onClick={() => setSelectedContact(contact)}
                              className="text-sm text-teal hover:text-teal-light font-medium underline"
                            >
                              View Message
                            </button>
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
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  window.open(
                                    `https://wa.me/91${contact.phone.replace(/[^0-9]/g, "")}`,
                                    "_blank",
                                  )
                                }
                                className="text-green-600 hover:text-green-800"
                                title="WhatsApp"
                              >
                                <MessageSquare className="w-5 h-5" />
                              </button>
                              <a
                                href={`mailto:${contact.email}`}
                                className="text-blue-600 hover:text-blue-800"
                                title="Email"
                              >
                                <Mail className="w-5 h-5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {contacts.filter((contact) => contactFilter === "all" || contact.status === contactFilter).length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">
                        {contactFilter === "all" 
                          ? "No contact submissions yet" 
                          : `No ${contactFilter} contact submissions`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "chats" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-navy">Chat Queries</h2>
                  <p className="text-slate text-sm mt-1">
                    {chatSessions.length} total conversation{chatSessions.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name or phone..."
                      value={chatSearchQuery}
                      onChange={(e) => setChatSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 w-64"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <select
                    value={chatFilter}
                    onChange={(e) => setChatFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button 
                    onClick={fetchChatSessions} 
                    className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-xl hover:bg-teal-light transition-colors text-sm font-semibold"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 space-y-3 max-h-[700px] overflow-y-auto pr-2">
                  {chatSessions.length === 0 && (
                    <div className="bg-white rounded-2xl p-8 text-center border shadow-sm">
                      <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate font-medium">No chat sessions yet</p>
                      <p className="text-slate-400 text-sm mt-1">Chat queries will appear here</p>
                    </div>
                  )}
                  {chatSessions
                    .filter((session) => {
                      if (chatFilter !== "all" && session.status !== chatFilter) return false;
                      if (chatSearchQuery) {
                        const query = chatSearchQuery.toLowerCase();
                        const name = (session.name || "").toLowerCase();
                        const phone = (session.phone || "").toLowerCase();
                        return name.includes(query) || phone.includes(query);
                      }
                      return true;
                    })
                    .map((session) => (
                    <div
                      key={session.sessionId}
                      onClick={() => setSelectedSession(session)}
                      className={`bg-white rounded-2xl p-4 border shadow-sm cursor-pointer hover:border-teal transition-all ${
                        selectedSession?.sessionId === session.sessionId ? "border-teal ring-2 ring-teal/20" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal to-blue-500 rounded-xl flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-sm">{session.name?.charAt(0)?.toUpperCase() || "?"}</span>
                          </div>
                          <div>
                            <p className="font-bold text-navy text-sm">{session.name || "Unknown"}</p>
                            <p className="text-xs text-slate flex items-center gap-1">
                              <Phone className="w-3 h-3" />{session.phone || "—"}
                            </p>
                          </div>
                        </div>
                        <select
                          value={session.status || "new"}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateSessionStatus(session.sessionId, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full font-semibold border-0 ${
                            session.status === "new" ? "bg-yellow-100 text-yellow-800" :
                            session.status === "contacted" ? "bg-blue-100 text-blue-800" :
                            "bg-green-100 text-green-800"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <div className="mt-2 pl-13">
                        <p className="text-xs text-slate truncate">
                          {session.messages?.filter((m: any) => m.role === "user").slice(-1)[0]?.content || "No messages yet"}
                        </p>
                        <p className="text-[10px] text-slate/50 mt-1">
                          {session.messages?.filter((m: any) => m.role === "user").length || 0} queries ·{" "}
                          {session.updatedAt ? new Date(session.updatedAt).toLocaleDateString() : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                  {chatSessions.filter((session) => {
                    if (chatFilter !== "all" && session.status !== chatFilter) return false;
                    if (chatSearchQuery) {
                      const query = chatSearchQuery.toLowerCase();
                      const name = (session.name || "").toLowerCase();
                      const phone = (session.phone || "").toLowerCase();
                      return name.includes(query) || phone.includes(query);
                    }
                    return true;
                  }).length === 0 && chatSessions.length > 0 && (
                    <div className="bg-white rounded-2xl p-8 text-center border shadow-sm">
                      <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate font-medium">No matching sessions</p>
                      <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-3">
                  {!selectedSession ? (
                    <div className="bg-white rounded-2xl p-12 text-center border shadow-sm h-full flex flex-col items-center justify-center min-h-[600px]">
                      <div className="w-20 h-20 bg-gradient-to-br from-teal/10 to-blue-500/10 rounded-3xl flex items-center justify-center mb-4">
                        <MessageSquare className="w-10 h-10 text-teal" />
                      </div>
                      <p className="text-navy font-bold text-lg mb-2">Select a conversation</p>
                      <p className="text-slate text-sm">Choose a chat session from the list to view the full conversation</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col" style={{ height: "700px" }}>
                      {/* Session header */}
                      <div className="p-4 border-b bg-gradient-to-r from-navy to-navy-light">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold">{selectedSession.name?.charAt(0)?.toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-bold text-white">{selectedSession.name}</p>
                              <p className="text-xs text-white/60">{selectedSession.phone}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={`https://wa.me/${selectedSession.phone?.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                            <a
                              href={`tel:${selectedSession.phone}`}
                              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                        {(selectedSession.messages || []).map((msg: any, i: number) => (
                          <div key={i} className={`flex ${ msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                              msg.role === "user"
                                ? "bg-teal text-white rounded-tr-sm"
                                : "bg-white border border-slate-200 text-gray-800 rounded-tl-sm shadow-sm"
                            }`}>
                              <p className="leading-relaxed">{msg.content}</p>
                              <p className={`text-[10px] mt-1 ${ msg.role === "user" ? "text-white/60" : "text-slate/50"}`}>
                                {msg.role === "user" ? selectedSession.name : "PropVista AI"} · {msg.time ? new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                              </p>
                            </div>
                          </div>
                        ))}
                        {(!selectedSession.messages || selectedSession.messages.length === 0) && (
                          <p className="text-center text-slate text-sm py-8">No messages in this session</p>
                        )}
                      </div>

                      {/* User queries summary */}
                      <div className="p-4 border-t bg-white">
                        <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">User Queries Summary</p>
                        <div className="space-y-1">
                          {(selectedSession.messages || [])
                            .filter((m: any) => m.role === "user")
                            .map((m: any, i: number) => (
                              <p key={i} className="text-xs text-slate flex items-start gap-2">
                                <span className="text-teal font-bold shrink-0">Q{i + 1}.</span>
                                {m.content}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "knowledge" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-navy">Knowledge Base</h2>
                  <p className="text-slate text-sm mt-1">Manage chatbot answers — the bot replies based on these entries.</p>
                </div>
                <button
                  onClick={() => setShowAddKnowledge(true)}
                  className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-xl hover:bg-teal-light transition-colors"
                >
                  <Plus className="w-5 h-5" /> Add Entry
                </button>
              </div>

              {/* Add form */}
              {showAddKnowledge && (
                <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
                  <h3 className="font-bold text-navy text-lg">New Knowledge Entry</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Category *</label>
                      <input
                        value={newKnowledge.category}
                        onChange={(e) => setNewKnowledge((p) => ({ ...p, category: e.target.value }))}
                        placeholder="e.g. Services, Pricing, Locations"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Keywords (comma separated)</label>
                      <input
                        value={newKnowledge.keywords}
                        onChange={(e) => setNewKnowledge((p) => ({ ...p, keywords: e.target.value }))}
                        placeholder="e.g. buy, purchase, buying"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Question / Topic *</label>
                    <input
                      value={newKnowledge.question}
                      onChange={(e) => setNewKnowledge((p) => ({ ...p, question: e.target.value }))}
                      placeholder="e.g. How do I buy a property?"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Answer *</label>
                    <textarea
                      rows={5}
                      value={newKnowledge.answer}
                      onChange={(e) => setNewKnowledge((p) => ({ ...p, answer: e.target.value }))}
                      placeholder="Type the chatbot's reply here..."
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowAddKnowledge(false)} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50">Cancel</button>
                    <button
                      onClick={handleAddKnowledge}
                      disabled={kbSaving}
                      className="px-5 py-2.5 bg-teal text-white rounded-xl text-sm font-semibold hover:bg-teal-light disabled:opacity-50"
                    >
                      {kbSaving ? "Saving..." : "Save Entry"}
                    </button>
                  </div>
                </div>
              )}

              {/* Entries table */}
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-navy">Category</th>
                      <th className="text-left p-4 text-sm font-semibold text-navy">Question / Topic</th>
                      <th className="text-left p-4 text-sm font-semibold text-navy">Keywords</th>
                      <th className="text-left p-4 text-sm font-semibold text-navy">Answer Preview</th>
                      <th className="text-left p-4 text-sm font-semibold text-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {knowledgeEntries.map((entry) => (
                      <tr key={entry._id} className="border-t hover:bg-slate-50">
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-teal/10 text-teal rounded-full text-xs font-semibold">{entry.category}</span>
                        </td>
                        <td className="p-4 text-sm font-medium text-navy max-w-[180px]">{entry.question}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {(entry.keywords || []).slice(0, 4).map((kw: string) => (
                              <span key={kw} className="px-2 py-0.5 bg-slate-100 text-slate text-xs rounded-full">{kw}</span>
                            ))}
                            {entry.keywords?.length > 4 && <span className="text-xs text-slate">+{entry.keywords.length - 4}</span>}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate max-w-[220px]">
                          <p className="truncate">{entry.answer}</p>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDeleteKnowledge(entry._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {knowledgeEntries.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate">No knowledge entries yet. Add some or run the seed script.</p>
                    <p className="text-xs text-slate mt-1">Run: <code className="bg-slate-100 px-2 py-0.5 rounded">node seed-knowledge.js</code></p>
                  </div>
                )}
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
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Price (Crores) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={newProperty.price}
                          onChange={(e) =>
                            setNewProperty((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                          placeholder="2.5"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Property Type *
                        </label>
                        <select
                          value={newProperty.type}
                          onChange={(e) =>
                            setNewProperty((prev) => ({
                              ...prev,
                              type: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                          required
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="plots">Plots/Land</option>
                          <option value="investment">Investment</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Area (sq ft) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newProperty.area}
                          onChange={(e) =>
                            setNewProperty((prev) => ({
                              ...prev,
                              area: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                          placeholder="1200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newProperty.bedrooms}
                          onChange={(e) =>
                            setNewProperty((prev) => ({
                              ...prev,
                              bedrooms: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                          placeholder="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newProperty.bathrooms}
                          onChange={(e) =>
                            setNewProperty((prev) => ({
                              ...prev,
                              bathrooms: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                          placeholder="2"
                        />
                      </div>
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

      {/* Contact Message Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-teal to-teal-light">
              <h3 className="text-2xl font-bold text-white">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate uppercase">Name</label>
                  <p className="text-navy font-semibold mt-1">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate uppercase">Email</label>
                  <p className="text-navy font-semibold mt-1">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate uppercase">Phone</label>
                  <p className="text-navy font-semibold mt-1">{selectedContact.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate uppercase">Date</label>
                  <p className="text-navy font-semibold mt-1">
                    {new Date(selectedContact.createdAt).toLocaleDateString()} at{" "}
                    {new Date(selectedContact.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate uppercase">Status</label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => {
                      updateContactStatus(selectedContact._id, e.target.value);
                      setSelectedContact({ ...selectedContact, status: e.target.value });
                    }}
                    className={`mt-1 px-3 py-1.5 rounded-full text-sm font-medium border-0 ${
                      selectedContact.status === "new"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedContact.status === "contacted"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold text-slate uppercase mb-2 block">Message</label>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-navy leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <a
                  href={`https://wa.me/91${selectedContact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </a>
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-teal hover:bg-teal-light text-white font-bold py-3 rounded-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
