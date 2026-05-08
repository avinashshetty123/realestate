"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, MapPin, IndianRupee, Bed, Bath, Square, Eye, Heart, 
  Share2, Phone, MessageCircle, Calendar, CheckCircle, Car, Wifi, 
  Dumbbell, Shield, Waves, TreePine 
} from "lucide-react";

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
  images: Array<{ url: string; public_id: string } | string>;
  amenities: string[];
  status: string;
  views: number;
  createdAt: string;
  features?: string[];
  nearbyPlaces?: string[];
}

const AMENITY_ICONS: { [key: string]: any } = {
  parking: Car,
  wifi: Wifi,
  gym: Dumbbell,
  security: Shield,
  swimming: Waves,
  garden: TreePine,
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string);
    }
  }, [params.id]);

  const fetchProperty = async (id: string) => {
    try {
      const response = await fetch(`/api/properties/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProperty(data.property);
      } else {
        router.push('/properties');
      }
    } catch (error) {
      console.error('Failed to fetch property:', error);
      router.push('/properties');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crores`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)} Lakhs`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleContactWhatsApp = () => {
    const message = `Hi! I'm interested in the property: ${property?.title}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919595771672?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleScheduleVisit = () => {
    setShowContactForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-2">Property Not Found</h2>
          <p className="text-slate mb-4">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/properties')}
            className="bg-teal text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate hover:text-teal mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Properties
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-96">
                <img
                  src={typeof property.images?.[currentImageIndex] === 'string' 
                    ? property.images[currentImageIndex] 
                    : (property.images?.[currentImageIndex] as any)?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-teal capitalize">{property.type}</span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {property.images && property.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? "border-teal" : "border-gray-200"
                      }`}
                    >
                      <img src={typeof image === 'string' ? image : (image as any).url} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-black text-navy mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-slate">
                    <MapPin className="w-5 h-5" />
                    <span className="capitalize">{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-3xl font-black text-teal mb-1">
                    <IndianRupee className="w-8 h-8" />
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate">
                    <Eye className="w-4 h-4" />
                    {property.views} views
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                {property.bedrooms && (
                  <div className="text-center">
                    <Bed className="w-8 h-8 text-teal mx-auto mb-2" />
                    <div className="text-2xl font-bold text-navy">{property.bedrooms}</div>
                    <div className="text-sm text-slate">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <Bath className="w-8 h-8 text-teal mx-auto mb-2" />
                    <div className="text-2xl font-bold text-navy">{property.bathrooms}</div>
                    <div className="text-sm text-slate">Bathrooms</div>
                  </div>
                )}
                <div className="text-center">
                  <Square className="w-8 h-8 text-teal mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy">{property.area}</div>
                  <div className="text-sm text-slate">Sq Ft</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-navy mb-4">Description</h3>
                <p className="text-slate leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-navy mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => {
                      const IconComponent = AMENITY_ICONS[amenity.toLowerCase()] || CheckCircle;
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <IconComponent className="w-5 h-5 text-teal" />
                          <span className="text-slate capitalize">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-32"
            >
              <h3 className="text-xl font-bold text-navy mb-6">Interested in this property?</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleContactWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </button>
                
                <button
                  onClick={() => window.open('tel:+919595771672')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
                
                <button
                  onClick={handleScheduleVisit}
                  className="w-full bg-teal hover:bg-teal-dark text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Visit
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-slate">
                  <p>Contact our property expert</p>
                  <p className="font-semibold text-navy">+91 95957 71672</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}