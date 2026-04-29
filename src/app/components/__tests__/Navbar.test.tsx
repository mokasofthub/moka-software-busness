import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      about: 'About',
      services: 'Services',
      skills: 'Skills',
      projects: 'Projects',
      pricing: 'Pricing',
      contact: 'Contact',
      hire: 'Hire Me',
    };
    return map[key] ?? key;
  },
  useLocale: () => 'en',
}));

jest.mock('@/i18n', () => ({
  locales: ['en', 'fr', 'es', 'de', 'pt'],
}));

// Provide a stable theme context without needing the real ThemeProvider
jest.mock('../ThemeProvider', () => ({
  useTheme: () => ({ theme: 'dark', toggle: jest.fn() }),
}));

describe('Navbar', () => {
  it('renders the logo text', () => {
    render(<Navbar />);
    expect(screen.getByText(/MokaSoftware/)).toBeInTheDocument();
  });

  it('renders logo link pointing to #hero', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /MokaSoftware/i })).toHaveAttribute('href', '#hero');
  });

  it('renders all five navigation links in the desktop nav', () => {
    render(<Navbar />);
    // Each key appears at least once (desktop nav)
    ['About', 'Services', 'Skills', 'Projects', 'Pricing'].forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('nav links point to the correct anchors', () => {
    render(<Navbar />);
    const anchors: [string, string][] = [
      ['About', '#about'],
      ['Services', '#services'],
      ['Skills', '#skills'],
      ['Projects', '#projects'],
      ['Pricing', '#pricing'],
    ];
    for (const [label, href] of anchors) {
      const link = screen.getAllByRole('link', { name: label })[0];
      expect(link).toHaveAttribute('href', href);
    }
  });

  it('renders at least one "Hire Me" link pointing to #contact', () => {
    render(<Navbar />);
    const hireLinks = screen.getAllByRole('link', { name: 'Hire Me' });
    expect(hireLinks.length).toBeGreaterThanOrEqual(1);
    expect(hireLinks[0]).toHaveAttribute('href', '#contact');
  });

  it('renders a theme toggle button', () => {
    render(<Navbar />);
    const toggles = screen.getAllByRole('button', { name: 'Toggle theme' });
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it('mobile menu is hidden initially', () => {
    render(<Navbar />);
    // Mobile menu items are only rendered when menuOpen is true.
    // With menuOpen=false there is exactly one set of nav links (the desktop set).
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(1);
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));
    // After opening, desktop links + mobile links are both in the DOM
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThan(1);
  });

  it('closes mobile menu when hamburger is clicked a second time', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const hamburger = screen.getByRole('button', { name: 'Toggle menu' });
    await user.click(hamburger); // open
    await user.click(hamburger); // close
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(1);
  });

  it('renders language switcher button', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: 'Switch language' })).toBeInTheDocument();
  });

  it('shows language dropdown on switcher click', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: 'Switch language' }));
    // All locale buttons should now be visible
    expect(screen.getByRole('button', { name: /🇫🇷/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🇪🇸/ })).toBeInTheDocument();
  });
});
