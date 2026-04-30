import { setRequestLocale } from 'next-intl/server';
import Navbar      from '@/app/components/Navbar';
import Hero        from '@/app/components/Hero';
import About       from '@/app/components/About';
import Services    from '@/app/components/Services';
import Skills      from '@/app/components/Skills';
import Projects    from '@/app/components/Projects';
import Monitoring  from '@/app/components/Monitoring';
import Pricing     from '@/app/components/Pricing';
import Contact     from '@/app/components/Contact';
import Footer      from '@/app/components/Footer';
import BackToTop   from '@/app/components/BackToTop';
import BottomNav   from '@/app/components/BottomNav';

export default function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Monitoring />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
      <BackToTop />
      <BottomNav />
    </main>
  );
}
