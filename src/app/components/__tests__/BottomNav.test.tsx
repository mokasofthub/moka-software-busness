import { render, screen } from '@testing-library/react';
import BottomNav from '../BottomNav';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      pricing: 'Pricing',
      hire: 'Hire Me',
    };
    return map[key] ?? key;
  },
}));

// Mock IntersectionObserver (not available in jsdom)
const observeMock = jest.fn();
const disconnectMock = jest.fn();
beforeAll(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: jest.fn(() => ({
      observe: observeMock,
      unobserve: jest.fn(),
      disconnect: disconnectMock,
    })),
  });
});

describe('BottomNav', () => {
  it('renders 5 navigation items', () => {
    render(<BottomNav />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(5);
  });

  it('renders correct hrefs', () => {
    render(<BottomNav />);
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '#services');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /pricing/i })).toHaveAttribute('href', '#pricing');
    expect(screen.getByRole('link', { name: /hire/i })).toHaveAttribute('href', '#contact');
  });

  it('renders nav icons', () => {
    render(<BottomNav />);
    expect(screen.getByText('👤')).toBeInTheDocument();
    expect(screen.getByText('🔧')).toBeInTheDocument();
    expect(screen.getByText('📂')).toBeInTheDocument();
  });

  it('is only visible on mobile (md:hidden class)', () => {
    const { container } = render(<BottomNav />);
    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('md:hidden');
  });

  it('is fixed at the bottom', () => {
    const { container } = render(<BottomNav />);
    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('fixed');
    expect(nav?.className).toContain('bottom-0');
  });
});
