import { isValidEmail } from '@/lib/utils';

describe('isValidEmail', () => {
  it.each([
    'user@example.com',
    'user.name+tag@sub.domain.com',
    'user@domain.co.uk',
    'x@y.z',
  ])('returns true for valid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each([
    '',
    'notanemail',
    'user@',
    '@domain.com',
    'user @example.com',
    'user@ example.com',
    'user@domain',
    'user@.com',
  ])('returns false for invalid email: %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});
