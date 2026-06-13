import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Users, DollarSign, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: '1',
    children: '0',
    infants: '0',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your inquiry has been submitted! We\'ll contact you within 24 hours.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      origin: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      adults: '1',
      children: '0',
      infants: '0',
      budget: '',
      message: '',
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="mb-2">Get Your Free Travel Quote</h3>
        <p className="text-muted-foreground text-sm">
          Fill out the form below and our travel experts will get back to you with a personalized quote.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
          </div>
        </div>

        {/* Travel Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="origin" className="block text-sm mb-2">
              Flight Origin *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="origin"
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="New York, USA"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm mb-2">
              Destination *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="destination"
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="Bali, Indonesia"
                required
              />
            </div>
          </div>
        </div>

        {/* Travel Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="departureDate" className="block text-sm mb-2">
              Departure Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="returnDate" className="block text-sm mb-2">
              Return Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Number of Travelers */}
        <div>
          <label className="block text-sm mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            Number of Travelers *
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="adults" className="block text-xs text-muted-foreground mb-1">
                Adults (12+)
              </label>
              <input
                id="adults"
                type="number"
                min="1"
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="children" className="block text-xs text-muted-foreground mb-1">
                Children (2-11)
              </label>
              <input
                id="children"
                type="number"
                min="0"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label htmlFor="infants" className="block text-xs text-muted-foreground mb-1">
                Infants (0-2)
              </label>
              <input
                id="infants"
                type="number"
                min="0"
                value={formData.infants}
                onChange={(e) => setFormData({ ...formData, infants: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm mb-2">
            Estimated Budget (USD)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="budget"
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              placeholder="e.g., $3000 - $5000"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="message" className="block text-sm mb-2">
            <MessageSquare className="inline w-4 h-4 mr-1" />
            Special Requests or Notes
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
            placeholder="Tell us about any special requirements, hotel preferences, senior citizen needs, or specific activities you'd like to include..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
          <span>Submit Inquiry</span>
        </button>
      </form>
    </div>
  );
}
