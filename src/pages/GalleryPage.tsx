import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { galleryImages as initialImages } from '@/lib/data';
import { toast } from 'sonner';
interface UploadedImage {
  id: string;
  src: string;
  alt: string;
}
export function GalleryPage() {
  const [userImages, setUserImages] = useState<UploadedImage[]>([]);
  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const allImages = [...userImages, ...initialImages];
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, multiple: boolean) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const newImages: UploadedImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        newImages.push({
          id: `user-${Date.now()}-${i}`,
          src: URL.createObjectURL(file),
          alt: file.name,
        });
      } else {
        toast.error(`File "${file.name}" is not a valid image.`);
      }
    }
    setUserImages(prev => [...newImages, ...prev]);
    if (newImages.length > 0) {
      toast.success(`${newImages.length} image(s) added to the gallery!`);
    }
    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };
  useEffect(() => {
    // Cleanup object URLs on component unmount
    return () => {
      userImages.forEach(image => URL.revokeObjectURL(image.src));
    };
  }, [userImages]);
  return (
    <div className="container-padding section-padding">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="font-display text-5xl md:text-7xl text-beagle-brown">Beagle Gallery</h1>
        <p className="mt-4 text-lg text-beagle-brown/70 max-w-2xl mx-auto">
          A collection of our favorite floppy-eared friends. Share your own beagle moments!
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mt-12 p-6 md:p-8 bg-beagle-brown/5 border-2 border-dashed border-beagle-brown/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-beagle-coral/20 rounded-full">
                <UploadCloud className="h-8 w-8 text-beagle-coral" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-beagle-brown">Share Your Beagle!</h2>
                <p className="text-beagle-brown/70">Upload single or multiple photos of your furry friend.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <input type="file" accept="image/*" ref={singleFileInputRef} onChange={(e) => handleFileChange(e, false)} className="hidden" />
              <input type="file" accept="image/*" ref={bulkFileInputRef} onChange={(e) => handleFileChange(e, true)} className="hidden" multiple />
              <Button onClick={() => singleFileInputRef.current?.click()} className="bg-beagle-coral hover:bg-beagle-coral/90 text-white shadow-lg">Upload Photo</Button>
              <Button onClick={() => bulkFileInputRef.current?.click()} variant="outline" className="border-beagle-coral text-beagle-coral hover:bg-beagle-coral/10">Upload in Bulk</Button>
            </div>
          </div>
        </Card>
      </motion.div>
      <div className="mt-16 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {allImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="overflow-hidden rounded-2xl shadow-lg break-inside-avoid"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}