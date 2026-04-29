import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';

// Mock next-intl with realistic values matching the component's usage
jest.mock('next-intl', () => ({
  useTranslations: () => {
    const map: Record<string, unknown> = {
      label: 'Contact',
      headline: "Let's work together",
      subheading: 'Get in touch',
      name_label: 'Name',
      name_placeholder: 'Your name',
      email_label: 'Email',
      email_placeholder: 'your@email.com',
      service_label: 'Service',
      service_placeholder: 'Select a service',
      message_label: 'Message',
      message_placeholder: 'Your message',
      submit: 'Send Message',
      sending: 'Sending…',
      success_title: 'Message sent!',
      success_body: "I'll get back to you soon.",
      error_generic: 'Please fill in all required fields.',
      services: ['Web Development', 'Cloud Architecture'],
    };
    const t = (key: string) => (map[key] as string) ?? key;
    t.raw = (key: string) => map[key] ?? key;
    return t;
  },
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^name/i), 'John Doe');
  await user.type(screen.getByLabelText(/^email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/^message/i), 'Hello there');
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Contact', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  it('renders name, email, service and message fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('renders contact email address', () => {
    render(<Contact />);
    expect(screen.getByText('contact@mokasoftwarebusness.com')).toBeInTheDocument();
  });

  // ── Validation ─────────────────────────────────────────────────────────────

  it('shows error when all fields are empty', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByText('Please fill in all required fields.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('shows error when name is missing', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/^email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/^message/i), 'Hello');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByText('Please fill in all required fields.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('shows error on invalid email format', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/^name/i), 'John');
    await user.type(screen.getByLabelText(/^email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^message/i), 'Hello');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByText('Please fill in all required fields.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('shows error when message is missing', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/^name/i), 'John');
    await user.type(screen.getByLabelText(/^email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByText('Please fill in all required fields.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // ── Successful submission ──────────────────────────────────────────────────

  it('shows success message on ok response', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<Contact />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Message sent!')).toBeInTheDocument();
    expect(screen.getByText("I'll get back to you soon.")).toBeInTheDocument();
  });

  it('clears form fields after successful submission', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<Contact />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    await screen.findByText('Message sent!');

    expect((screen.getByLabelText(/^name/i) as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/^email/i) as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/^message/i) as HTMLTextAreaElement).value).toBe('');
  });

  it('posts to Formspree with correct payload', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<Contact />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    await screen.findByText('Message sent!');

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`);
    expect(options.method).toBe('POST');
    const body = JSON.parse(options.body);
    expect(body.name).toBe('John Doe');
    expect(body.email).toBe('john@example.com');
    expect(body.message).toBe('Hello there');
  });

  // ── Failed submission ──────────────────────────────────────────────────────

  it('shows server error message from Formspree on non-ok response', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ errors: [{ message: 'Email address is invalid' }] }),
    });

    render(<Contact />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Email address is invalid')).toBeInTheDocument();
  });

  it('shows generic error on network failure', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<Contact />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Please fill in all required fields.')).toBeInTheDocument();
  });

  // ── Loading state ──────────────────────────────────────────────────────────

  it('disables submit button while request is in flight', async () => {
    const user = userEvent.setup();
    let resolveRequest!: (v: unknown) => void;
    (global.fetch as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => { resolveRequest = resolve; }),
    );

    render(<Contact />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

    // Clean up: resolve the promise so React doesn't warn about state updates
    resolveRequest({ ok: true, json: async () => ({}) });
    await screen.findByText('Message sent!');
  });
});
