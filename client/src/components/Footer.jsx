import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center px-basic fixed bottom-0 left-0 py-3 border-t border-slate-300 bg-white">
      <div className="w-base text-gray-700 flex justify-between">
        <div className="flex space-x-4">
          <p>© 2024 heaven store</p>
          <Link className="hover:underline">Terms</Link>
          <Link className="hover:underline">Sitemap</Link>
          <Link className="hover:underline">History</Link>
          <Link className="hover:underline">Privasy</Link>
        </div>
        <div className="flex space-x-4 text-black font-semibold">
          <p className="flex items-center">
            <i className="no-underline bx text-lg mr-1 bx-world"></i> Uzbekistan
          </p>
          <p className="flex items-center">
            <i className="no-underline bx text-lg mr-1 bx-dollar"></i> USD
          </p>
          <Link className="flex items-center hover:underline">
            Support & resources ⌉
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
