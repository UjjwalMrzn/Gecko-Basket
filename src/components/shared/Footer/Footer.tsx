import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import facebookIcon from '@iconify/icons-fa6-brands/facebook-f';
import instagramIcon from '@iconify/icons-fa6-brands/instagram';
import tiktokIcon from '@iconify/icons-fa6-brands/tiktok';
import mapMarkerIcon from '@iconify/icons-fa6-solid/location-dot';
import phoneIcon from '@iconify/icons-fa6-solid/phone';
import mailIcon from '@iconify/icons-fa6-solid/envelope';

// ✅ DATA is clean and easy to update.
const socialLinks = [
  { href: 'https://www.facebook.com/profile.php?id=61576932395282', icon: facebookIcon, label: 'Facebook' },
  { href: 'https://www.instagram.com/geckobasket/', icon: instagramIcon, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@geckobasket?is_from_webapp=1&sender_device=pc', icon: tiktokIcon, label: 'TikTok' },
];

const linkSections = [
    {
        title: 'Shop',
        links: [
            { label: 'All Products', to: '/shop' },
            { label: 'Categories', to: '/categories' },
            { label: 'Best Sellers', to: '/best-sellers' },
        ]
    },
    {
        title: 'Customer Care',
        links: [
            { label: 'Help Center', to: '/help-center' },
            { label: 'Returns & Refunds', to: '/returns' },
            { label: 'Privacy Policy', to: '/privacy-policy' },
        ]
    }
];

const Footer = () => {
  return (
    <footer className="bg-[#f0f2f3] text-gray-700 font-inter border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand & Social Section (takes more space) */}
          <div className="md:col-span-5 flex flex-col space-y-5">
            <Link to="/" className="text-3xl font-semibold tracking-tight text-gray-900">
              Gecko<span className="text-green-600">Basket</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Nepal’s smart marketplace for quality, savings, and convenience all in one basket.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                   className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 text-gray-500 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                >
                  <Icon icon={icon} width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections (dynamically created) */}
          {linkSections.map(section => (
            <nav key={section.title} aria-label={section.title} className="md:col-span-2 text-sm">
              <h4 className="font-semibold text-base text-gray-900 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-green-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          
          {/* Contact Info Section */}
          <address className="md:col-span-3 not-italic text-sm">
            <h4 className="font-semibold text-base text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon icon={mapMarkerIcon} className="text-green-600 mt-1 flex-shrink-0" width={16} />
                <span>Bhotebahal, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon={phoneIcon} className="text-green-600 mt-1 flex-shrink-0" width={16} />
                <a href="tel:+9779840209417" className="hover:text-green-600 transition-colors">
                  +977 9840209417
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon={mailIcon} className="text-green-600 mt-1 flex-shrink-0" width={16} />
                <a href="mailto:info@geckoworksnepal.com" className="hover:text-green-600 transition-colors">
                  info@geckoworksnepal.com
                </a>
              </li>
            </ul>
          </address>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 text-center py-5">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Gecko Basket. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;