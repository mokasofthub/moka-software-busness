import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      rights: '© 2026 MokaSoftware. All rights reserved.',
    };
    return map[key] ?? key;
  },
}));

jest.mock('../BrandLogo', () => {
  function BrandLogo() {
    return <span data-testid="brand-logo">MokaSoftware</span>;
  }
  return BrandLogo;
});

describe('Footer', () => {
  it('renders the brand logo', () => {
    render(<Footer />);
    expect(screen.getByTestId('brand-logo')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2026 MokaSoftware. All rights reserved.')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'about' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'services' })).toHaveAttribute('href', '#services');
    expect(screen.getByRole('link', { name: 'pricing' })).toHaveAttribute('href', '#pricing');
    expect(screen.getByRole('link', { name: 'contact' })).toHaveAttribute('href', '#contact');
  });

  it('renders exactly 4 footer nav links', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    const links = footer.querySelectorAll('a');
    expect(links.length).toBe(4);
  });
});
