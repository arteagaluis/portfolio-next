import '@testing-library/jest-dom';

// @ts-ignore
declare const jest: any;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}));

// Mock custom navigation wrapper if used
jest.mock('@/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/',
  Link: ({ children }: any) => children
}));

// Mock next-intl if used directly in components
jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t: any = (key: string) => key;
    t.raw = (key: string) => {
      if (key === 'items') {
        return ['item1', 'item2'];
      }
      return [];
    };
    return t;
  },
  useLocale: () => 'en'
}));

// Mock canvas getContext (jsdom does not implement it)
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn()
  })
});

// Mock embla-carousel-react to avoid DOM/ResizeObserver issues
jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => {
    // Return ref + null API to prevent effects from subscribing
    return [jest.fn(), null];
  }
}));

// Mock lucide-react (ESM icons) to avoid Jest ESM parsing issues
jest.mock('lucide-react', () => {
  return new Proxy(
    {},
    {
      get: () => () => null
    }
  );
});
