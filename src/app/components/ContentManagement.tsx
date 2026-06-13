import { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Megaphone, Eye } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  status: 'Published' | 'Draft';
}

interface Promo {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Hidden Gems in Southeast Asia',
    excerpt: 'Discover the lesser-known destinations that will take your breath away.',
    content: 'Southeast Asia is full of incredible destinations waiting to be explored...',
    author: 'Travel Team',
    publishDate: '2026-05-20',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Ultimate Guide to Safari Planning',
    excerpt: 'Everything you need to know before booking your African safari adventure.',
    content: 'Planning a safari requires careful consideration of many factors...',
    author: 'Wildlife Expert',
    publishDate: '2026-05-18',
    status: 'Published',
  },
  {
    id: 3,
    title: 'European Summer Travel Tips 2026',
    excerpt: 'Make the most of your European summer vacation with these insider tips.',
    content: 'This summer, Europe is expecting record numbers of travelers...',
    author: 'Europe Specialist',
    publishDate: '2026-05-15',
    status: 'Draft',
  },
];

const initialPromos: Promo[] = [
  {
    id: 1,
    title: 'Summer Sale - Save 20%',
    description: 'Book any package before June 30th and save 20% on all destinations!',
    ctaText: 'Book Now',
    ctaLink: '/packages',
    isActive: true,
  },
  {
    id: 2,
    title: 'Early Bird Special',
    description: 'Reserve your 2027 trip now and get exclusive early bird pricing.',
    ctaText: 'Learn More',
    ctaLink: '/early-bird',
    isActive: false,
  },
];

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'promos'>('blogs');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [promos, setPromos] = useState<Promo[]>(initialPromos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);

  const [blogFormData, setBlogFormData] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    publishDate: '',
    status: 'Draft',
  });

  const [promoFormData, setPromoFormData] = useState<Omit<Promo, 'id'>>({
    title: '',
    description: '',
    ctaText: '',
    ctaLink: '',
    isActive: true,
  });

  const openAddBlogModal = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'Draft',
    });
    setIsModalOpen(true);
  };

  const openEditBlogModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      publishDate: blog.publishDate,
      status: blog.status,
    });
    setIsModalOpen(true);
  };

  const openAddPromoModal = () => {
    setEditingPromo(null);
    setPromoFormData({
      title: '',
      description: '',
      ctaText: '',
      ctaLink: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditPromoModal = (promo: Promo) => {
    setEditingPromo(promo);
    setPromoFormData({
      title: promo.title,
      description: promo.description,
      ctaText: promo.ctaText,
      ctaLink: promo.ctaLink,
      isActive: promo.isActive,
    });
    setIsModalOpen(true);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      setBlogPosts((prev) =>
        prev.map((blog) => (blog.id === editingBlog.id ? { ...blogFormData, id: blog.id } : blog))
      );
    } else {
      const newBlog = { ...blogFormData, id: Date.now() };
      setBlogPosts((prev) => [...prev, newBlog]);
    }
    setIsModalOpen(false);
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromo) {
      setPromos((prev) =>
        prev.map((promo) => (promo.id === editingPromo.id ? { ...promoFormData, id: promo.id } : promo))
      );
    } else {
      const newPromo = { ...promoFormData, id: Date.now() };
      setPromos((prev) => [...prev, newPromo]);
    }
    setIsModalOpen(false);
  };

  const deleteBlog = (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts((prev) => prev.filter((blog) => blog.id !== id));
    }
  };

  const deletePromo = (id: number) => {
    if (confirm('Are you sure you want to delete this promo?')) {
      setPromos((prev) => prev.filter((promo) => promo.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Content Management</h1>
        <p className="text-muted-foreground">Manage blog posts and homepage promotions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab('blogs')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'blogs'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Blog Posts</span>
        </button>
        <button
          onClick={() => setActiveTab('promos')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'promos'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Megaphone className="w-5 h-5" />
          <span>Homepage Promos</span>
        </button>
      </div>

      {/* Blog Posts Tab */}
      {activeTab === 'blogs' && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={openAddBlogModal}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              <span>New Blog Post</span>
            </button>
          </div>

          <div className="space-y-4">
            {blogPosts.map((blog) => (
              <div key={blog.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{blog.title}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          blog.status === 'Published'
                            ? 'bg-chart-4/20 text-chart-4'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {blog.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>By {blog.author}</span>
                      <span>•</span>
                      <span>{blog.publishDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditBlogModal(blog)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promos Tab */}
      {activeTab === 'promos' && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={openAddPromoModal}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              <span>New Promo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promos.map((promo) => (
              <div key={promo.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3>{promo.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditPromoModal(promo)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePromo(promo.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{promo.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">CTA: {promo.ctaText}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      promo.isActive ? 'bg-chart-4/20 text-chart-4' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {promo.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {isModalOpen && activeTab === 'blogs' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2>{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>

            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label htmlFor="blog-title" className="block text-sm mb-2">
                  Title
                </label>
                <input
                  id="blog-title"
                  type="text"
                  value={blogFormData.title}
                  onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label htmlFor="blog-excerpt" className="block text-sm mb-2">
                  Excerpt
                </label>
                <textarea
                  id="blog-excerpt"
                  value={blogFormData.excerpt}
                  onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="blog-content" className="block text-sm mb-2">
                  Content
                </label>
                <textarea
                  id="blog-content"
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="blog-author" className="block text-sm mb-2">
                    Author
                  </label>
                  <input
                    id="blog-author"
                    type="text"
                    value={blogFormData.author}
                    onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blog-date" className="block text-sm mb-2">
                    Publish Date
                  </label>
                  <input
                    id="blog-date"
                    type="date"
                    value={blogFormData.publishDate}
                    onChange={(e) => setBlogFormData({ ...blogFormData, publishDate: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blog-status" className="block text-sm mb-2">
                    Status
                  </label>
                  <select
                    id="blog-status"
                    value={blogFormData.status}
                    onChange={(e) => setBlogFormData({ ...blogFormData, status: e.target.value as BlogPost['status'] })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
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
                  {editingBlog ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Promo Modal */}
      {isModalOpen && activeTab === 'promos' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>{editingPromo ? 'Edit Promo' : 'New Promo'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>

            <form onSubmit={handlePromoSubmit} className="space-y-4">
              <div>
                <label htmlFor="promo-title" className="block text-sm mb-2">
                  Title
                </label>
                <input
                  id="promo-title"
                  type="text"
                  value={promoFormData.title}
                  onChange={(e) => setPromoFormData({ ...promoFormData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label htmlFor="promo-description" className="block text-sm mb-2">
                  Description
                </label>
                <textarea
                  id="promo-description"
                  value={promoFormData.description}
                  onChange={(e) => setPromoFormData({ ...promoFormData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="promo-cta-text" className="block text-sm mb-2">
                    CTA Button Text
                  </label>
                  <input
                    id="promo-cta-text"
                    type="text"
                    value={promoFormData.ctaText}
                    onChange={(e) => setPromoFormData({ ...promoFormData, ctaText: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="promo-cta-link" className="block text-sm mb-2">
                    CTA Link
                  </label>
                  <input
                    id="promo-cta-link"
                    type="text"
                    value={promoFormData.ctaLink}
                    onChange={(e) => setPromoFormData({ ...promoFormData, ctaLink: e.target.value })}
                    placeholder="/packages"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="promo-active"
                  type="checkbox"
                  checked={promoFormData.isActive}
                  onChange={(e) => setPromoFormData({ ...promoFormData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-border"
                />
                <label htmlFor="promo-active" className="text-sm">
                  Active (show on homepage)
                </label>
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
                  {editingPromo ? 'Update Promo' : 'Create Promo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
