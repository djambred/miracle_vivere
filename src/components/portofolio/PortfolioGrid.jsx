import { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import PortfolioCard from './PortfolioCard';
import { Filter } from 'lucide-react';

const PortfolioGrid = ({ category, tag, featured }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
    fetchCategories();
  }, [selectedCategory, tag, featured]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (tag) params.tag = tag;
      if (featured) params.featured = featured;

      const response = await portfolioAPI.getAll(params);
      setPortfolios(response.data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await portfolioAPI.getCategories();
      setCategories(['all', ...response.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} />
          <h3 className="font-semibold">Filter by Category</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio._id} portfolio={portfolio} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No portfolios found</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;