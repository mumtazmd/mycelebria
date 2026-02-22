import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Check } from 'lucide-react';
import vendorsData from '../data/vendors.json';
import reviewsData from '../data/reviews.json';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const VendorDetail = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundVendor = vendorsData.vendors.find(v => v.id === parseInt(id));
    const vendorReviews = reviewsData.reviews.filter(r => r.vendorId === parseInt(id));
    
    setVendor(foundVendor);
    setReviews(vendorReviews);
    setLoading(false);
  }, [id]);

  if (loading) return <Loader />;
  if (!vendor) return <ErrorMessage message="Vendor not found" />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${vendor.categorySlug}`} className="hover:text-primary-600">
            {vendor.categorySlug}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{vendor.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{vendor.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-1" />
                    {vendor.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 text-green-600 fill-current mr-1" />
                    <span className="font-bold text-green-600">{vendor.rating}</span>
                    <span className="text-gray-500 ml-1">({vendor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{vendor.description}</p>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
                <div className="grid grid-cols-2 gap-3">
                  {vendor.services.map((service, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{review.userName}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      <p className="text-gray-400 text-xs mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-1">Starting from</p>
                <p className="text-4xl font-bold text-primary-600">₹{vendor.price}</p>
                <p className="text-gray-500 text-sm">per event</p>
              </div>

              <Link
                to={`/booking/${vendor.id}`}
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition mb-4"
              >
                Book Now
              </Link>

              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{vendor.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{vendor.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;