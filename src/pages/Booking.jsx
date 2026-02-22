import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import vendorsData from '../data/vendors.json';
import BookingForm from '../components/booking/BookingForm';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const Booking = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundVendor = vendorsData.vendors.find(v => v.id === parseInt(vendorId));
    setVendor(foundVendor);
    setLoading(false);
  }, [vendorId]);

  if (loading) return <Loader />;
  if (!vendor) return <ErrorMessage message="Vendor not found" />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Book {vendor.name}</h1>
            <p className="text-primary-100">Fill in the details below to confirm your booking</p>
          </div>
          
          <div className="p-6">
            <BookingForm vendor={vendor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;