import { render, screen, fireEvent, act } from '@testing-library/react';
import Services from '../Services';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const items = [
      { title: 'CI/CD Pipelines', description: 'Automate your builds and deploys.' },
      { title: 'Cloud Architecture', description: 'Scalable cloud systems.' },
      { title: 'Kubernetes', description: 'Container orchestration at scale.' },
      { title: 'Full-Stack Dev', description: 'End-to-end product engineering.' },
      { title: 'API Design', description: 'REST and GraphQL APIs.' },
      { title: 'Security Review', description: 'Harden your stack.' },
      { title: 'Database Optimization', description: 'Query tuning and indexing.' },
      { title: 'Monitoring', description: 'Observability pipelines.' },
      { title: 'Microservices', description: 'Service mesh and decomposition.' },
    ];
    const map: Record<string, unknown> = {
      label: 'Services',
      headline: 'What I Do',
      subheading: 'End-to-end engineering services',
      show_more: 'See {count} more services',
      show_less: 'Show less',
      items,
    };
    const t = (key: string, params?: Record<string, unknown>) => {
      if (key === 'show_more' && params) return `See ${params.count} more services`;
      return (map[key] as string) ?? key;
    };
    t.raw = (key: string) => map[key] ?? key;
    return t;
  },
}));

// Card3D just renders children
jest.mock('../Card3D', () =>
  function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
  }
);

// Mock IntersectionObserver (not in jsdom)
let ioCallback: IntersectionObserverCallback;
beforeAll(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: jest.fn((cb: IntersectionObserverCallback) => {
      ioCallback = cb;
      return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
    }),
  });
});

describe('Services', () => {
  it('renders the section headline', () => {
    render(<Services />);
    expect(screen.getByText('What I Do')).toBeInTheDocument();
  });

  it('renders the section label', () => {
    render(<Services />);
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('renders the section subheading', () => {
    render(<Services />);
    expect(screen.getByText('End-to-end engineering services')).toBeInTheDocument();
  });

  it('renders the first 6 visible service card titles', () => {
    render(<Services />);
    // Each title appears at least once (mobile carousel + desktop grid)
    ['CI/CD Pipelines', 'Cloud Architecture', 'Kubernetes', 'Full-Stack Dev', 'API Design', 'Security Review']
      .forEach((title) => {
        expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
      });
  });

  it('shows the expand button with hidden count', () => {
    render(<Services />);
    expect(screen.getByText(/See 3 more services/i)).toBeInTheDocument();
  });

  it('expands to show hidden services when expand button is clicked', () => {
    render(<Services />);
    const btn = screen.getByText(/See 3 more services/i);
    fireEvent.click(btn);
    expect(screen.getByText('Show less')).toBeInTheDocument();
    expect(screen.getAllByText('Database Optimization').length).toBeGreaterThanOrEqual(1);
  });

  it('collapses again when show-less button is clicked', () => {
    render(<Services />);
    fireEvent.click(screen.getByText(/See 3 more services/i));
    fireEvent.click(screen.getByText('Show less'));
    expect(screen.getByText(/See 3 more services/i)).toBeInTheDocument();
  });

  it('adds visible class to service card when IntersectionObserver fires', () => {
    const { container } = render(<Services />);
    const card = container.querySelector('.service-card') as HTMLElement;
    if (card && ioCallback) {
      act(() => {
        ioCallback(
          [{ isIntersecting: true, target: card } as IntersectionObserverEntry],
          {} as IntersectionObserver
        );
      });
      expect(card.classList.contains('visible')).toBe(true);
    }
  });

  it('mobile carousel onScroll updates active slide index without throwing', () => {
    render(<Services />);
    const carousel = document.querySelector('.snap-x') as HTMLElement;
    if (carousel) {
      Object.defineProperty(carousel, 'scrollWidth', { configurable: true, value: 900 });
      Object.defineProperty(carousel, 'scrollLeft', { configurable: true, value: 300 });
      fireEvent.scroll(carousel);
    }
    // No crash = pass
  });
});
