import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Facebook, ChevronRight, Award, Users, BookOpen, Search, School, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from './components/AuthModal';
import { AuthProvider, useAuth } from './components/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'signin' | 'signup' }>({
    isOpen: false,
    type: 'signin'
  });

  return (
    <nav className="glass-card fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Zap className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold text-white">NextGenRecruiting</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center space-x-12">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/athletes" className="nav-link">Athletes</Link>
            <Link to="/schools" className="nav-link">Schools</Link>
            <Link to="/recruiters" className="nav-link">Recruiters</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 nav-link">Home</Link>
            <Link to="/about" className="block px-3 py-2 nav-link">About</Link>
            <Link to="/athletes" className="block px-3 py-2 nav-link">Athletes</Link>
            <Link to="/schools" className="block px-3 py-2 nav-link">Schools</Link>
            <Link to="/recruiters" className="block px-3 py-2 nav-link">Recruiters</Link>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={authModal.isOpen}
        type={authModal.type}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
      />
    </nav>
  );
};

const HomePage = () => (
  <div className="pt-16">
    <div 
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://wpcdn.us-east-1.vip.tn-cloud.net/www.klkntv.com/content/uploads/2022/09/s/v/092222wnt1200x667.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">Next Generation of Volleyball Recruiting</h1>
            <p className="text-2xl mb-8 text-gray-300">Elevate your game. Connect with top programs. Shape your future.</p>
            <button className="btn-primary text-lg flex items-center mx-auto">
              Start Your Journey
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Why Choose NextGenRecruiting?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Revolutionizing volleyball recruitment through technology and innovation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="glass-card p-8 rounded-2xl hover:border-pink-500/30 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <Users className="h-12 w-12 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white text-center">Smart Matching</h3>
            <p className="text-gray-300 text-center">AI-powered matching with college programs based on your skills and preferences</p>
          </div>
          <div className="glass-card p-8 rounded-2xl hover:border-pink-500/30 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <Award className="h-12 w-12 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white text-center">Performance Analytics</h3>
            <p className="text-gray-300 text-center">Advanced statistics and performance tracking to showcase your growth</p>
          </div>
          <div className="glass-card p-8 rounded-2xl hover:border-pink-500/30 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-12 w-12 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white text-center">Digital Portfolio</h3>
            <p className="text-gray-300 text-center">Create a professional digital presence with highlight reels and stats</p>
          </div>
        </div>
      </div>
    </div>

    <div className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Join the ranks of athletes who transformed their recruiting journey with NextGenRecruiting.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl">
            <p className="text-gray-300 mb-6">"The AI matching system connected me with programs I hadn't even considered. Now I'm playing D1 volleyball on a full scholarship!"</p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Testimonial"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-white">Sarah Johnson</h4>
                <p className="text-sm text-gray-400">Stanford University '24</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-8 rounded-2xl">
            <p className="text-gray-300 mb-6">"The digital portfolio feature made it easy to showcase my skills. Coaches were impressed by the professional presentation."</p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Testimonial"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-white">Emily Chen</h4>
                <p className="text-sm text-gray-400">UCLA '25</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-8 rounded-2xl">
            <p className="text-gray-300 mb-6">"As a coach, the analytics help me identify talent that fits our program's specific needs. It's revolutionized our recruiting."</p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Testimonial"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-white">Coach Mike Davis</h4>
                <p className="text-sm text-gray-400">University of Texas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-pink-900 to-pink-700 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Recruiting Journey?</h2>
        <p className="text-xl text-gray-200 mb-8">Join the next generation of volleyball athletes</p>
        <button className="btn-secondary">
          Create Your Profile
        </button>
      </div>
    </div>

    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">NextGenRecruiting</h3>
            <p className="text-gray-400">Empowering the future of volleyball</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">About Us</Link></li>
              <li><Link to="/athletes" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">Athletes</Link></li>
              <li><Link to="/coaches" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">Coaches</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: recruit@nextgen.com</li>
              <li className="text-gray-400">Phone: (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NextGenRecruiting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
);

const AboutPage = () => (
  <div className="pt-16">
    <div className="bg-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-white">About NextGenRecruiting</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Revolutionizing volleyball recruitment through cutting-edge technology and data-driven insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At NextGenRecruiting, we're transforming how volleyball talent connects with collegiate opportunities. 
              Our AI-powered platform creates perfect matches between athletes and programs, while our advanced 
              analytics provide deep insights into player development.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Trophy className="h-6 w-6 text-pink-500 mr-3" />
                <span className="text-gray-300">2000+ successful commitments</span>
              </div>
              <div className="flex items-center">
                <School className="h-6 w-6 text-pink-500 mr-3" />
                <span className="text-gray-300">Partnerships with 800+ colleges</span>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-pink-500 mr-3" />
                <span className="text-gray-300">20,000+ active athletes</span>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80" 
              alt="Volleyball Team"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how our platform is changing the game for volleyball athletes nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Athlete"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Maria Rodriguez</h3>
                <p className="text-gray-400">Penn State University '23</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "NextGenRecruiting's AI matching system connected me with programs that perfectly aligned with my 
              playing style and academic goals. The analytics helped me showcase my improvement over time, 
              making my recruiting journey strategic and successful."
            </p>
            <div className="flex items-center text-pink-500">
              <Trophy className="h-5 w-5 mr-2" />
              <span className="font-semibold">2022 Conference Champion</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Athlete"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Ashley Thompson</h3>
                <p className="text-gray-400">University of Florida '24</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "The digital portfolio feature set me apart from other recruits. Coaches were impressed by the 
              professional presentation of my stats, academic achievements, and game footage. NextGenRecruiting 
              made the entire process seamless."
            </p>
            <div className="flex items-center text-pink-500">
              <Trophy className="h-5 w-5 mr-2" />
              <span className="font-semibold">All-American Second Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AthletesPage = () => {
  const athletes = [
    {
      name: "Emma Wilson",
      position: "Outside Hitter",
      school: "Stanford University",
      year: "'25",
      stats: "Kill Rate: 45%, Vertical: 32\"",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      name: "Sophie Chen",
      position: "Setter",
      school: "UCLA",
      year: "'24",
      stats: "Assists per set: 10.5",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      name: "Maya Patel",
      position: "Middle Blocker",
      school: "University of Texas",
      year: "'26",
      stats: "Blocks per set: 1.5",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
    }
  ];

  return (
    <div className="pt-16">
      <div className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-white">Featured Athletes</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover rising stars and their journey to collegiate success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {athletes.map((athlete, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl">
                <div className="flex items-center mb-6">
                  <img
                    src={athlete.image}
                    alt={athlete.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">{athlete.name}</h3>
                    <p className="text-gray-400">{athlete.school} {athlete.year}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300"><strong className="text-white">Position:</strong> {athlete.position}</p>
                  <p className="text-gray-300"><strong className="text-white">Stats:</strong> {athlete.stats}</p>
                </div>
                <button className="btn-primary w-full mt-6">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    stats: '',
    videos: '',
    achievements: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit profile data to the server or database
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleChange} />
      <input type="text" name="age" placeholder="Age" value={profile.age} onChange={handleChange} />
      <input type="text" name="gender" placeholder="Gender" value={profile.gender} onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" value={profile.location} onChange={handleChange} />
      <textarea name="stats" placeholder="Stats" value={profile.stats} onChange={handleChange}></textarea>
      <textarea name="videos" placeholder="Videos" value={profile.videos} onChange={handleChange}></textarea>
      <textarea name="achievements" placeholder="Achievements" value={profile.achievements} onChange={handleChange}></textarea>
      <button type="submit">Submit Profile</button>
    </form>
  );
};

const SchoolsPage = () => {
  const [filters, setFilters] = useState({
    location: '',
    size: 'any',
    division: 'any',
    conference: '',
    setting: 'any',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <div className="pt-16">
      <div className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-white">Find Your Perfect School</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Search for schools that match your academic and athletic preferences.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="State or region..."
                    className="w-full input-field"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    School Size
                  </label>
                  <select
                    className="w-full select-field"
                    value={filters.size}
                    onChange={(e) => setFilters({...filters, size: e.target.value})}
                  >
                    <option value="any">Any Size</option>
                    <option value="small">Small (under 5,000)</option>
                    <option value="medium">Medium (5,000-15,000)</option>
                    <option value="large">Large (15,000+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Division
                  </label>
                  <select
                    className="w-full select-field"
                    value={filters.division}
                    onChange={(e) => setFilters({...filters, division: e.target.value})}
                  >
                    <option value="any">Any Division</option>
                    <option value="d1">Division I</option>
                    <option value="d2">Division II</option>
                    <option value="d3">Division III</option>
                    <option value="naia">NAIA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Setting
                  </label>
                  <select
                    className="w-full select-field"
                    value={filters.setting}
                    onChange={(e) => setFilters({...filters, setting: e.target.value})}
                  >
                    <option value="any">Any Setting</option>
                    <option value="urban">Urban</option>
                    <option value="suburban">Suburban</option>
                    <option value="rural">Rural</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Conference
                </label>
                <input
                  type="text"
                  placeholder="Conference name..."
                  className="w-full input-field"
                  value={filters.conference}
                  onChange={(e) => setFilters({...filters, conference: e.target.value})}
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <Search className="h-5 w-5 mr-2" />
                Search Schools
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchAndFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: 'any',
    sport: 'any',
    performance: 'any'
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search with searchTerm and filters
  };

  return (
    <div className="search-filter">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search athletes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="any">Any Location</option>
          <option value="urban">Urban</option>
          <option value="suburban">Suburban</option>
          <option value="rural">Rural</option>
        </select>
        <select name="sport" value={filters.sport} onChange={handleFilterChange}>
          <option value="any">Any Sport</option>
          <option value="volleyball">Volleyball</option>
          <option value="basketball">Basketball</option>
          <option value="soccer">Soccer</option>
        </select>
        <select name="performance" value={filters.performance} onChange={handleFilterChange}>
          <option value="any">Any Performance</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

const RecruitersPage = () => {
  return (
    <div className="pt-16">
      <div className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-white">College Recruiters</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with top volleyball talent and build your program's future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Why Join NextGenRecruiting?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Search className="h-6 w-6 text-pink-500 mt-1 mr-3" />
                  <p className="text-gray-300">Advanced search tools to find athletes matching your program's needs</p>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-pink-500 mt-1 mr-3" />
                  <p className="text-gray-300">Direct communication with potential recruits</p>
                </div>
                <div className="flex items-start">
                  <Trophy className="h-6 w-6 text-pink-500 mt-1 mr-3" />
                  <p className="text-gray-300">Access to verified athlete profiles and performance metrics</p>
                </div>
              </div>
              <SearchAndFilter />
              <button 
                onClick={() => {}} 
                className="btn-primary w-full mt-8"
              >
                Join as Recruiter
              </button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80" 
                alt="Volleyball Coach"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/athletes" element={<AthletesPage />} />
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/recruiters" element={<RecruitersPage />} />
            <Route path="/player-profile" element={<PlayerProfileForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;