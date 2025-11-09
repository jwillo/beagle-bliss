import React from 'react';
import { NavLink } from 'react-router-dom';
import { PawPrint, Twitter, Instagram, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-beagle-brown/10">
      <div className="container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col items-start">
            <NavLink to="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="h-8 w-8 text-beagle-brown" />
              <span className="font-display text-3xl text-beagle-brown">Beagle Bliss</span>
            </NavLink>
            <p className="text-beagle-brown/70 text-sm">Your one-stop shop for everything Beagle.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h3 className="font-bold text-beagle-brown mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><NavLink to="/gallery" className="text-beagle-brown/70 hover:text-beagle-coral">Gallery</NavLink></li>
                <li><NavLink to="/shop" className="text-beagle-brown/70 hover:text-beagle-coral">Shop</NavLink></li>
                <li><NavLink to="/services" className="text-beagle-brown/70 hover:text-beagle-coral">Services</NavLink></li>
                <li><NavLink to="/vet-ai" className="text-beagle-brown/70 hover:text-beagle-coral">Vet AI</NavLink></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-beagle-brown mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-beagle-brown/70 hover:text-beagle-coral">Contact Us</a></li>
                <li><a href="#" className="text-beagle-brown/70 hover:text-beagle-coral">FAQ</a></li>
                <li><a href="#" className="text-beagle-brown/70 hover:text-beagle-coral">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-beagle-brown mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-beagle-brown/70 hover:text-beagle-coral"><Twitter /></a>
                <a href="#" className="text-beagle-brown/70 hover:text-beagle-coral"><Instagram /></a>
                <a href="#" className="text-beagle-brown/70 hover:text-beagle-coral"><Facebook /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-beagle-brown/10 pt-8 text-center text-sm text-beagle-brown/60">
          <p>&copy; {new Date().getFullYear()} Beagle Bliss. Built with ❤��� at Cloudflare.</p>
        </div>
      </div>
    </footer>
  );
}