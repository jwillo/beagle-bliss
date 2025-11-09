import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services } from '@/lib/data';
export function ServicesPage() {
  return (
    <div className="container-padding section-padding">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="font-display text-5xl md:text-7xl text-beagle-brown">Grooming Services</h1>
        <p className="mt-4 text-lg text-beagle-brown/70 max-w-2xl mx-auto">
          Pamper your beagle with our professional grooming services. They'll leave looking and feeling blissful.
        </p>
      </motion.div>
      <div className="mt-16 grid lg:grid-cols-3 gap-8 items-start">
        {/* Services List */}
        <div className="lg:col-span-2 grid md:grid-cols-1 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl text-beagle-brown">{service.name}</CardTitle>
                    <span className="text-3xl font-bold text-beagle-coral">${service.price}</span>
                  </div>
                  <p className="text-beagle-brown/70 pt-2">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-beagle-brown/80">
                        <CheckCircle className="h-5 w-5 text-beagle-coral" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:sticky top-28"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-beagle-coral/20 p-3 rounded-full w-fit">
                <Calendar className="h-8 w-8 text-beagle-coral" />
              </div>
              <CardTitle className="text-2xl text-beagle-brown mt-2">Book a Session</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="beagle-name">Beagle's Name</Label>
                  <Input id="beagle-name" placeholder="Buddy" />
                </div>
                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" />
                </div>
                <Button type="submit" className="w-full bg-beagle-coral hover:bg-beagle-coral/90 text-white shadow-lg" size="lg">
                  Request Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}