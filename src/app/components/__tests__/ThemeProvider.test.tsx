import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider, { useTheme } from '../ThemeProvider';

// Minimal consumer component so we can read and toggle the theme
function ThemeConsumer() {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('defaults to dark when localStorage is empty', async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(await screen.findByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('reads "light" from localStorage on mount', async () => {
    localStorage.setItem('theme', 'light');
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(await screen.findByText('light')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('toggles from dark to light', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await screen.findByText('dark');
    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('toggles from light to dark', async () => {
    const user = userEvent.setup();
    localStorage.setItem('theme', 'light');
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await screen.findByText('light');
    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('persists toggle across multiple calls', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await screen.findByText('dark');
    await user.click(screen.getByRole('button', { name: 'toggle' }));
    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
