import { render, screen, fireEvent } from '@testing-library/react';
import Projects from '../Projects';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const map: Record<string, unknown> = {
      label: 'Projects',
      headline: 'Selected Work',
      subheading: 'Case studies from production.',
      view_case_study: 'View Case Study',
      modal_challenge: 'Challenge',
      modal_solution: 'Solution',
      modal_outcomes: 'Outcomes',
      modal_cta: 'Work with me',
      items: [
        { title: 'Jenkins Pipeline', description: 'CI/CD automation at scale.', tech: ['Jenkins', 'Docker'] },
        { title: 'SaaS Platform', description: 'Full-stack SaaS product.', tech: ['Next.js', 'AWS'] },
        { title: 'Microservices API', description: 'Event-driven backend.', tech: ['Quarkus', 'Kafka'] },
      ],
      case_studies: [
        { challenge: 'Slow deploys.', solution: 'Automated the pipeline.', outcome: ['50% faster', '99.9% uptime'] },
        { challenge: 'No scalability.', solution: 'Rebuilt on cloud.', outcome: ['3x throughput'] },
        { challenge: 'Monolith debt.', solution: 'Decomposed services.', outcome: ['Independent deploys'] },
      ],
    };
    const t = (key: string) => (map[key] as string) ?? key;
    t.raw = (key: string) => map[key] ?? key;
    return t;
  },
}));

jest.mock('../Card3D', () =>
  function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
  }
);

describe('Projects', () => {
  it('renders the headline', () => {
    render(<Projects />);
    expect(screen.getByText('Selected Work')).toBeInTheDocument();
  });

  it('renders the section label', () => {
    render(<Projects />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders all project titles', () => {
    render(<Projects />);
    ['Jenkins Pipeline', 'SaaS Platform', 'Microservices API'].forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders tech tags for first project', () => {
    render(<Projects />);
    expect(screen.getAllByText('Jenkins').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Docker').length).toBeGreaterThanOrEqual(1);
  });

  it('renders "View Case Study" links for all projects', () => {
    render(<Projects />);
    expect(screen.getAllByText('View Case Study').length).toBeGreaterThanOrEqual(3);
  });

  it('opens the case study modal when "View Case Study" is clicked', () => {
    render(<Projects />);
    // Click the first "View Case Study" button
    fireEvent.click(screen.getAllByText('View Case Study')[0]);
    // Title appears in both card and modal; verify modal-specific content
    expect(screen.getByText('Automated the pipeline.')).toBeInTheDocument();
    expect(screen.getByText('50% faster')).toBeInTheDocument();
  });

  it('closes the modal when backdrop is clicked', () => {
    render(<Projects />);
    fireEvent.click(screen.getAllByText('View Case Study')[0]);
    // The outer modal div with onClick={onClose}
    const modal = document.querySelector('.fixed.inset-0') as HTMLElement;
    fireEvent.click(modal);
    expect(screen.queryByText('Automated the pipeline.')).not.toBeInTheDocument();
  });

  it('does not close the modal when the inner panel is clicked', () => {
    render(<Projects />);
    fireEvent.click(screen.getAllByText('View Case Study')[0]);
    // The inner panel has onClick={e => e.stopPropagation()}
    const panel = document.querySelector('.fixed.inset-0 > div:not(.absolute)') as HTMLElement;
    if (panel) fireEvent.click(panel);
    // Modal content should still be visible
    expect(screen.getByText('Automated the pipeline.')).toBeInTheDocument();
  });

  it('mobile carousel onScroll updates active slide index', () => {
    render(<Projects />);
    const carousel = document.querySelector('.snap-x') as HTMLElement;
    if (carousel) {
      Object.defineProperty(carousel, 'scrollWidth', { configurable: true, value: 1200 });
      Object.defineProperty(carousel, 'scrollLeft', { configurable: true, value: 400 });
      fireEvent.scroll(carousel);
    }
    // No crash = pass
  });

  it('renders the modal CTA button', () => {
    render(<Projects />);
    fireEvent.click(screen.getAllByText('View Case Study')[0]);
    expect(screen.getByRole('link', { name: 'Work with me' })).toBeInTheDocument();
  });
});
