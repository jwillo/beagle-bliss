import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Toaster } from '@/components/ui/sonner';
import { Cart } from '@/components/shared/Cart';
export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-beagle-beige text-beagle-brown">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Cart />
      <Toaster richColors position="top-center" />
    </div>
  );
}