
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Users,
  Calendar,
  Award,
  MapPin,
  ShieldCheck,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from 'lucide-react';

const EnhancedAbout = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Hassan El Mansouri",
      position: "Founder & CEO",
      bio: "With over 15 years of experience guiding desert expeditions, Hassan founded YouQuad to share his passion for adventure and the beauty of Morocco's landscapes with visitors from around the world.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Fatima Zahra",
      position: "Operations Manager",
      bio: "Fatima ensures that every tour runs smoothly from booking to completion. Her attention to detail and customer service excellence has helped build YouQuad's reputation for reliability.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Omar Benali",
      position: "Head Tour Guide",
      bio: "Born and raised in the region, Omar knows every dune and hidden spot in the desert. His knowledge of local history and culture adds an educational dimension to our tours.",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Layla Idrissi",
      position: "Customer Experience",
      bio: "Layla is dedicated to creating unforgettable experiences for all our guests. She works closely with our guides to customize tours that exceed expectations.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  // Company history timeline
  const historyTimeline = [
    {
      year: "2012",
      title: "Company Founded",
      description: "YouQuad began with just 4 quad bikes and a passion for sharing the desert experience."
    },
    {
      year: "2015",
      title: "Expansion of Tours",
      description: "Added sunrise and sunset specialized tours, doubling our fleet size to accommodate growing demand."
    },
    {
      year: "2018",
      title: "Safety Certification",
      description: "Received international safety certification and implemented comprehensive training programs for all guides."
    },
    {
      year: "2021",
      title: "Eco-Initiative Launch",
      description: "Started our Desert Preservation Initiative, committing to sustainable tourism practices."
    },
    {
      year: "2024",
      title: "New Headquarters",
      description: "Opened our new headquarters with modern facilities and an expanded fleet of premium quad bikes."
    }
  ];

  // Company values
  const companyValues = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-terracotta-500" />,
      title: "Safety First",
      description: "We prioritize the safety of our customers above everything else, with rigorous equipment maintenance and guide training."
    },
    {
      icon: <Users className="h-8 w-8 text-terracotta-500" />,
      title: "Customer Experience",
      description: "Every decision we make is focused on providing the best possible experience for our guests."
    },
    {
      icon: <Heart className="h-8 w-8 text-terracotta-500" />,
      title: "Environmental Respect",
      description: "We are committed to preserving the natural beauty of the desert for future generations."
    },
    {
      icon: <Award className="h-8 w-8 text-terracotta-500" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our operations, from equipment quality to customer service."
    }
  ];

  // Safety statistics
  const safetyStats = [
    { label: "Years Without Major Incidents", value: "10+" },
    { label: "Safety Training Hours Per Guide", value: "120" },
    { label: "Equipment Safety Checks Per Month", value: "50+" },
    { label: "Certified First Aid Responders", value: "100%" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      {/* Hero Section */}
      <div className="relative bg-terracotta-600 py-32 px-4">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">About YouQuad Adventures</h1>
            <p className="text-sand-100 text-xl mb-8">
              Since 2012, we've been providing unforgettable desert adventures, 
              combining the thrill of quad biking with the breathtaking beauty of 
              Morocco's landscapes. Discover the passion behind our company and 
              the team that makes it all happen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button className="bg-white text-terracotta-600 hover:bg-sand-100">
                  Contact Us
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" className="border-white text-white hover:bg-terracotta-700">
                  Book an Adventure
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20 bg-white dark:bg-sand-800">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100 mb-6">Our Story</h2>
              <div className="space-y-4 text-sand-600 dark:text-sand-300">
                <p>
                  YouQuad Adventures was born from a simple love for the Moroccan desert and a desire to share its 
                  breathtaking beauty with travelers from around the world. What began as a small operation 
                  with just four quad bikes has grown into the region's premier adventure tour company.
                </p>
                <p>
                  Our founder, Hassan El Mansouri, spent his childhood exploring the dunes and valleys of 
                  the region. His intimate knowledge of the landscape and passion for adventure tourism laid 
                  the foundation for what YouQuad is today.
                </p>
                <p>
                  Over the years, we've expanded our fleet, diversified our tours, and built a team of expert 
                  guides who share our commitment to safety, environmental responsibility, and creating 
                  unforgettable experiences for our guests.
                </p>
                <p>
                  Today, we're proud to have hosted over 50,000 adventurers from across the globe, helping them 
                  discover the magic of Morocco's desert landscapes in a thrilling and responsible way.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
              variants={itemVariants}
            >
              <img 
                src="https://images.unsplash.com/photo-1487525219605-eadb39ae229c" 
                alt="Desert quad biking adventure" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <p className="text-white text-xl font-medium mb-2">Our first tour group in 2012</p>
                <p className="text-sand-100">Where it all began</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="py-20 bg-sand-100 dark:bg-sand-900">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100 mb-4">Our Journey</h2>
            <p className="text-sand-600 dark:text-sand-300 max-w-2xl mx-auto">
              From humble beginnings to becoming the region's leading adventure tour company, 
              our journey has been defined by passion, growth, and a commitment to excellence.
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-terracotta-300 dark:bg-terracotta-800"></div>
            
            {/* Timeline events */}
            <div className="space-y-24 relative">
              {historyTimeline.map((event, index) => (
                <motion.div 
                  key={event.year} 
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  variants={itemVariants}
                >
                  {/* Content side */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className="text-2xl font-bold text-terracotta-600 dark:text-terracotta-400 mb-2">{event.title}</h3>
                    <p className="text-sand-600 dark:text-sand-300">{event.description}</p>
                  </div>
                  
                  {/* Year bubble */}
                  <div className="w-2/12 flex justify-center relative z-10">
                    <div className="bg-terracotta-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-lg">
                      {event.year}
                    </div>
                  </div>
                  
                  {/* Empty side */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white dark:bg-sand-800">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100 mb-4">Our Values</h2>
            <p className="text-sand-600 dark:text-sand-300 max-w-2xl mx-auto">
              These core principles guide everything we do at YouQuad Adventures, from how we design our tours 
              to how we interact with our customers and care for the environment.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {companyValues.map((value, index) => (
              <motion.div 
                key={index} 
                className="bg-sand-50 dark:bg-sand-700 rounded-lg p-6 text-center shadow-md"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-sand-800 dark:text-sand-100 mb-2">{value.title}</h3>
                <p className="text-sand-600 dark:text-sand-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="py-20 bg-sand-100 dark:bg-sand-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100 mb-6">Safety Is Our Priority</h2>
              <div className="space-y-4 text-sand-600 dark:text-sand-300">
                <p>
                  At YouQuad, safety isn't just a consideration—it's our foundation. Every decision we make, 
                  from equipment selection to tour design, puts your safety first.
                </p>
                <p>
                  Our robust safety protocols include thorough equipment inspections before every tour, 
                  comprehensive training for all participants, and guides who are certified in wilderness 
                  first aid and rescue techniques.
                </p>
                <div className="pt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>Professional guides with 1000+ hours of experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>Daily equipment safety inspections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>Comprehensive safety briefings before each tour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>GPS tracking on all tours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>Emergency communication equipment on every tour</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {safetyStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-sand-800 rounded-lg p-6 text-center shadow-md"
                  variants={itemVariants}
                >
                  <p className="text-3xl font-bold text-terracotta-500 mb-2">{stat.value}</p>
                  <p className="text-sand-600 dark:text-sand-300 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-white dark:bg-sand-800">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100 mb-4">Meet Our Team</h2>
            <p className="text-sand-600 dark:text-sand-300 max-w-2xl mx-auto">
              The passionate people behind YouQuad who work tirelessly to ensure you have 
              the adventure of a lifetime.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-sand-50 dark:bg-sand-700 rounded-lg overflow-hidden shadow-md"
                variants={itemVariants}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-sand-800 dark:text-sand-100">{member.name}</h3>
                  <p className="text-terracotta-500 font-medium mb-3">{member.position}</p>
                  <p className="text-sand-600 dark:text-sand-300 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Location Section */}
      <section className="py-20 bg-sand-100 dark:bg-sand-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100">Visit Our Base Camp</h2>
              <p className="text-sand-600 dark:text-sand-300">
                Located just 20 minutes from Marrakech city center, our base camp is easily accessible 
                while still providing the perfect gateway to desert adventure.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-terracotta-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium text-sand-800 dark:text-sand-100">Address</h3>
                    <p className="text-sand-600 dark:text-sand-300">
                      Route de Fès, KM 15<br />
                      Marrakech, Morocco
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-terracotta-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium text-sand-800 dark:text-sand-100">Operating Hours</h3>
                    <p className="text-sand-600 dark:text-sand-300">
                      Monday - Sunday: 7:00 AM - 6:00 PM<br />
                      Tours depart throughout the day
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-sand-800 dark:text-sand-100 mb-2">Facilities at our base camp:</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Facility</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Parking</TableCell>
                      <TableCell>Free secure parking for 50+ vehicles</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Refreshments</TableCell>
                      <TableCell>Café with local drinks and snacks</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Equipment Shop</TableCell>
                      <TableCell>Accessories and protective gear available</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Training Area</TableCell>
                      <TableCell>Beginner practice zone for quad handling</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Restrooms</TableCell>
                      <TableCell>Clean facilities with showers available</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54341.88151693401!2d-7.994484070371823!3d31.63064970703521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh%2C%20Morocco!5e0!3m2!1sen!2sus!4v1651244296028!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="YouQuad location map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-20 bg-terracotta-600 text-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Commitment to Sustainability</h2>
            <p className="text-sand-100 max-w-2xl mx-auto">
              We believe in adventure that doesn't come at the expense of our environment or local communities. 
              Our sustainability initiatives are at the heart of our operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-3">Environmental Protection</h3>
              <p className="text-sand-100 mb-4">
                We strictly follow designated trails to minimize our impact on the fragile desert ecosystem. 
                Our Desert Preservation Initiative includes regular clean-up operations and habitat protection efforts.
              </p>
              <ul className="space-y-2 text-sand-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Regular desert clean-up operations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Trail maintenance to prevent erosion</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Wildlife monitoring program</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-3">Community Support</h3>
              <p className="text-sand-100 mb-4">
                We're proud to support the local communities in the areas where we operate. From employing local guides 
                to supporting local businesses, we ensure that tourism benefits the region's economy.
              </p>
              <ul className="space-y-2 text-sand-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>90% of our team are local residents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Partnership with local artisans</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>School sponsorship program</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-3">Future Goals</h3>
              <p className="text-sand-100 mb-4">
                We're continually striving to improve our sustainability practices. Our upcoming initiatives include 
                transitioning to electric quads and implementing a carbon offset program for all our tours.
              </p>
              <ul className="space-y-2 text-sand-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Pilot electric quad program by 2026</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Carbon offset program launching 2025</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Zero waste operations by 2027</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connect with us */}
      <section className="py-20 bg-white dark:bg-sand-800">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100 mb-4">Follow Our Adventures</h2>
            <p className="text-sand-600 dark:text-sand-300 max-w-2xl mx-auto mb-8">
              Connect with us on social media for the latest photos, videos, and stories from our desert adventures.
            </p>

            <div className="flex justify-center space-x-6">
              <a href="#" className="text-sand-600 dark:text-sand-300 hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">
                <Instagram className="h-8 w-8" />
              </a>
              <a href="#" className="text-sand-600 dark:text-sand-300 hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">
                <Facebook className="h-8 w-8" />
              </a>
              <a href="#" className="text-sand-600 dark:text-sand-300 hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">
                <Twitter className="h-8 w-8" />
              </a>
              <a href="#" className="text-sand-600 dark:text-sand-300 hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">
                <Youtube className="h-8 w-8" />
              </a>
            </div>

            <div className="mt-12">
              <Link to="/contact">
                <Button className="bg-terracotta-500 text-white hover:bg-terracotta-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedAbout;
