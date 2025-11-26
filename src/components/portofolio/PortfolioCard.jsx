import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { formatDate, getImageUrl } from '../../utils/helpers';

const PortfolioCard = ({ portfolio }) => {
  return (
    <Link
      to={`/portfolio/${portfolio.slug}`}
      className="card group overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={getImageUrl(portfolio.thumbnail)}
          alt={portfolio.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {portfolio.featured && (
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {formatDate(portfolio.date)}
          </span>
          <span className="flex items-center gap-1">
            <Tag size={16} />
            {portfolio.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {portfolio.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {portfolio.description}
        </p>

        {portfolio.tags && portfolio.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {portfolio.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PortfolioCard;