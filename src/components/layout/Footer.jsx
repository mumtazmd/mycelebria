import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">My Celebria</h3>
            <p className="text-gray-400 mb-4">
              Making your celebrations memorable with the best vendors and services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/category/birthday-decorations" className="text-gray-400 hover:text-white">Birthday</Link></li>
              <li><Link to="/category/corporate-planner" className="text-gray-400 hover:text-white">Corporate</Link></li>
              <li><Link to="/category/occasions" className="text-gray-400 hover:text-white">Occasions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/category/decorations" className="text-gray-400 hover:text-white">Decorations</Link></li>
              <li><Link to="/category/baby-shower" className="text-gray-400 hover:text-white">Baby Shower</Link></li>
              <li><Link to="/category/house-warming" className="text-gray-400 hover:text-white">House Warming</Link></li>
              <li><Link to="/category/surprises" className="text-gray-400 hover:text-white">Surprises</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                +91 9052702609
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                support@mycelebria.com
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin size={16} className="mr-2 mt-1" />
                Opposite HK Tent House, RTC Colony, Moula Ali, Hyderabad-500040
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 MyCelebria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;