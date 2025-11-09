import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PawPrint, Menu, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Shop', path: '/shop' },
  { name: 'Services', path: '/services' },
  { name: 'Vet AI', path: '/vet-ai' },
];
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openCart = useCartStore(s => s.openCart);
  const totalItems = useCartStore(s => s.totalItems());
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-lg font-medium transition-colors duration-300 hover:text-beagle-coral",
      isActive ? "text-beagle-coral" : "text-beagle-brown/80"
    );
  return (
    <header className="sticky top-0 z-50 w-full border-b border-beagle-brown/10 bg-beagle-beige/80 backdrop-blur-lg">
      <div className="container-padding flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <PawPrint className="h-8 w-8 text-beagle-brown" />
          <span className="font-display text-3xl text-beagle-brown">Beagle Bliss</span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
            <ShoppingCart className="h-6 w-6 text-beagle-brown" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 bg-beagle-coral text-white">
                {totalItems}
              </Badge>
            )}
          </Button>
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-beagle-brown" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-beagle-beige">
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={linkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-2xl">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}