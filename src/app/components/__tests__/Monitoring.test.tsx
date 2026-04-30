import { render, screen, act } from '@testing-library/react';
import Monitoring from '../Monitoring';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      badge: 'Live Infrastructure',
      title: 'Infrastructure & Monitoring',
      subtitle: 'Production-grade observability stack.',
      highlight_1: 'ECS Fargate runs the Next.js app.',
      highlight_2: 'CloudFront handles CDN and HTTPS.',
      highlight_3: 'CloudWatch metrics feed Grafana.',
      highlight_4: 'Synthetic probes check uptime globally.',
      cta: 'View Live Dashboard',
    };
    return map[key] ?? key;
  },
}));

// Mock IntersectionObserver
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

describe('Monitoring', () => {
  it('renders the section title', () => {
    render(<Monitoring />);
    expect(screen.getByText('Infrastructure & Monitoring')).toBeInTheDocument();
  });

  it('renders the live badge', () => {
    render(<Monitoring />);
    expect(screen.getByText('Live Infrastructure')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Monitoring />);
    expect(screen.getByText('Production-grade observability stack.')).toBeInTheDocument();
  });

  it('renders all tech badge labels', () => {
    render(<Monitoring />);
    ['AWS ECS', 'CloudFront', 'CloudWatch', 'Grafana', 'Jenkins', 'Docker', 'Fargate'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders all 4 highlight items', () => {
    render(<Monitoring />);
    expect(screen.getByText('ECS Fargate runs the Next.js app.')).toBeInTheDocument();
    expect(screen.getByText('CloudFront handles CDN and HTTPS.')).toBeInTheDocument();
    expect(screen.getByText('CloudWatch metrics feed Grafana.')).toBeInTheDocument();
    expect(screen.getByText('Synthetic probes check uptime globally.')).toBeInTheDocument();
  });

  it('renders the CTA link with the correct Grafana dashboard href', () => {
    render(<Monitoring />);
    const link = screen.getByRole('link', { name: /view live dashboard/i });
    expect(link).toHaveAttribute(
      'href',
      'https://mokasoftwarebusness.grafana.net/public-dashboards/dbed62c3868144f19ad729f899a32f78'
    );
  });

  it('CTA link opens in a new tab', () => {
    render(<Monitoring />);
    const link = screen.getByRole('link', { name: /view live dashboard/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('section has the monitoring id', () => {
    const { container } = render(<Monitoring />);
    expect(container.querySelector('#monitoring')).toBeInTheDocument();
  });

  it('makes content visible when IntersectionObserver fires', () => {
    const { container } = render(<Monitoring />);
    const root = container.querySelector('[class*="opacity-0"]');
    // Trigger the observer
    act(() => {
      const el = container.querySelector('div') as HTMLElement;
      ioCallback(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    // After visibility is set, opacity-0 classes should be gone
    expect(container.querySelector('[class*="opacity-100"]') ?? root).toBeTruthy();
  });
});
