
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Search,
  BookOpen,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Desert Quad Biking",
    excerpt: "Planning your first quad biking adventure in the desert? Here are the essential tips to ensure a safe and enjoyable experience.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl.",
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
    date: "2025-04-15",
    author: "Mohammed Al-Farsi",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    readTime: "6 min read",
    tags: ["Tips", "Safety", "Beginners"]
  },
  {
    id: 2,
    title: "Exploring Morocco's Hidden Desert Gems by Quad",
    excerpt: "Discover the secret locations only accessible by quad bike in Morocco's vast desert landscapes.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969",
    date: "2025-04-03",
    author: "Fatima Zahra",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    readTime: "8 min read",
    tags: ["Exploration", "Travel", "Morocco"]
  },
  {
    id: 3,
    title: "The Ultimate Guide to Desert Photography from Your Quad",
    excerpt: "Learn how to capture stunning desert landscapes while on your quad biking adventure with these photography tips.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl.",
    image: "https://images.unsplash.com/photo-1547473078-cbab237054c0",
    date: "2025-03-22",
    author: "Ahmed Benali",
    authorImage: "https://randomuser.me/api/portraits/men/51.jpg",
    readTime: "10 min read",
    tags: ["Photography", "Guide", "Creative"]
  },
  {
    id: 4,
    title: "New 2025 Quad Models: What's Changed?",
    excerpt: "Our fleet just got upgraded! Check out the new features and improvements in our latest quad bike models.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
    date: "2025-03-15",
    author: "Youssef El-Khadir",
    authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
    readTime: "5 min read",
    tags: ["News", "Equipment", "Update"]
  },
  {
    id: 5,
    title: "Desert Sunset Tours: A Magical Experience",
    excerpt: "Experience the magic of the desert as the sun sets and transforms the landscape into a golden paradise.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl.",
    image: "https://images.unsplash.com/photo-1542442828-287217bfb87f",
    date: "2025-03-08",
    author: "Leila Mansour",
    authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
    readTime: "7 min read",
    tags: ["Tours", "Sunset", "Experience"]
  },
  {
    id: 6,
    title: "Family-Friendly Quad Adventures: What to Know",
    excerpt: "Planning a family quad biking trip? Here's everything you need to know to make it safe and fun for everyone.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl. Sed euismod, urna eu tempor congue, nisi erat euismod nisi, eget ultricies nisl nisl eu nisl.",
    image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab",
    date: "2025-02-28",
    author: "Karim Abouelazm",
    authorImage: "https://randomuser.me/api/portraits/men/75.jpg",
    readTime: "9 min read",
    tags: ["Family", "Safety", "Guide"]
  }
];

// Blog categories
const categories = [
  { name: "Adventure", count: 12 },
  { name: "Tips & Guides", count: 8 },
  { name: "Equipment", count: 5 },
  { name: "Safety", count: 7 },
  { name: "Destinations", count: 10 },
  { name: "News", count: 4 },
  { name: "Stories", count: 6 },
];

// Recent posts for sidebar
const recentPosts = blogPosts.slice(0, 3);

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedTag, setSelectedTag] = useState('');

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredPosts(blogPosts);
    } else {
      const results = blogPosts.filter(
        post => 
          post.title.toLowerCase().includes(term) || 
          post.excerpt.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          post.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setFilteredPosts(results);
    }
  };

  // Handle tag filter
  const handleTagFilter = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag('');
      setFilteredPosts(blogPosts);
    } else {
      setSelectedTag(tag);
      const results = blogPosts.filter(
        post => post.tags.includes(tag)
      );
      setFilteredPosts(results);
    }
  };

  // Collect all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

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

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Blog & News</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Stay updated with our latest adventure stories, quad biking tips, and desert news.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <motion.div 
            className="w-full md:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Search input */}
            <motion.div className="mb-8" variants={itemVariants}>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-sand-400" />
                <Input 
                  className="pl-10" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </motion.div>
            
            {/* Tag filters */}
            <motion.div className="mb-8 flex flex-wrap gap-2" variants={itemVariants}>
              {allTags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTag === tag 
                      ? "bg-terracotta-500 hover:bg-terracotta-600" 
                      : "hover:bg-sand-200 dark:hover:bg-sand-700"
                  }`}
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>

            {/* Blog posts grid */}
            {filteredPosts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 gap-8"
                variants={containerVariants}
              >
                {filteredPosts.map((post, index) => (
                  <motion.div 
                    key={post.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-sand-800 border-sand-200 dark:border-sand-700">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="md:w-2/3">
                          <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-sand-500 dark:text-sand-400 mb-2">
                              <Calendar className="h-4 w-4" /> 
                              <span>{formatDate(post.date)}</span>
                              <span className="mx-2">•</span>
                              <BookOpen className="h-4 w-4" /> 
                              <span>{post.readTime}</span>
                            </div>
                            <CardTitle className="text-xl sm:text-2xl hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors">
                              <Link to={`/blog/${post.id}`}>
                                {post.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="line-clamp-2 mt-2">
                              {post.excerpt}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline"
                                  className="cursor-pointer hover:bg-sand-200 dark:hover:bg-sand-700"
                                  onClick={() => handleTagFilter(tag)}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          
                          <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <img 
                                src={post.authorImage} 
                                alt={post.author}
                                className="w-8 h-8 rounded-full" 
                              />
                              <span className="text-sm text-sand-600 dark:text-sand-300">{post.author}</span>
                            </div>
                            <Link 
                              to={`/blog/${post.id}`}
                              className="text-terracotta-500 dark:text-terracotta-400 hover:text-terracotta-600 dark:hover:text-terracotta-500 flex items-center gap-1 text-sm font-medium"
                            >
                              Read More <ChevronRight className="h-4 w-4" />
                            </Link>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12"
                variants={itemVariants}
              >
                <h3 className="text-xl font-medium text-sand-800 dark:text-sand-100 mb-2">No articles found</h3>
                <p className="text-sand-600 dark:text-sand-400 mb-4">Try adjusting your search or filter criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('');
                    setFilteredPosts(blogPosts);
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            className="w-full md:w-1/3 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Categories */}
            <motion.div 
              className="bg-white dark:bg-sand-800 rounded-lg shadow p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-4 text-sand-800 dark:text-sand-100">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <Link 
                      to="#" 
                      className="text-sand-600 dark:text-sand-300 hover:text-terracotta-500 dark:hover:text-terracotta-400"
                    >
                      {category.name}
                    </Link>
                    <span className="bg-sand-100 dark:bg-sand-700 text-sand-600 dark:text-sand-300 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Recent posts */}
            <motion.div 
              className="bg-white dark:bg-sand-800 rounded-lg shadow p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-4 text-sand-800 dark:text-sand-100">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex gap-3">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="font-medium hover:text-terracotta-500 dark:hover:text-terracotta-400 text-sand-800 dark:text-sand-100 line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Newsletter signup */}
            <motion.div 
              className="bg-terracotta-500 text-white rounded-lg shadow p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h3>
              <p className="mb-4 text-sand-100">Get the latest updates and offers directly to your inbox.</p>
              <div className="space-y-2">
                <Input 
                  placeholder="Your email address" 
                  className="bg-white text-sand-800 border-0 placeholder:text-sand-400"
                />
                <Button className="w-full bg-sand-800 hover:bg-sand-900 text-white">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
