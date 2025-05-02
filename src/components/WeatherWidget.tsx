
import React, { useEffect, useState } from 'react';
import { getCurrentWeather } from '@/services/weatherService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudRain, CloudSnow, CloudSun, Droplets, Sun, Wind } from 'lucide-react';

interface WeatherWidgetProps {
  className?: string;
  compact?: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ className = '', compact = false }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather();
        setWeather(data);
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun')) return <Sun className="h-6 w-6 text-yellow-500" />;
    if (conditionLower.includes('cloud') && conditionLower.includes('sun')) return <CloudSun className="h-6 w-6 text-blue-400" />;
    if (conditionLower.includes('cloud')) return <Cloud className="h-6 w-6 text-gray-400" />;
    if (conditionLower.includes('rain')) return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (conditionLower.includes('snow')) return <CloudSnow className="h-6 w-6 text-blue-200" />;
    return <Sun className="h-6 w-6 text-yellow-500" />;
  };

  if (loading) {
    return (
      <Card className={`border-sand-200 dark:border-sand-700 ${className}`}>
        <CardContent className="p-4 flex items-center justify-center">
          <div className="animate-pulse h-16 w-full bg-sand-200 dark:bg-sand-700 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className={`border-sand-200 dark:border-sand-700 ${className}`}>
        <CardContent className="p-4">
          <p className="text-sand-500 dark:text-sand-400 text-center">
            {error || 'Weather data unavailable'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {getWeatherIcon(weather.condition)}
        <div>
          <span className="font-medium">{weather.temperature}°C</span>
          <span className="text-sand-500 dark:text-sand-400 ml-1">Merzouga</span>
        </div>
      </div>
    );
  }

  return (
    <Card className={`border-sand-200 dark:border-sand-700 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Weather</CardTitle>
        <CardDescription>Merzouga Desert</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-2xl font-bold">{weather.temperature}°C</div>
              <div className="text-sand-500 dark:text-sand-400">{weather.condition}</div>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3 text-sand-500" />
              <span className="text-sand-500 dark:text-sand-400">{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-sand-500" />
              <span className="text-sand-500 dark:text-sand-400">{weather.humidity}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
