import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioAPI } from '../../services/api';
import { Calendar, Tag, ExternalLink, User, ArrowLeft } from 'lucide-react';
import { formatDate, getImageUrl } from '../../utils/helpers';
import Button from '../common/Button';
import SEO from '../SEO';

const PortfolioDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [slug]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getBySlug(slug);
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Portfolio Not Found</h2>
        <Button onClick={() => navigate('/portfolio')}>
          <ArrowLeft size={20} className="mr-2" />
          Back to Portfolio
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={portfolio.title}
        description={portfolio.description}
        keywords={portfolio.tags}
        ogImage={getImageUrl(portfolio.thumbnail)}
      />

      <div className="container-custom py-12">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/portfolio')}
          className="mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Portfolio
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{portfolio.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={20} />
              {formatDate(portfolio.date)}
            </span>
            <span className="flex items-center gap-2">
              <Tag size={20} />
              {portfolio.category}
            </span>
            {portfolio.client && (
              <span className="flex items-center gap-2">
                <User size={20} />
                {portfolio.client}
              </span>
            )}
          </div>

          {portfolio.link && (
            
              href={portfolio.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <ExternalLink size={20} />
              View Live Project
            </a>
          )}
        </div>

        {/* Main Image */}
        <div className="mb-12">
          <img
            src={getImageUrl(portfolio.thumbnail)}
            alt={portfolio.title}
            className="w-full h-[500px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: portfolio.description }} />
        </div>

        {/* Additional Images */}
        {portfolio.images && portfolio.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.images.map((image, index) => (
                <img
                  key={index}
                  src={getImageUrl(image.url)}
                  alt={image.alt || `${portfolio.title} - Image ${index + 1}`}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {portfolio.tags && portfolio.tags.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {portfolio.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioDetail;