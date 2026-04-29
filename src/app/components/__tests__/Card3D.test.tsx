import { render, screen, fireEvent } from '@testing-library/react';
import Card3D from '../Card3D';

describe('Card3D', () => {
  it('renders children', () => {
    render(<Card3D><span>content</span></Card3D>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies card-3d class to the wrapper', () => {
    const { container } = render(<Card3D>child</Card3D>);
    expect(container.firstElementChild).toHaveClass('card-3d');
  });

  it('merges custom className', () => {
    const { container } = render(<Card3D className="my-custom">child</Card3D>);
    expect(container.firstElementChild).toHaveClass('card-3d', 'my-custom');
  });

  it('includes a hidden glare overlay', () => {
    const { container } = render(<Card3D>child</Card3D>);
    const glare = container.querySelector('.card-3d-glare');
    expect(glare).toBeInTheDocument();
    expect(glare).toHaveAttribute('aria-hidden');
  });

  it('sets perspective transform on mouse move', () => {
    const { container } = render(<Card3D>child</Card3D>);
    const card = container.firstElementChild as HTMLElement;

    jest.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => ({}),
    } as DOMRect);

    fireEvent.mouseMove(card, { clientX: 150, clientY: 50 });
    expect(card.style.transform).toContain('perspective(900px)');
    expect(card.style.transform).toContain('rotateX(');
    expect(card.style.transform).toContain('rotateY(');
  });

  it('clears transform on mouse leave', () => {
    const { container } = render(<Card3D>child</Card3D>);
    const card = container.firstElementChild as HTMLElement;

    jest.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => ({}),
    } as DOMRect);

    fireEvent.mouseMove(card, { clientX: 150, clientY: 50 });
    expect(card.style.transform).not.toBe('');

    fireEvent.mouseLeave(card);
    expect(card.style.transform).toBe('');
  });

  it('shows glare overlay on mouse move and hides it on leave', () => {
    const { container } = render(<Card3D>child</Card3D>);
    const card = container.firstElementChild as HTMLElement;
    const glare = container.querySelector('.card-3d-glare') as HTMLElement;

    jest.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => ({}),
    } as DOMRect);

    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    expect(glare.style.opacity).toBe('1');

    fireEvent.mouseLeave(card);
    expect(glare.style.opacity).toBe('0');
  });
});
