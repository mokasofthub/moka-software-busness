/**
 * Returns true if the string looks like a valid email address.
 * Used by the contact form for client-side validation.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
