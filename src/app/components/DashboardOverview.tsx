import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare, Users, Package, TrendingUp, Calendar } from 'lucide-react';

const mockChartData = [
  { name: 'Mon', inquiries: 12 },
  { name: 'Tue', inquiries: 19 },
  { name: 'Wed', inquiries: 15 },
  { name: 'Thu', inquiries: 25 },
  { name: 'Fri', inquiries: 22 },
  { name: 'Sat', inquiries: 30 },
  { name: 'Sun', inquiries: 28 },
];

const recentInquiries = [
  { id: 1, name: 'Sarah Johnson', package: 'Bali Adventure', date: '2 hours ago', status: 'Pending' },
  { id: 2, name: 'Mike Chen', package: 'Paris Romance', date: '4 hours ago', status: 'Quoted' },
  { id: 3, name: 'Emma Wilson', package: 'Tokyo Explorer', date: '5 hours ago', status: 'Confirmed' },
  { id: 4, name: 'David Brown', package: 'Safari Dreams', date: '6 hours ago', status: 'Pending' },
];

export default function DashboardOverview() {
  const stats = [
    {
      icon: MessageSquare,
      label: 'New Inquiries Today',
      value: '24',
      change: '+12%',
      bgColor: 'bg-chart-1/10',
      iconColor: 'text-chart-1',
    },
    {
      icon: Users,
      label: 'Total Subscribers',
      value: '1,245',
      change: '+5%',
      bgColor: 'bg-chart-2/10',
      iconColor: 'text-chart-2',
    },
    {
      icon: Package,
      label: 'Active Packages',
      value: '18',
      change: '+2',
      bgColor: 'bg-chart-3/10',
      iconColor: 'text-chart-3',
    },
    {
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: '68%',
      change: '+8%',
      bgColor: 'bg-chart-4/10',
      iconColor: 'text-chart-4',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <span className="text-sm text-chart-4">{stat.change}</span>
            </div>
            <p className="text-3xl mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiry Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Weekly Inquiry Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="inquiries" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Recent Inquiries</h3>
          <div className="space-y-4">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors"
              >
                <div>
                  <p className="font-medium">{inquiry.name}</p>
                  <p className="text-sm text-muted-foreground">{inquiry.package}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                      inquiry.status === 'Confirmed'
                        ? 'bg-chart-4/20 text-chart-4'
                        : inquiry.status === 'Quoted'
                        ? 'bg-chart-2/20 text-chart-2'
                        : 'bg-chart-1/20 text-chart-1'
                    }`}
                  >
                    {inquiry.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{inquiry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
