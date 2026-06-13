import { useState } from 'react';
import { Search, Filter, Mail, Phone, Calendar } from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  package: string;
  date: string;
  status: 'Pending' | 'Quoted' | 'Confirmed' | 'Cancelled';
  message: string;
}

const initialInquiries: Inquiry[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234-567-8901',
    package: 'Bali Adventure - 7 Days',
    date: '2026-05-22',
    status: 'Pending',
    message: 'Interested in group booking for 6 people in July.',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 234-567-8902',
    package: 'Paris Romance - 5 Days',
    date: '2026-05-21',
    status: 'Quoted',
    message: 'Looking for honeymoon package with premium hotels.',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '+1 234-567-8903',
    package: 'Tokyo Explorer - 10 Days',
    date: '2026-05-21',
    status: 'Confirmed',
    message: 'Family trip in September, need kid-friendly activities.',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.b@email.com',
    phone: '+1 234-567-8904',
    package: 'Safari Dreams - 8 Days',
    date: '2026-05-20',
    status: 'Pending',
    message: 'Corporate team building for 12 employees.',
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    email: 'lisa.m@email.com',
    phone: '+1 234-567-8905',
    package: 'Greek Islands - 6 Days',
    date: '2026-05-20',
    status: 'Cancelled',
    message: 'Budget constraints, will inquire later.',
  },
];

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.package.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: number, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
      )
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-chart-4/20 text-chart-4';
      case 'Quoted':
        return 'bg-chart-2/20 text-chart-2';
      case 'Cancelled':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-chart-1/20 text-chart-1';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Inquiry Management</h1>
        <p className="text-muted-foreground">View and manage customer tour inquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Quoted</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Package</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <p>{inquiry.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Mail className="w-3 h-3" />
                      <span>{inquiry.email}</span>
                    </div>
                  </td>
                  <td className="p-4">{inquiry.package}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{inquiry.date}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry.id, e.target.value as Inquiry['status'])}
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(inquiry.status)} border-none cursor-pointer`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="mb-2">Inquiry Details</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedInquiry.status)}`}>
                  {selectedInquiry.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Customer Name</label>
                <p>{selectedInquiry.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p>{selectedInquiry.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p>{selectedInquiry.phone}</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Package</label>
                <p>{selectedInquiry.package}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Inquiry Date</label>
                <p>{selectedInquiry.date}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Message</label>
                <p className="bg-accent/50 p-4 rounded-lg">{selectedInquiry.message}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
