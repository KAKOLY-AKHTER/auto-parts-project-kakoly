import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">AutoParts</h3>
            <p className="text-slate-400 text-sm">
              Premium quality auto parts for your vehicle.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/shop" className="hover:text-white">Shop</a></li>
              <li><a href="/catalog" className="hover:text-white">Catalog</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/contacts" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Track Order</a></li>
              <li><a href="#" className="hover:text-white">Warranty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-3">Stay updated with latest offers</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-900 border border-slate-700 rounded-l-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 rounded-r-lg text-sm font-medium">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500 text-sm">
          © 2026 AutoParts. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;