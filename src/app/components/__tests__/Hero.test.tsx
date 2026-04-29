import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, unknown> = {
      badge: 'Available for new engagements',
      headline1: 'Build. Scale. Grow.',
      headline2: 'Ship Software That Lasts.',
      title: 'Principal Software Engineer',
      sub: 'I design and deliver resilient systems',
      cta_primary: 'See My Work',
      cta_secondary: 'Get in Touch',
      stat_years: 'Years Experience',
      stat_projects: 'Projects Delivered',
      stat_uptime: 'Uptime SLA',
      stat_clients: 'Happy Clients',
    };
    const t = (key: string) => (translations[key] as string) ?? key;
    t.raw = (key: string) => translations[key] ?? key;
    return t;
  },
}));

describe('Hero', () => {
  it('renders the availability badge', () => {
    render(<Hero />);
    expect(screen.getByText('Available for new engagements')).toBeInTheDocument();
  });

  it('renders first headline', () => {
    render(<Hero />);
    expect(screen.getByText('Build. Scale. Grow.')).toBeInTheDocument();
  });

  it('renders gradient headline', () => {
    render(<Hero />);
    expect(screen.getByText('Ship Software That Lasts.')).toBeInTheDocument();
  });

  it('renders the role title', () => {
    render(<Hero />);
    expect(screen.getByText('Principal Software Engineer')).toBeInTheDocument();
  });

  it('primary CTA links to #services', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: 'See My Work' })).toHaveAttribute('href', '#services');
  });

  it('secondary CTA links to #contact', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '#contact');
  });

  it('renders all four stat values', () => {
    render(<Hero />);
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('60+')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('30+')).toBeInTheDocument();
  });

  it('renders all stat labels', () => {
    render(<Hero />);
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects Delivered')).toBeInTheDocument();
    expect(screen.getByText('Uptime SLA')).toBeInTheDocument();
    expect(screen.getByText('Happy Clients')).toBeInTheDocument();
  });
});
