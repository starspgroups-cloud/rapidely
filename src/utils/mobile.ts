export function vibrate(pattern: number | number[] = 12) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

export function isStandaloneApp() {
  return window.matchMedia?.('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
}

export function shareOrder(orderRef: string) {
  const text = `Track my RapiDely order: ${orderRef}`;
  if (navigator.share) return navigator.share({ title: 'RapiDely order', text });
  return navigator.clipboard?.writeText(text);
}
