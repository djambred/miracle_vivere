import { useEffect, useState } from 'react';
import { seoAPI } from '../services/api';
import { Award, Briefcase, GraduationCap, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    try {
      const response = await seoAPI.getByPage('about');
      setSeoData(response.data);
    } catch (error) {
      console.log('No SEO data found for about page');
    }
  };

  const skills = [
    'Web Development',
    'UI/UX Design',
    'Mobile Apps',
    'Branding',
    'Photography',
    'Video Production'
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in every project'
    },
    {
      icon: Briefcase,
      title: 'Professionalism',
      description: 'Maintaining clear communication and meeting deadlines'
    },
    {
      icon: GraduationCap,
      title: 'Continuous Learning',
      description: 'Always staying updated with the latest trends and technologies'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Loving what I do and putting heart into every creation'
    }
  ];

  return (
    <>
      <SEO
        title={seoData?.title || 'About'}
        description={seoData?.description}
        keywords={seoData?.keywords}
        ogImage={seoData?.ogImage}
      />

      <div className="container-custom py-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-gray-600">
            Passionate designer and developer creating meaningful digital experiences
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="card p-8">
            <p className="text-lg text-gray-700 mb-4">
              Hello! I'm Miracle Vivere, a creative professional specializing in digital design and development. 
              With years of experience in the industry, I've had the privilege of working with diverse clients 
              and bringing their visions to life.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              My approach combines aesthetic excellence with functional design, ensuring that every project 
              not only looks beautiful but also delivers real value to users and businesses.
            </p>
            <p className="text-lg text-gray-700">
              When I'm not working on projects, you can find me exploring new design trends, learning new 
              technologies, or capturing moments through photography.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="card p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg">{skill}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;