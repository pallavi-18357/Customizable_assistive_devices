import React from "react";
import { Linkedin, Twitter, Instagram, Youtube, Facebook } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="w-full bg-[#f7f6e7] border-t border-gray-200 pt-12 pb-6 px-4 mt-8 text-gray-800">
    <div className="max-w-7xl mx-auto flex flex-col gap-12">
      {/* Newsletter Signup */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-3xl font-bold mb-2">Join our newsletter</h2>
          <p className="mb-4 text-lg">Get the latest tips, tutorials, and exclusive deals straight to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <input
              type="email"
              placeholder="Enter your email"
              className="border-b border-gray-400 bg-transparent px-2 py-2 text-lg focus:outline-none focus:border-black w-64"
              required
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-8 py-2 text-lg font-semibold rounded-none hover:bg-black transition"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="mt-2 text-sm text-gray-600">We care about your data in our <a href="/privacy" className="underline">privacy policy</a>.</p>
        </div>
        {/* Social and Links */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <span className="font-semibold text-lg mb-2 block">Follow us</span>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="LinkedIn" className="bg-white rounded-full p-3 shadow hover:bg-gray-100 transition"><Linkedin className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="bg-white rounded-full p-3 shadow hover:bg-gray-100 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="bg-white rounded-full p-3 shadow hover:bg-gray-100 transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="YouTube" className="bg-white rounded-full p-3 shadow hover:bg-gray-100 transition"><Youtube className="w-5 h-5" /></a>
              <a href="#" aria-label="Facebook" className="bg-white rounded-full p-3 shadow hover:bg-gray-100 transition"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-4">
            <div>
              <span className="font-semibold mb-2 block">Product</span>
              <ul className="space-y-1">
                <li><a href="/shop" className="hover:underline">Shop</a></li>
                <li><a href="/services" className="hover:underline">Services</a></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold mb-2 block">Company</span>
              <ul className="space-y-1">
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/blog" className="hover:underline">Blog</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold mb-2 block">Other Pages</span>
              <ul className="space-y-1">
                <li><a href="/signup" className="hover:underline">Sign up</a></li>
                <li><a href="/login" className="hover:underline">Log in</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Legal/Attribution Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2 border-t border-gray-200 pt-6 mt-6">
        <div className="flex gap-4">
          <a href="/licenses" className="hover:underline">Licenses</a>
          <a href="/style-guide" className="hover:underline">Style Guide</a>
          <a href="/changelog" className="hover:underline">Change Log</a>
        </div>
        <div>
          Made by <a href="#" className="hover:underline">Your Team</a> &nbsp; Powered by <a href="#" className="hover:underline">React</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 