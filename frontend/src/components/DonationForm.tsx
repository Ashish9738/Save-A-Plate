import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const DonationForm: React.FC = () => {
  const [location, setLocation] = useState('');

  const locations = [
    'New York City', 
    'Los Angeles', 
    'Chicago', 
    'Houston', 
    'Phoenix'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic
    console.log('Form submitted');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Donate Food</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="space-y-4">
            <Input 
              placeholder="Your Name" 
              required 
            />
            <Input 
              type="email" 
              placeholder="Email Address" 
              required 
            />
            <Select onValueChange={setLocation} value={location}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea 
              placeholder="Describe the food you want to donate" 
              required 
            />
            <Button type="submit" className="w-full">
              Submit Donation
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DonationForm;