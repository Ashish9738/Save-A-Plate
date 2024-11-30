import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const DonationForm: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [areas, setAreas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prediction, setPrediction] = useState<number | null>(null); 

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://127.0.0.1:8002/api/areas');
        setAreas(response.data.areas);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching areas:', error);
        setIsLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://127.0.0.1:8002/predict', {
        area: location
      });
      const predictedPoints = response.data.predicted_points;
      setPrediction(predictedPoints);
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPredictionMessage = (prediction: number) => {
    switch (prediction) {
      case 3:
        return { message: 'Low Poverty Density Region', sapCoins: 20 };
      case 2:
        return { message: 'Moderate Poverty Density Region', sapCoins: 50 };
      case 1:
        return { message: 'High Poverty Density Region', sapCoins: 100 };
      default:
        return { message: 'Unknown region', sapCoins: 0 };
    }
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Donate Food</h2>
        <div className="max-w-lg mx-auto space-y-4">
          <div className="relative">
            <label 
              htmlFor="location" 
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Location
            </label>
            <Select 
              onValueChange={(value) => setLocation(value)} 
              value={location}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a location" />
              </SelectTrigger>
              <SelectContent 
                position="popper"
                align="center"
                side="bottom"
                className="z-[100] bg-white border rounded-md shadow-lg"
              >
                <div className="max-h-60 overflow-y-auto">
                  {isLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading areas...
                    </SelectItem>
                  ) : (
                    areas.map((area) => (
                      <SelectItem 
                        key={area} 
                        value={area}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {area}
                      </SelectItem>
                    ))
                  )}
                </div>
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!location}
            onClick={handleSubmit}
          >
            {
              isLoading ? "Submitting" : "Submit"
            }
          </Button>
        </div>

        {prediction !== null && (
          <div className="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center">
              <p className="text-lg">{getPredictionMessage(prediction).message}</p>
              <p className="text-xl font-bold mt-2">
                You earned <span className="text-green-500">{getPredictionMessage(prediction).sapCoins}</span> SAP Coins!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationForm;
