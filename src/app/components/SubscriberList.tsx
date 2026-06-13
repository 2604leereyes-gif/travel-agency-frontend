import { useState } from 'react';
import { Search, Download, Mail, Calendar, Trash2 } from 'lucide-react';

interface Subscriber {
  id: number;
  email: string;
  name: string;
  subscribedDate: string;
  status: 'Active' | 'Unsubscribed';
}

const initialSubscribers: Subscriber[] = [
  { id: 1, email: 'alice.wonder@email.com', name: 'Alice Wonder', subscribedDate: '2026-05-15', status: 'Active' },
  { id: 2, email: 'bob.builder@email.com', name: 'Bob Builder', subscribedDate: '2026-05-14', status: 'Active' },
  { id: 3, email: 'carol.singer@email.com', name: 'Carol Singer', subscribedDate: '2026-05-12', status: 'Active' },
  { id: 4, email: 'dan.cook@email.com', name: 'Dan Cook', subscribedDate: '2026-05-10', status: 'Unsubscribed' },
  { id: 5, email: 'eve.dancer@email.com', name: 'Eve Dancer', subscribedDate: '2026-05-08', status: 'Active' },
  { id: 6, email: 'frank.writer@email.com', name: 'Frank Writer', subscribedDate: '2026-05-05', status: 'Active' },
  { id: 7, email: 'grace.artist@email.com', name: 'Grace Artist', subscribedDate: '2026-05-03', status: 'Active' },
  { id: 8, email: 'henry.coder@email.com', name: 'Henry Coder', subscribedDate: '2026-05-01', status: 'Active' },
  { id: 9, email: 'iris.teacher@email.com', name: 'Iris Teacher', subscribedDate: '2026-04-28', status: 'Unsubscribed' },
  { id: 10, email: 'jack.pilot@email.com', name: 'Jack Pilot', subscribedDate: '2026-04-25', status: 'Active' },
];

export default function SubscriberList() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Subscribed Date', 'Status'];
    const rows = filteredSubscribers.map((s) => [s.name, s.email, s.subscribedDate, s.status]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
  };

  const deleteSubscriber = (id: number) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Newsletter Subscribers</h1>
        <p className="text-muted-foreground">Manage your newsletter subscription list</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-chart-1/10 rounded-lg">
              <Mail className="w-5 h-5 text-chart-1" />
            </div>
            <p className="text-sm text-muted-foreground">Total Subscribers</p>
          </div>
          <p className="text-3xl">{subscribers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-chart-4/10 rounded-lg">
              <Mail className="w-5 h-5 text-chart-4" />
            </div>
            <p className="text-sm text-muted-foreground">Active Subscribers</p>
          </div>
          <p className="text-3xl">{subscribers.filter((s) => s.status === 'Active').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-chart-2/10 rounded-lg">
              <Calendar className="w-5 h-5 text-chart-2" />
            </div>
            <p className="text-sm text-muted-foreground">New This Week</p>
          </div>
          <p className="text-3xl">5</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option>All</option>
            <option>Active</option>
            <option>Unsubscribed</option>
          </select>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Subscribed Date</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-accent/50 transition-colors">
                  <td className="p-4">{subscriber.name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{subscriber.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{subscriber.subscribedDate}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        subscriber.status === 'Active'
                          ? 'bg-chart-4/20 text-chart-4'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteSubscriber(subscriber.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete subscriber"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubscribers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No subscribers found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
