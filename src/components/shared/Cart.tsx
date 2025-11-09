import React from 'react';
import { useCartStore } from '@/stores/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
export function Cart() {
  const isOpen = useCartStore(s => s.isOpen);
  const toggleCart = useCartStore(s => s.toggleCart);
  const items = useCartStore(s => s.items);
  const removeItem = useCartStore(s => s.removeItem);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const totalItems = useCartStore(s => s.totalItems());
  const totalPrice = useCartStore(s => s.totalPrice());
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col bg-beagle-beige">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl text-beagle-brown">Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-24 h-24 text-beagle-brown/20 mb-4" />
            <h3 className="text-xl font-bold text-beagle-brown">Your cart is empty</h3>
            <p className="text-beagle-brown/70 mt-2">Looks like you haven't added anything yet.</p>
            <Button onClick={toggleCart} className="mt-6 bg-beagle-coral hover:bg-beagle-coral/90 text-white">
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-beagle-brown">{item.name}</h4>
                      <p className="text-sm text-beagle-brown/70">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, 'decrease')}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, 'increase')}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-beagle-brown">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button variant="ghost" size="icon" className="text-beagle-brown/50 hover:text-red-500 h-8 w-8" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto border-t border-beagle-brown/10 pt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-bold text-lg text-beagle-brown">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full bg-beagle-coral hover:bg-beagle-coral/90 text-white shadow-lg">
                  Proceed to Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}