import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone } from 'lucide-react';

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center shadow">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-semibold">{vendor.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{vendor.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{vendor.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {vendor.location}
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Phone className="w-4 h-4 mr-1" />
          {vendor.phone}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {vendor.services.slice(0, 3).map((service, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">₹{vendor.price}</span>
            <span className="text-gray-500 text-sm">/event</span>
          </div>
          <Link
            to={`/vendor/${vendor.id}`}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;