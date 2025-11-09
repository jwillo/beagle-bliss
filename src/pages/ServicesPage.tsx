import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle, Scissors } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { services } from '@/lib/data';
import { cn } from '@/lib/utils';
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  beagleName: z.string().min(2, { message: "Beagle's name must be at least 2 characters." }),
  service: z.string({ required_error: "Please select a service." }),
  date: z.date({ required_error: "A date is required." }),
});
type BookingFormValues = z.infer<typeof bookingFormSchema>;
export function ServicesPage() {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
  });
  function onSubmit(data: BookingFormValues) {
    toast.success("Booking request sent!", {
      description: `We've received your request for ${data.service} for ${data.beagleName} on ${format(data.date, 'PPP')}. We'll contact you shortly to confirm.`,
    });
    form.reset({ name: '', beagleName: '', service: undefined, date: undefined });
  }
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
                <Scissors className="h-8 w-8 text-beagle-coral" />
              </div>
              <CardTitle className="text-2xl text-beagle-brown mt-2">Book a Session</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="beagleName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beagle's Name</FormLabel>
                      <FormControl><Input placeholder="Buddy" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {services.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date() || date < new Date("1900-01-01")} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-beagle-coral hover:bg-beagle-coral/90 text-white shadow-lg" size="lg">
                    Request Booking
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}