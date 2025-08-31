import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  User,
  ExternalLink,
  Calendar,
  Tag,
  Search,
  TrendingUp,
  Bookmark,
  Menu,
  X,
  Bell,
  Globe,
  Star,
  ArrowRight,
  Play,
  Share2,
  MessageCircle,
  Heart,
  Eye,
  ChevronRight,
  Filter,
  Zap,
  LogOut,
} from "lucide-react";
import axios from "axios";
import newsHeroBg from "./../assets/bg.jpg";
import { logout } from "../services";
// Mock logout function for now

const NewsHub = () => {
  const [articles, setArticles] = useState([]);
  const [updatedNews, setUpdatedNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    const apiUrl = "https://saurav.tech/NewsAPI/everything/cnn.json";

    try {
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setUpdatedNews(response.data);
      setArticles(response.data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Filter articles based on search query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get featured article (first article)
  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;

  // Get remaining articles for different sections
  const breakingNews = filteredArticles.slice(1, 4);
  const mainArticles = filteredArticles.slice(4, 10);
  const sidebarArticles = filteredArticles.slice(10, 16);
  const trendingArticles = filteredArticles.slice(16, 21);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const navigationItems = ["Business", "Technology", "Sports", "Health"];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed w-full z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-sm"
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0 font-bold text-2xl">
              <span className="bg-gradient-to-r text-white from-white to-red-800/70 ">
                FindNews!
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="lg:flex hidden">
              <div className="ml-10 gap-10 md:flex hidden  ">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => setActiveCategory(item)}
                    className="text-white"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                    {activeCategory === item && (
                      <motion.div
                        className="absolute text-white inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        layoutId="activeTab"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
              </motion.button>
              <motion.button
                onClick={() => logout()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex text-white items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                <LogOut className="w-4 h-4 text-white" />
                Logout
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <motion.button
                onClick={() => logout()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex text-white items-center gap-2 px-3 py-2 bg-red-800/70 rounded-lg text-sm"
              >
                <LogOut className="w-4 h-4 text-white" />
                Logout
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card/80 backdrop-blur-md border-t border-border"
            >
              <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
                {/* Mobile Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search breaking news..."
                    className="w-full pl-10 pr-4 py-3 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Mobile Navigation */}
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      setActiveCategory(item);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeCategory === item
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section with News Background */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${newsHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-red-800/20 text-white font-semibold text-sm mb-6 border border-red-800/30 backdrop-blur-sm"
            >
              <Star className="h-4 w-4 mr-2" />
              Trusted News Since 2024
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white"
            >
              Your <span className="gradient-text">Gateway</span> to the World
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed"
            >
              Breaking news from around the globe, delivered fresh every minute. Get comprehensive
              coverage, expert analysis, and real-time updates on the stories that shape your world.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search breaking news, topics, or sources..."
                  className="w-full pl-12 pr-4 py-4 text-lg bg-card/90 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Categories Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {["Breaking", "World", "Politics", "Business", "Technology", "Sports"].map(
                (category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-card/20 hover:bg-card/30 border border-card/30 rounded-full text-sm font-medium text-white hover:text-primary backdrop-blur-sm transition-all duration-300"
                  >
                    {category}
                  </motion.button>
                ),
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              {[
                { label: "Live Updates", value: "24/7", icon: Clock },
                { label: "Global Sources", value: "500+", icon: Globe },
                { label: "Daily Readers", value: "2M+", icon: Eye },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-3 px-6 py-4 bg-card/20 rounded-xl border border-card/30 backdrop-blur-sm"
                >
                  <stat.icon className="h-6 w-6 text-red-800" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-10 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto border border-border"
          >
            <div className="text-destructive mb-4">
              <X className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Failed to Load News</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchNews}
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Article */}
              {featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3 text-foreground">
                      <Tag className="h-7 w-7 text-primary" />
                      Featured Story
                    </h2>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-muted hover:bg-accent transition-colors"
                      >
                        <Share2 className="h-5 w-5 text-muted-foreground" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-muted hover:bg-accent transition-colors"
                      >
                        <Bookmark className="h-5 w-5 text-muted-foreground" />
                      </motion.button>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-border"
                    style={{ boxShadow: "var(--shadow-news-card)" }}
                  >
                    <div className="relative h-96 overflow-hidden">
                      <motion.img
                        src={featuredArticle.urlToImage || "/placeholder.svg"}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Article overlay info */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-4 py-2 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full border border-primary-foreground/20">
                            {featuredArticle.source.name}
                          </span>
                          <span className="text-sm opacity-90">
                            {getTimeAgo(featuredArticle.publishedAt)}
                          </span>
                        </div>

                        <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-red-800 transition-colors">
                          {featuredArticle.title}
                        </h3>

                        <p className="text-lg opacity-90 mb-6 line-clamp-2">
                          {featuredArticle.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {featuredArticle.author || "FindNews!"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(featuredArticle.publishedAt)}
                            </div>
                          </div>

                          <motion.a
                            href={featuredArticle.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            className="inline-flex items-center text-red-800 font-semibold hover:text-red-800/80 transition-colors"
                          >
                            Read Full Story
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </motion.a>
                        </div>
                      </div>

                      {/* Play button overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
                      >
                        <div className="bg-card/20 backdrop-blur-sm rounded-full p-6">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Breaking News Section */}
              {breakingNews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-12"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                      <Zap className="h-6 w-6 text-red-800" />
                      Breaking News
                    </h2>
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="text-primary font-medium flex items-center gap-1 hover:text-primary/80"
                    >
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {breakingNews.map((article, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-card rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-border hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            src={article.urlToImage || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-red-800 text-destructive-foreground text-xs font-bold rounded-full animate-pulse">
                              BREAKING
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {article.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {getTimeAgo(article.publishedAt)}
                            </div>
                            <motion.a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 2 }}
                              className="text-primary font-medium text-sm hover:text-primary/80"
                            >
                              Read More
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Latest Stories */}
              {mainArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                      <Clock className="h-6 w-6 text-primary" />
                      Latest Stories
                    </h2>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-muted hover:bg-accent transition-colors"
                      >
                        <Filter className="h-5 w-5 text-muted-foreground" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {mainArticles.map((article, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-card rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-border hover:shadow-xl transition-all duration-300"
                      >
                        <div className="md:flex">
                          <div className="md:w-2/5 relative overflow-hidden">
                            <motion.img
                              src={article.urlToImage || "/placeholder.svg"}
                              alt={article.title}
                              className="w-full h-64 md:h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <div className="absolute top-4 left-4">
                              <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                                {article.source.name}
                              </span>
                            </div>
                          </div>

                          <div className="p-8 md:w-3/5 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-semibold mb-4 line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                                {article.title}
                              </h3>
                              <p className="text-muted-foreground mb-6 line-clamp-3">
                                {article.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(article.publishedAt)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {article.author || "FindNews!"}
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                >
                                  <Heart className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                >
                                  <MessageCircle className="h-4 w-4" />
                                </motion.button>
                                <motion.a
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ x: 4 }}
                                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 ml-2"
                                >
                                  Read More
                                  <ExternalLink className="ml-1 h-4 w-4" />
                                </motion.a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="sticky top-32 space-y-8"
              >
                {/* Trending Topics */}
                <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                    <TrendingUp className="h-5 w-5 text-red-800" />
                    Trending Topics
                  </h3>
                  <div className="space-y-4">
                    {trendingArticles.slice(0, 5).map((article, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 4 }}
                        className="flex gap-3 group cursor-pointer pb-4 border-b border-border last:border-b-0 last:pb-0"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                          <img
                            src={article.urlToImage || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1 text-foreground">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{getTimeAgo(article.publishedAt)}</span>
                            <span>•</span>
                            <span>{article.source.name}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-red-800/10 to-red-800/70/10 p-6 border border-primary/20">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-foreground">Stay Updated</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Get the latest breaking news and analysis delivered straight to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                      >
                        Subscribe to Newsletter
                      </motion.button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Join 100,000+ readers. Unsubscribe anytime.
                    </p>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full opacity-50" />
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-red-800/10 rounded-full opacity-50" />
                </div>

                {/* Recent Updates */}
                <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Recent Updates</h3>
                  <div className="space-y-4">
                    {sidebarArticles.slice(0, 4).map((article, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 4 }}
                        className="group cursor-pointer"
                      >
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2 text-foreground">
                          {article.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(article.publishedAt)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Bookmark className="h-3 w-3" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NewsHub;
