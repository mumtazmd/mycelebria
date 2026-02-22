import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import vendorsData from '../data/vendors.json';
import categoriesData from '../data/categories.json';
import VendorCard from '../components/vendor/VendorCard';
import Filters from '../components/vendor/Filters';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const VendorListing = () => {
  const { slug } = useParams();
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const cat = categoriesData.categories.find(c => c.slug === slug);
    setCategory(cat);

    const filtered = vendorsData.vendors.filter(v => v.categorySlug === slug);
    setVendors(filtered);
    setFilteredVendors(filtered);
    
    setLoading(false);
  }, [slug]);

  const handleFilterChange = (filters) => {
    let result = [...vendors];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(searchLower) ||
        v.description.toLowerCase().includes(searchLower) ||
        v.services.some(s => s.toLowerCase().includes(searchLower))
      );
    }

    if (filters.minPrice) {
      result = result.filter(v => v.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter(v => v.price <= parseInt(filters.maxPrice));
    }

    if (filters.rating) {
      result = result.filter(v => v.rating >= parseFloat(filters.rating));
    }

    if (filters.location) {
      const locLower = filters.location.toLowerCase();
      result = result.filter(v => v.location.toLowerCase().includes(locLower));
    }

    setFilteredVendors(result);
  };

  if (loading) return <Loader />;
  if (!category) return <ErrorMessage message="Category not found" />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <Filters onFilterChange={handleFilterChange} />

        <div className="mb-4 text-gray-600">
          Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
        </div>

        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No vendors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorListing;