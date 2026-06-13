import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Clock, DollarSign } from 'lucide-react';

interface Package {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  description: string;
  category: string;
  availability: 'Available' | 'Limited' | 'Sold Out';
}

const initialPackages: Package[] = [
  {
    id: 1,
    name: 'Bali Adventure',
    destination: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    price: 1299,
    description: 'Experience the magic of Bali with temple tours, beach relaxation, and cultural experiences.',
    category: 'Adventure',
    availability: 'Available',
  },
  {
    id: 2,
    name: 'Paris Romance',
    destination: 'Paris, France',
    duration: '5 Days / 4 Nights',
    price: 1899,
    description: 'Fall in love with Paris. Eiffel Tower, Louvre Museum, and romantic Seine River cruise.',
    category: 'Romance',
    availability: 'Available',
  },
  {
    id: 3,
    name: 'Tokyo Explorer',
    destination: 'Tokyo, Japan',
    duration: '10 Days / 9 Nights',
    price: 2499,
    description: 'Discover ancient temples, modern technology, and incredible cuisine in Japan.',
    category: 'Culture',
    availability: 'Limited',
  },
  {
    id: 4,
    name: 'Safari Dreams',
    destination: 'Kenya & Tanzania',
    duration: '8 Days / 7 Nights',
    price: 3299,
    description: 'Wildlife safari adventure through Serengeti and Masai Mara.',
    category: 'Wildlife',
    availability: 'Available',
  },
];

export default function PackageManagement() {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Omit<Package, 'id'>>({
    name: '',
    destination: '',
    duration: '',
    price: 0,
    description: '',
    category: 'Adventure',
    availability: 'Available',
  });

  const openAddModal = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      destination: '',
      duration: '',
      price: 0,
      description: '',
      category: 'Adventure',
      availability: 'Available',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price,
      description: pkg.description,
      category: pkg.category,
      availability: pkg.availability,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPackage) {
      setPackages((prev) =>
        prev.map((pkg) => (pkg.id === editingPackage.id ? { ...formData, id: pkg.id } : pkg))
      );
    } else {
      const newPackage = { ...formData, id: Date.now() };
      setPackages((prev) => [...prev, newPackage]);
    }
    setIsModalOpen(false);
  };

  const deletePackage = (id: number) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    }
  };

  const getAvailabilityColor = (availability: Package['availability']) => {
    switch (availability) {
      case 'Available':
        return 'bg-chart-4/20 text-chart-4';
      case 'Limited':
        return 'bg-chart-1/20 text-chart-1';
      case 'Sold Out':
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Package Management</h1>
          <p className="text-muted-foreground">Create and manage your tour packages</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span>Add Package</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-1">{pkg.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${getAvailabilityColor(pkg.availability)}`}>
                    {pkg.availability}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(pkg)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Edit package"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    title="Delete package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xl">${pkg.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Category: {pkg.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2>{editingPackage ? 'Edit Package' : 'Add New Package'}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">
                    Package Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="destination" className="block text-sm mb-2">
                    Destination
                  </label>
                  <input
                    id="destination"
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm mb-2">
                    Duration
                  </label>
                  <input
                    id="duration"
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 7 Days / 6 Nights"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm mb-2">
                    Price (USD)
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Romance">Romance</option>
                    <option value="Culture">Culture</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Beach">Beach</option>
                    <option value="City">City</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="availability" className="block text-sm mb-2">
                    Availability
                  </label>
                  <select
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value as Package['availability'] })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Available">Available</option>
                    <option value="Limited">Limited</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  {editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
