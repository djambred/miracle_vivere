import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { portfolioAPI, seoAPI } from '../services/api';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import Button from '../components/common/Button';
import SEO from '../components/SEO';

const Home = () => {
  const [featuredPortfolios, setFeaturedPortfolios] = useState([]);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch featured portfolios
      const portfolioResponse = await portfolioAPI.getAll({ featured: true });
      setFeaturedPortfolios(portfolioResponse.data.slice(0, 3));

      // Fetch SEO data
      try {
        const seoResponse = await seoAPI.getByPage('home');
        setSeoData(seoResponse.data);
      } catch (error) {
        // SEO data might not exist yet
        console.log('No SEO data found for home page');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={seoData?.title}
        description={seoData?.description}
        keywords={seoData?.keywords}
        ogImage={seoData?.ogImage}
        ogTitle={seoData?.ogTitle}
        ogDescription={seoData?.ogDescription}
        twitterTitle={seoData?.twitterTitle}
        twitterDescription={seoData?.twitterDescription}
        twitterImage={seoData?.twitterImage}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Sparkles size={20} />
              <span className="font-medium">Welcome to Miracle Vivere</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Creating Digital
              <span className="text-primary-600"> Experiences</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transforming ideas into beautiful, functional digital solutions that make an impact
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio">
                <Button size="lg">
                  View Portfolio
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4x