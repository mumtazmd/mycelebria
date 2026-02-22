import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  LogOut, 
  Store,
  ChevronRight
} from 'lucide-react';

const DashboardLayout = ({ children, type }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    { path: '/dashboard/user', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/user/bookings', label: 'My Bookings', icon: Calendar },
    { path: '/dashboard/user/settings', label: 'Settings', icon: Settings },
  ];

  const vendorMenuItems = [
    { path: '/dashboard/vendor', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/vendor/bookings', label: 'Bookings', icon: Calendar },
    { path: '/dashboard/vendor/profile', label: 'Profile', icon: Store },
    { path: '/dashboard/vendor/settings', label: 'Settings', icon: Settings },
  ];

  const menuItems = type === 'vendor' ? vendorMenuItems : userMenuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-primary-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-primary-100 capitalize">{type}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between p-3 rounded-lg mb-1 transition ${
                        isActive 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon size={20} className="mr-3" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight size={16} />}
                    </Link>
                  );
                })}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4"
                >
                  <LogOut size={20} className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;