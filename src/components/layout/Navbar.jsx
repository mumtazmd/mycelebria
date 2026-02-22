import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import menuData from '../../data/menu.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [clickedDropdown, setClickedDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setClickedDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setClickedDropdown(null);
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleParentClick = (item) => {
    if (item.children.length > 0) {
      // Toggle dropdown on click
      if (clickedDropdown === item.id) {
        setClickedDropdown(null);
        setActiveDropdown(null);
      } else {
        setClickedDropdown(item.id);
        setActiveDropdown(item.id);
      }
    }
  };

  const handleMouseEnter = (item) => {
    if (item.children.length > 0 && clickedDropdown === null) {
      setActiveDropdown(item.id);
    }
  };

  const handleMouseLeave = () => {
    if (clickedDropdown === null) {
      setActiveDropdown(null);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">My Celebria</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {menuData.menuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children.length > 0 ? (
                    <button
                      onClick={() => handleParentClick(item)}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        isActive(`/category/${item.slug}`)
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-700 hover:text-primary-600'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                        (activeDropdown === item.id || clickedDropdown === item.id) ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      to={`/category/${item.slug}`}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        isActive(`/category/${item.slug}`)
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-700 hover:text-primary-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  
                  {/* Dropdown */}
                  {(activeDropdown === item.id || clickedDropdown === item.id) && item.children.length > 0 && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={`/category/${child.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                            onClick={() => {
                              setActiveDropdown(null);
                              setClickedDropdown(null);
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          {/* <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === 'vendor' ? '/dashboard/vendor' : '/dashboard/user'}
                  className="flex items-center text-gray-700 hover:text-primary-600"
                >
                  <User className="h-5 w-5 mr-1" />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div> */}

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuData.menuItems.map((item) => (
              <div key={item.id}>
                {item.children.length > 0 ? (
                  <button
                    onClick={() => handleParentClick(item)}
                    className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <div className="flex justify-between items-center">
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        clickedDropdown === item.id ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>
                ) : (
                  <Link
                    to={`/category/${item.slug}`}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                
                {item.children.length > 0 && clickedDropdown === item.id && (
                  <div className="pl-6 bg-gray-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={`/category/${child.slug}`}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary-600"
                        onClick={() => {
                          setIsOpen(false);
                          setClickedDropdown(null);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {user ? (
              <>
                <Link
                  to={user.role === 'vendor' ? '/dashboard/vendor' : '/dashboard/user'}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;