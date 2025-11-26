import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO } from '../utils/constants';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  ogImage, 
  ogTitle,
  ogDescription,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  robots = 'index, follow'
}) => {
  const siteTitle = title ? `${title} | Miracle Vivere` : DEFAULT_SEO.title;
  const siteDescription = description || DEFAULT_SEO.description;
  const siteKeywords = keywords.length > 0 ? keywords.join(', ') : DEFAULT_SEO.keywords.join(', ');
  const siteOgImage = ogImage || DEFAULT_SEO.ogImage;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="robots" content={robots} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || siteDescription} />
      <meta property="og:image" content={siteOgImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || siteTitle} />
      <meta name="twitter:description" content={twitterDescription || siteDescription} />
      <meta name="twitter:image" content={twitterImage || siteOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Miracle Vivere" />
    </Helmet>
  );
};

export default SEO;