import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockAuthors } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Code, Lightbulb, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description:
        'We explore and share the latest technologies shaping the future of development.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description:
        'Built by developers, for developers. Our community is at the heart of everything we do.',
    },
    {
      icon: Code,
      title: 'Quality Content',
      description:
        'Every article is crafted with care to provide actionable insights and practical knowledge.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              About <span className="text-gradient">Chronicle</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Chronicle is a platform for developers and tech enthusiasts to share knowledge,
              insights, and stories from the ever-evolving world of technology.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-3xl font-bold">Our Mission</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                We believe that knowledge should be accessible to everyone. Chronicle was founded
                with a simple goal: to create a space where developers can learn, share, and grow
                together.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're a seasoned engineer or just starting your journey in tech, you'll
                find valuable content that helps you level up your skills and stay current with
                industry trends.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-border bg-card/50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-lg border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold">Meet Our Writers</h2>
            <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
              {mockAuthors.map((author) => (
                <div
                  key={author.id}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card p-6"
                >
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{author.name}</h3>
                    <p className="text-sm text-muted-foreground">{author.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold">Ready to Join Us?</h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Whether you want to read great content or share your own knowledge, Chronicle is the
              place for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/blog">
                  Start Reading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/auth?mode=signup">Become a Writer</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
