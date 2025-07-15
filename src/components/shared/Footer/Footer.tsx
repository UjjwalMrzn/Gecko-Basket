import { Icon } from '@iconify/react';
import facebookIcon from '@iconify/icons-fa6-brands/facebook-f';
import instagramIcon from '@iconify/icons-fa6-brands/instagram';
import linkedinIcon from '@iconify/icons-fa6-brands/linkedin-in';
import tiktokIcon from '@iconify/icons-fa6-brands/tiktok';
import mapMarkerIcon from '@iconify/icons-fa6-solid/location-dot';
import phoneIcon from '@iconify/icons-fa6-solid/phone';
import mailIcon from '@iconify/icons-fa6-solid/envelope';

export default function Footer() {
  const socialLinks = [
    { href: 'https://www.facebook.com/profile.php?id=61576932395282', icon: facebookIcon, label: 'Facebook' },
    { href: 'https://www.instagram.com/geckobasket/', icon: instagramIcon, label: 'Instagram' },
    { href: 'https://www.tiktok.com/@geckobasket?is_from_webapp=1&sender_device=pc', icon: tiktokIcon, label: 'TikTok' },
    { href: 'https://www.linkedin.com/company/geckoworksnp', icon: linkedinIcon, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#f0f2f3] text-gray-700 font-inter">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            Gecko <span className="text-green-600">Basket</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Nepal’s smart marketplace for quality, savings, and convenience all in one basket.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                id='social-link'
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 text-gray-500 hover:border-green-600 hover:text-green-600 transition"
              >
                <Icon icon={icon} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Customer Care */}
        <nav aria-label="Customer Care" className="flex flex-col space-y-4 text-sm text-gray-600">
          <h4 className="text-gray-900 font-semibold text-base">Customer Care</h4>
          <ul className="space-y-2">
            {['Help Center', 'Returns & Refunds', 'Shipping Info', 'Contact Us'].map((item) => (
              <li key={item}>
                <a
                  id='customer-care-link'
                  href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                  className="hover:text-green-600 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Shop Links */}
        <nav aria-label="Gecko Basket" className="flex flex-col space-y-4 text-sm text-gray-600">
          <h4 className="text-gray-900 font-semibold text-base">Gecko Basket</h4>
          <ul className="space-y-2">
            {['About' ,'Terms & Conditions', 'Privacy Policy'].map((item) => (
              <li key={item}>
                <a
                  id='Basket-link'
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-green-600 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>


        {/* Contact Info */}
        <address className="not-italic flex flex-col space-y-4 text-sm text-gray-600">
          <h4 className="text-gray-900 font-semibold text-base">Contact</h4>
          <p className="flex items-center space-x-3">
            <Icon icon={mapMarkerIcon} className="text-green-600" width={18} />
            <span>Bhotebahal, Kathmandu, Nepal</span>
          </p>
          <p className="flex items-center space-x-3">
            <Icon icon={phoneIcon} className="text-green-600" width={18} />
            <a href="tel:+9779765009755" className="hover:text-green-600 transition" id='contact-link' aria-label="Call Gecko Basket">
              +977 9840209417
            </a>
          </p>
          <p className="flex items-center space-x-3">
            <Icon icon={mailIcon} className="text-green-600" width={18} />
            <a href="mailto:info@geckoworksnepal.com" className="hover:text-green-600 transition" id='contact-link' aria-label="Email Gecko Basket">
              info@geckoworksnepal.com
            </a>
          </p>
        </address>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 text-center py-6 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Gecko Basket. All rights reserved.
      </div>
    </footer>
  );
}
