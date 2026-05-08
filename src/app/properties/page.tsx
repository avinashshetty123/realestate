"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, IndianRupee, Eye, Heart, Filter, Grid, List } from "lucide-react";
import Link from "next/link";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  amenities: string[];
  status: string;
  views: number;
  createdAt: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    type: "",
    budget: "",
    page: 1
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchProperties();
  }, [searchFilters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchFilters.location) params.append('location', searchFilters.location);
      if (searchFilters.type) params.append('type', searchFilters.type);
      if (searchFilters.budget) params.append('budget', searchFilters.budget);
      params.append('page', searchFilters.page.toString());

      const response = await fetch(`/api/properties?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProperties(data.properties);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchFilters(prev => ({ ...prev, page: 1 }));
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-navy mb-4">
            Find Your Perfect <span className="text-teal">Property</span>
          </h1>
          <p className="text-xl text-slate max-w-3xl mx-auto">
            Discover premium properties across India's major cities
          </p>
        </motion.div>

        {/* Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Location</label>
              <select
                value={searchFilters.location}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal"
              >
                <option value="">All Cities</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi NCR</option>
                <option value="bangalore">Bangalore</option>
                <option value="pune">Pune</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Property Type</label>
              <select
                value={searchFilters.type}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal"
              >
                <option value="">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="plots">Plots/Land</option>
                <option value="investment">Investment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Budget</label>
              <select
                value={searchFilters.budget}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal"
              >
                <option value="">All Budgets</option>
                <option value="50-100">₹50L - ₹1Cr</option>
                <option value="100-250">₹1Cr - ₹2.5Cr</option>
                <option value="250-500">₹2.5Cr - ₹5Cr</option>
                <option value="500+">₹5Cr+</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-dark transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </button>
            </div>
          </div>
        </motion.div>

        {/* View Toggle & Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-slate">
            Showing {properties.length} of {pagination.total} properties
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-teal text-white" : "bg-white text-slate"}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-teal text-white" : "bg-white text-slate"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Properties Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
            {properties.map((property) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div className={viewMode === "list" ? "w-1/3" : "w-full"}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-teal capitalize">{property.type}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{property.views || 0} views</span>
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-navy line-clamp-2">{property.title}</h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-slate mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm capitalize">{property.location}</span>
                  </div>

                  <p className="text-slate text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-slate">
                    {property.bedrooms && (
                      <span>{property.bedrooms} BHK</span>
                    )}
                    {property.area && (
                      <span>{property.area} sq ft</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-5 h-5 text-teal" />
                      <span className="text-2xl font-black text-teal">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    <Link
                      href={`/properties/${property._id}`}
                      className="bg-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-dark transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setSearchFilters(prev => ({ ...prev, page: i + 1 }))}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  pagination.page === i + 1
                    ? "bg-teal text-white"
                    : "bg-white text-slate hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {properties.length === 0 && !loading && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate mb-2">No Properties Found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
}