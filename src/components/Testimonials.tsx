
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, location, rating, text, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-terracotta-300"
        />
        <div>
          <h4 className="font-bold text-sand-800">{name}</h4>
          <p className="text-sm text-sand-500">{location}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-sand-300'}`} 
          />
        ))}
      </div>
      <p className="text-sand-700 italic">{text}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United Kingdom",
      rating: 5,
      text: "Amazing experience! The guides were knowledgeable and the desert views were breathtaking. Would definitely recommend YouQuad to anyone visiting Morocco.",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "Mohamed Ali",
      location: "Morocco",
      rating: 5,
      text: "As a local, I've tried several quad rental companies, but YouQuad is by far the best. Great equipment, fair prices, and excellent service.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Pierre Dubois",
      location: "France",
      rating: 4,
      text: "Belle expérience avec des paysages magnifiques. Les guides étaient professionnels et sympathiques. Je recommande vivement!",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <section className="section-padding bg-sand-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What Our Customers Say</h2>
          <p className="text-sand-700 max-w-2xl mx-auto text-lg">
            Don't just take our word for it - hear what our customers have to say about their YouQuad adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
