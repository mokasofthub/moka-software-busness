import { render, screen } from '@testing-library/react';
import About from '../About';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const map: Record<string, unknown> = {
      label: 'About Me',
      headline: 'I build systems that scale.',
      p1: 'Principal Software Engineer with 10+ years of experience.',
      p2: 'Specialized in cloud-native architectures.',
      tags: ['TypeScript', 'AWS', 'Kubernetes', 'React'],
      fact_location: 'Remote – Worldwide',
      fact_turnaround: '48h turnaround',
      fact_partnership: 'Long-term partnerships',
      cta_primary: 'Hire Me',
      cta_secondary: 'Download CV',
    };
    const t = (key: string) => (map[key] as string) ?? key;
    t.raw = (key: string) => map[key] ?? key;
    return t;
  },
}));

// next/image is a server component — mock it for jsdom
jest.mock('next/image', () =>
  function NextImage({ alt, src }: { alt: string; src: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={src} />;
  }
);

jest.mock('../Card3D', () =>
  function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
  }
);

describe('About', () => {
  it('renders the section headline', () => {
    render(<About />);
    expect(screen.getByText('I build systems that scale.')).toBeInTheDocument();
  });

  it('renders the section label', () => {
    render(<About />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders the first bio paragraph', () => {
    render(<About />);
    expect(screen.getByText(/Principal Software Engineer/)).toBeInTheDocument();
  });

  it('renders all skill tags', () => {
    render(<About />);
    ['TypeScript', 'AWS', 'Kubernetes', 'React'].forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders the profile image', () => {
    render(<About />);
    expect(screen.getByRole('img', { name: /Bernard/i })).toBeInTheDocument();
  });

  it('renders the "Available" badge', () => {
    render(<About />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });
});
