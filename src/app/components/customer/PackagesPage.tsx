import { useState } from 'react';
import { MapPin, Clock, Star, DollarSign, Check } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TourPackage {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  category: 'Domestic' | 'International';
  included: string[];
  description: string;
}

const packages: TourPackage[] = [
  {
    id: 1,
    name: 'Maldives Paradise Escape',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1603477849227-705c424d1d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2UlMjB2YWNhdGlvbnxlbnwxfHx8fDE3Nzk1MzM5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1899,
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    category: 'International',
    included: ['Round-trip flights', '4-star resort accommodation', 'Daily breakfast', 'Airport transfers', 'Snorkeling tour'],
    description: 'Experience the pristine beauty of the Maldives with crystal-clear waters and white sandy beaches.',
  },
  {
    id: 2,
    name: 'Paris Romance Package',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzJTIwdHJhdmVsfGVufDF8fHx8MTc3OTUzMzkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 2299,
    duration: '6 Days / 5 Nights',
    rating: 4.8,
    category: 'International',
    included: ['Round-trip flights', 'Boutique hotel in city center', 'Daily breakfast', 'Seine River cruise', 'Eiffel Tower tour'],
    description: 'Fall in love with the City of Light. Visit iconic landmarks, enjoy world-class cuisine, and romantic walks.',
  },
  {
    id: 3,
    name: 'Tokyo Explorer',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1551322120-c697cf88fbdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0b2t5byUyMGphcGFuJTIwc2t5bGluZXxlbnwxfHx8fDE3Nzk1MzM5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 2599,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    category: 'International',
    included: ['Round-trip flights', 'City center hotel', 'Daily breakfast', 'Mt. Fuji day trip', 'Tokyo Metro pass'],
    description: 'Discover the perfect blend of ancient tradition and modern technology in Japan\'s vibrant capital.',
  },
  {
    id: 4,
    name: 'Bali Island Escape',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1672841828271-54340a6fbcd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2UlMjB2YWNhdGlvbnxlbnwxfHx8fDE3Nzk1MzM5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1599,
    duration: '8 Days / 7 Nights',
    rating: 4.7,
    category: 'International',
    included: ['Round-trip flights', 'Beach villa accommodation', 'Daily breakfast', 'Temple tours', 'Spa treatment'],
    description: 'Relax on stunning beaches, explore ancient temples, and immerse yourself in Balinese culture.',
  },
  {
    id: 5,
    name: 'Mountain Adventure Trek',
    location: 'Colorado, USA',
    image: 'https://images.unsplash.com/photo-1603741614725-2fbf5db380e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMGhpa2luZ3xlbnwxfHx8fDE3NzkzODAyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1299,
    duration: '4 Days / 3 Nights',
    rating: 4.6,
    category: 'Domestic',
    included: ['Domestic flights', 'Mountain lodge accommodation', 'All meals', 'Guided hiking tours', 'Equipment rental'],
    description: 'Experience breathtaking mountain views and challenging trails in the Colorado Rockies.',
  },
  {
    id: 6,
    name: 'Caribbean Beach Getaway',
    location: 'Cancun, Mexico',
    image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2UlMjB2YWNhdGlvbnxlbnwxfHx8fDE3Nzk1MzM5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1499,
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    category: 'International',
    included: ['Round-trip flights', 'All-inclusive resort', 'Unlimited food & drinks', 'Beach activities', 'Mayan ruins tour'],
    description: 'Enjoy the perfect beach vacation with crystal-clear waters, white sand, and vibrant nightlife.',
  },
];

export default function PackagesPage() {
  const [filter, setFilter] = useState<'All' | 'Domestic' | 'International'>('All');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);

  const filteredPackages = filter === 'All' ? packages : packages.filter((pkg) => pkg.category === filter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">Tour Packages</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our carefully curated travel packages for both domestic and international destinations
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 justify-center">
          {(['All', 'Domestic', 'International'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                filter === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {pkg.category}
                </div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">From</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <p className="text-2xl text-primary">{pkg.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-card border border-border rounded-lg max-w-4xl w-full my-8">
            <div className="relative h-80 overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="mb-2">{selectedPackage.name}</h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedPackage.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{selectedPackage.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span>{selectedPackage.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <p className="text-3xl text-primary">{selectedPackage.price}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3">Description</h3>
                <p className="text-muted-foreground">{selectedPackage.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="mb-3">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPackage.included.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="p-1 bg-chart-4/10 rounded">
                        <Check className="w-4 h-4 text-chart-4" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
                <a
                  href="/#inquiry"
                  onClick={() => setSelectedPackage(null)}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center"
                >
                  Book This Package
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
