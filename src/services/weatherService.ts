
// Types for weather data
export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    uv: number;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }>;
}

// Sample weather data for the desert region (mock data)
const mockWeatherData: WeatherData = {
  location: "Merzouga Desert",
  current: {
    temperature: 32,
    condition: "Sunny",
    icon: "☀️",
    humidity: 15,
    windSpeed: 12,
    uv: 8
  },
  forecast: [
    {
      date: new Date().toISOString(),
      maxTemp: 32,
      minTemp: 18,
      condition: "Sunny",
      icon: "☀️"
    },
    {
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      maxTemp: 34,
      minTemp: 19,
      condition: "Partly cloudy",
      icon: "⛅"
    },
    {
      date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      maxTemp: 33,
      minTemp: 20,
      condition: "Cloudy",
      icon: "☁️"
    },
    {
      date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
      maxTemp: 30,
      minTemp: 17,
      condition: "Chance of rain",
      icon: "🌦️"
    },
    {
      date: new Date(Date.now() + 345600000).toISOString(), // 4 days from now
      maxTemp: 29,
      minTemp: 16,
      condition: "Sunny",
      icon: "☀️"
    }
  ]
};

// Function to get current weather
export const getCurrentWeather = async (): Promise<WeatherData['current']> => {
  // In a real app, this would be an API call to a weather service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData.current);
    }, 500); // Simulating API delay
  });
};

// Function to get weather forecast
export const getWeatherForecast = async (): Promise<WeatherData['forecast']> => {
  // In a real app, this would be an API call to a weather service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData.forecast);
    }, 500); // Simulating API delay
  });
};

// Function to get full weather data
export const getWeatherData = async (): Promise<WeatherData> => {
  // In a real app, this would be an API call to a weather service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData);
    }, 500); // Simulating API delay
  });
};
