/** Public recovery guidance only; never expose delivery or verification internals. */
export function contactFailureMessage(status?: number): string {
  if (status === 400) {
    return 'Check the form fields and complete spam verification, then try again. Your message is still here.';
  }
  if (status === 403) {
    return 'Verification could not be completed. Please complete it again before retrying. Your message is still here.';
  }
  if (status !== undefined) {
    return 'Sending is temporarily unavailable. Your message is still here. Please try again later or email me directly.';
  }
  return 'No send confirmation was received. Your message is still here. Check your connection before retrying, or email me directly.';
}
