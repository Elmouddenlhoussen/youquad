
export interface Quad {
  id: number;
  name: string;
  type: string; // e.g., "Sport", "Adventure", "Utility"
  capacity: number;
  price: number; // per hour
  rating: number;
  image: string;
  description: string;
  features: string[];
  specs: {
    engine: string;
    power: string;
    transmission: string;
    topSpeed: string;
  };
}

export const quads: Quad[] = [
  {
    id: 1,
    name: "Desert Explorer 250",
    type: "Adventure",
    capacity: 1,
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Perfect for beginners and solo explorers. The Desert Explorer offers a comfortable ride with enough power for exciting adventures through various terrain types.",
    features: [
      "Automatic transmission",
      "Digital speedometer",
      "Front and rear racks",
      "Comfortable seat for long trips"
    ],
    specs: {
      engine: "250cc 4-stroke",
      power: "15 HP",
      transmission: "Automatic CVT",
      topSpeed: "65 km/h"
    }
  },
  {
    id: 2,
    name: "Dune Racer 450",
    type: "Sport",
    capacity: 1,
    price: 500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The Dune Racer is built for thrill-seekers looking to tackle sand dunes and rough terrain. Featuring a powerful engine and sport suspension.",
    features: [
      "Sport suspension",
      "High-performance brakes",
      "Racing tires",
      "Digital display with GPS"
    ],
    specs: {
      engine: "450cc 4-stroke",
      power: "40 HP",
      transmission: "Manual 5-speed",
      topSpeed: "90 km/h"
    }
  },
  {
    id: 3,
    name: "Sahara Twin 650",
    type: "Adventure",
    capacity: 2,
    price: 650,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Share your adventure with a passenger on this comfortable two-seater quad bike. The Sahara Twin offers both power and comfort for longer journeys.",
    features: [
      "Two comfortable seats",
      "Extended rack space",
      "Powerful headlights",
      "USB charging port"
    ],
    specs: {
      engine: "650cc 4-stroke V-twin",
      power: "45 HP",
      transmission: "Automatic with selectable 4WD",
      topSpeed: "80 km/h"
    }
  },
  {
    id: 4,
    name: "Atlas Utility 500",
    type: "Utility",
    capacity: 2,
    price: 450,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Versatile and reliable, the Atlas is perfect for those who want to explore with extra gear. Features extended storage capacity and rugged construction.",
    features: [
      "Large cargo racks",
      "Winch included",
      "Heavy-duty suspension",
      "Trailer hitch"
    ],
    specs: {
      engine: "500cc 4-stroke",
      power: "35 HP",
      transmission: "Automatic with high/low range",
      topSpeed: "70 km/h"
    }
  },
  {
    id: 5,
    name: "Junior Explorer 90",
    type: "Youth",
    capacity: 1,
    price: 250,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Designed specifically for younger riders (10-16 years) with safety features and parental controls. A great way to introduce kids to quad biking.",
    features: [
      "Speed limiter",
      "Remote engine cut-off",
      "Safety flags",
      "Simplified controls"
    ],
    specs: {
      engine: "90cc 4-stroke",
      power: "8 HP",
      transmission: "Automatic",
      topSpeed: "45 km/h (limitable)"
    }
  },
  {
    id: 6,
    name: "Desert Storm 800",
    type: "Performance",
    capacity: 1,
    price: 800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Our premium performance model for experienced riders. The Desert Storm delivers exhilarating power and handling for the ultimate desert adventure.",
    features: [
      "Premium Fox suspension",
      "Sport exhaust system",
      "Performance tires",
      "Advanced digital display"
    ],
    specs: {
      engine: "800cc 4-stroke twin",
      power: "78 HP",
      transmission: "Manual 6-speed with reverse",
      topSpeed: "120 km/h"
    }
  }
];

export const tourPackages = [
  {
    id: 1,
    name: "Desert Discovery Tour",
    duration: "2 hours",
    price: 600,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Perfect for beginners, this 2-hour tour takes you through gentle terrain with stunning views of the Ait Melloul desert landscape.",
    includes: [
      "Basic quad bike (Desert Explorer 250)",
      "Safety equipment",
      "Water bottle",
      "Professional guide"
    ],
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Sunset Adventure",
    duration: "3 hours",
    price: 900,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience the magic of the Moroccan desert at sunset. This tour includes moderate terrain challenges and a stop for refreshments as you watch the sun go down.",
    includes: [
      "Sport quad bike (Dune Racer 450)",
      "Safety equipment",
      "Refreshment break with Moroccan tea",
      "Professional guide",
      "Photo opportunities"
    ],
    difficulty: "Moderate"
  },
  {
    id: 3,
    name: "Full-Day Desert Expedition",
    duration: "6 hours",
    price: 1500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Our signature tour takes you deep into the desert with challenging terrain, oasis visits, and lunch at a traditional Berber camp.",
    includes: [
      "Premium quad bike (Desert Storm 800)",
      "Complete safety gear",
      "Lunch at Berber camp",
      "Unlimited water and snacks",
      "Experienced guide",
      "Souvenir photos"
    ],
    difficulty: "Challenging"
  }
];
