import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import MyContainer from '../components/MyContainer';
import useAxios from '../hooks/useAxios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all'); // all, free, paid
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('rating-desc');

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get('/courses')
      .then((response) => {
        setCourses(response.data);
        setFilteredCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, [axiosInstance]);

  // Extract unique categories dynamically
  const categories = ['all', ...new Set(courses.map((course) => course.category).filter(Boolean))];

  // Apply filters and sorting whenever relevant state changes
  useEffect(() => {
    let result = [...courses];

    // Search filter
    if (searchTerm) {
      result = result.filter((course) =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Price filter
    if (selectedPrice === 'free') {
      result = result.filter((course) => course.price === 0 || course.isFree);
    } else if (selectedPrice === 'paid') {
      result = result.filter((course) => course.price > 0 && !course.isFree);
    }

    // Level filter
    if (selectedLevel !== 'all') {
      result = result.filter((course) => course.level === selectedLevel);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'rating-asc':
          return (a.rating || 0) - (b.rating || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'popular':
          return (b.enrollments || b.students || 0) - (a.enrollments || a.students || 0);
        default:
          return 0;
      }
    });

    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, selectedPrice, selectedLevel, sortBy, courses]);

  return (
    <MyContainer>
      <h1 className="text-4xl font-bold text-primary text-center my-8">All Courses</h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Price Filter */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Prices</option>
            <option value="free">Free Only</option>
            <option value="paid">Paid Only</option>
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="rating-desc">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredCourses.length} of {courses.length} courses
      </p>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-10">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredCourses.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-2xl">No courses found matching your filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedPrice('all');
              setSelectedLevel('all');
              setSortBy('rating-desc');
            }}
            className="mt-4 text-primary underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </MyContainer>
  );
};

export default Courses;