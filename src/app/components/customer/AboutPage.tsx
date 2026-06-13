import { Target, Eye, Award, Users, Plane, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">About Tripie Travel & Tours</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creating unforgettable travel experiences and turning your dream vacations into reality since 2014
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Tripie Travel & Tours was founded in 2014 with a simple yet powerful vision: to make world-class travel experiences accessible to everyone. What started as a small travel agency with just three passionate travel enthusiasts has grown into a trusted name in the tourism industry.
              </p>
              <p>
                Over the years, we've helped thousands of travelers discover the beauty of destinations around the globe. From pristine beaches to bustling cities, from serene mountains to vibrant cultural hotspots, we've curated experiences that create lasting memories.
              </p>
              <p>
                Our team of dedicated travel experts brings decades of combined experience in crafting personalized itineraries, negotiating the best rates, and ensuring every detail of your journey is perfectly planned.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-4xl text-primary mb-2">10+</div>
              <p className="text-muted-foreground">Years of Excellence</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-4xl text-primary mb-2">15K+</div>
              <p className="text-muted-foreground">Happy Travelers</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-4xl text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Destinations</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-4xl text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-accent/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-chart-1/10 rounded-lg">
                  <Target className="w-8 h-8 text-chart-1" />
                </div>
                <h3 className="text-2xl">Our Mission</h3>
              </div>
              <p className="text-muted-foreground">
                To provide exceptional, personalized travel experiences that exceed our clients' expectations while promoting sustainable and responsible tourism. We strive to create journeys that not only showcase the beauty of our world but also foster cultural understanding and appreciation.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-chart-2/10 rounded-lg">
                  <Eye className="w-8 h-8 text-chart-2" />
                </div>
                <h3 className="text-2xl">Our Vision</h3>
              </div>
              <p className="text-muted-foreground">
                To become the most trusted travel partner for adventurers, families, and business travelers worldwide. We envision a future where travel connects people, cultures, and communities, making the world a smaller, more understanding place one journey at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Our Core Values</h2>
          <p className="text-xl text-muted-foreground">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-chart-1/10 rounded-full mb-4">
              <Award className="w-8 h-8 text-chart-1" />
            </div>
            <h3 className="mb-3">Excellence</h3>
            <p className="text-muted-foreground">
              We're committed to delivering the highest quality service and attention to detail in every aspect of your journey.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-chart-2/10 rounded-full mb-4">
              <Users className="w-8 h-8 text-chart-2" />
            </div>
            <h3 className="mb-3">Customer Focus</h3>
            <p className="text-muted-foreground">
              Your satisfaction is our top priority. We listen, understand, and tailor every experience to your unique needs.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-chart-3/10 rounded-full mb-4">
              <Plane className="w-8 h-8 text-chart-3" />
            </div>
            <h3 className="mb-3">Innovation</h3>
            <p className="text-muted-foreground">
              We continuously seek new destinations, technologies, and services to enhance your travel experience.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-chart-4/10 rounded-full mb-4">
              <Heart className="w-8 h-8 text-chart-4" />
            </div>
            <h3 className="mb-3">Integrity</h3>
            <p className="text-muted-foreground">
              Honesty and transparency are at the heart of our business. We build trust through ethical practices.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-chart-5/10 rounded-full mb-4">
              <Target className="w-8 h-8 text-chart-5" />
            </div>
            <h3 className="mb-3">Reliability</h3>
            <p className="text-muted-foreground">
              Count on us to be there when you need us, with 24/7 support and expert guidance every step of the way.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="mb-3">Sustainability</h3>
            <p className="text-muted-foreground">
              We promote responsible tourism that respects local cultures, environments, and communities.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Let our expert team help you plan the perfect vacation tailored to your dreams and budget.
          </p>
          <a
            href="/#inquiry"
            className="inline-block px-8 py-4 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity text-lg"
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </div>
  );
}
