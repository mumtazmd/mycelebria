import React from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const UserDashboard = () => {
  const { user } = useAuth();
  const { getUserBookings } = useBooking();
  const location = useLocation();
  const message = location.state?.message;

  const bookings = user ? getUserBookings(user.id) : [];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout type="user">
      {message && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Welcome back, {user?.name}!</h2>
        <p className="text-gray-600">Manage your bookings and account settings from here.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Calendar className="mr-2" />
          My Bookings
        </h3>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{booking.vendorName}</h4>
                    <p className="text-gray-600 text-sm">{booking.eventType}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{format(new Date(booking.date), 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{booking.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium">₹{booking.totalAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="mx-auto mb-4 text-gray-300" size={48} />
            <p>No bookings yet</p>
            <p className="text-sm mt-2">Start by browsing our vendors!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;