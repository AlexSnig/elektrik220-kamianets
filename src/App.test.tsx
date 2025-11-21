import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch for data loading
global.fetch = vi.fn();

describe('App Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    vi.resetAllMocks();

    // Mock successful fetch responses for all data files
    (global.fetch as any).mockImplementation((url: string) => {
      if (url.includes('company.json')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              company: {
                name: 'Електрик 220В',
                tagline: 'Професійні електромонтажні послуги',
                experience: '15 років',
                guarantee: '3 роки',
                completed_projects: '2000+',
              },
              contact: {
                phones: [{ number: '+380677523103', type: 'primary', primary: true }],
                email: 'info@elektrik220.km.ua',
                address: {
                  street: 'Річна 11',
                  city: "Кам'янець-Подільський",
                  region: 'Хмельницька область',
                  postal_code: '32301',
                  coordinates: { lat: 48.672192, lng: 26.5671073 },
                },
                working_hours: {
                  monday_friday: '9:00 - 18:00',
                  saturday: '10:00 - 16:00',
                  sunday: 'Вихідний',
                  emergency: '24/7',
                },
              },
              social_media: {
                facebook: 'https://facebook.com',
                instagram: 'https://instagram.com',
                telegram: 'https://t.me',
              },
            }),
        });
      }
      if (url.includes('services.json')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              services: [
                {
                  id: 'emergency-call',
                  title: 'Аварійний виклик',
                  description: 'Цілодобова аварійна служба',
                  price: 'від 500 грн',
                  icon: '⚡',
                  urgent: true,
                  features: ['24/7', 'Приїзд за 30 хв'],
                },
              ],
            }),
        });
      }
      if (url.includes('testimonials.json')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ testimonials: [] }),
        });
      }
      if (url.includes('blog.json')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ articles: [] }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders semantic HTML structure', async () => {
    render(<App />);

    // Wait for the app to render main semantic elements
    await waitFor(
      () => {
        const main = document.querySelector('main');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        expect(main).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it('calls fetch for data loading', () => {
    render(<App />);

    // Verify that fetch was called to load data
    expect(global.fetch).toHaveBeenCalled();
  });
});
