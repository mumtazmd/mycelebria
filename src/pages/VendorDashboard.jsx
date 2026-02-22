import React from 'react';
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const VendorDashboard = () => {
  const { user } = useAuth();
  const { getVendorBookings, updateBookingStatus } = useBooking();

  const vendorId = 1; 
  const bookings = getVendorBookings(vendorId);

  const stats = {
    totalBookings: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0)
  };

  const handleStatusUpdate = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
  };

  return (
    <DashboardLayout type="vendor">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
            <Calendar className="text-primary-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Users className="text-yellow-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <p className="text-2xl font-bold">₹{stats.revenue}</p>
            </div>
            <DollarSign className="text-primary-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Bookings</h3>
        
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Event Type</th>
                  <th className="text-left py-3 px-4">Date & Time</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-sm text-gray-500">{booking.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{booking.eventType}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p>{format(new Date(booking.date), 'MMM dd, yyyy')}</p>
                        <p className="text-sm text-gray-500">{booking.time}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">₹{booking.totalAmount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="mx-auto mb-4 text-gray-300" size={48} />
            <p>No bookings yet</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;