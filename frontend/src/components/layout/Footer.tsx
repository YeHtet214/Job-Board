import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">JobBoard</h3>
            <p className="text-gray-300 mb-4">
              Find your dream job or the perfect candidate with our comprehensive job board platform.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-300 hover:text-white transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-gray-300 hover:text-white transition">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/create-profile" className="text-gray-300 hover:text-white transition">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/job-alerts" className="text-gray-300 hover:text-white transition">
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link to="/my-applications" className="text-gray-300 hover:text-white transition">
                  My Applications
                </Link>
              </li>
              <li>
                <Link to="/career-resources" className="text-gray-300 hover:text-white transition">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-gray-300 hover:text-white transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/browse-resumes" className="text-gray-300 hover:text-white transition">
                  Browse Resumes
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-gray-300 hover:text-white transition">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {currentYear} JobBoard. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white text-sm transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
