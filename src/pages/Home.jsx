import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Clock } from 'lucide-react';
import categoriesData from '../data/categories.json';
import vendorsData from '../data/vendors.json';
import VendorCard from '../components/vendor/VendorCard';

const Home = () => {
  const featuredVendors = vendorsData.vendors.slice(0, 4);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Make Your Celebrations<br />Unforgettable
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Find the best decorators and event planners for your special moments
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-lg p-2 shadow-lg">
                <div className="flex-1 flex items-center px-4">
                  <Search className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="What are you planning?"
                    className="w-full text-gray-900 outline-none"
                  />
                </div>
                <Link
                  to="/category/birthday-decorations"
                  className="bg-primary-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-700 transition"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesData.categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-semibold text-lg">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Vendors</h2>
            <Link to="/category/decorations" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose MyCelebria</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Vendors</h3>
            <p className="text-gray-600">All our vendors are thoroughly vetted to ensure quality service</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
            <p className="text-gray-600">Your payments and personal information are always protected</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our team is always here to help you with your event planning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;