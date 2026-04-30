import { render, screen, act } from '@testing-library/react';
import BottomNav from '../BottomNav';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      monitoring: 'Monitoring',
      pricing: 'Pricing',
      hire: 'Hire Me',
    };
    return map[key] ?? key;
  },
}));

// Mock IntersectionObserver (not available in jsdom)
let intersectionCallback: IntersectionObserverCallback;
const observeMock = jest.fn();
const disconnectMock = jest.fn();
beforeAll(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: jest.fn((cb: IntersectionObserverCallback) => {
      intersectionCallback = cb;
      return { observe: observeMock, unobserve: jest.fn(), disconnect: disconnectMock };
    }),
  });
});

describe('BottomNav', () => {
  it('renders 6 navigation items', () => {
    render(<BottomNav />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(6);
  });

  it('renders correct hrefs', () => {
    render(<BottomNav />);
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '#services');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /monitoring/i })).toHaveAttribute('href', '#monitoring');
    expect(screen.getByRole('link', { name: /pricing/i })).toHaveAttribute('href', '#pricing');
    expect(screen.getByRole('link', { name: /hire/i })).toHaveAttribute('href', '#contact');
  });

  it('renders nav icons', () => {
    render(<BottomNav />);
    expect(screen.getByText('👤')).toBeInTheDocument();
    expect(screen.getByText('🔧')).toBeInTheDocument();
    expect(screen.getByText('📂')).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
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

  it('highlights the active section when IntersectionObserver fires', () => {
    // Create a real DOM element with an id so the observer can find it
    const el = document.createElement('div');
    el.id = 'about';
    document.body.appendChild(el);

    render(<BottomNav />);

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // The "About" link should now have the active colour class
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink.className).toContain('text-cyan-400');

    document.body.removeChild(el);
  });
});
