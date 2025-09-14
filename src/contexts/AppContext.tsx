import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Service, Testimonial, CompanyData, BlogArticle } from '../types';

interface AppState {
  services: Service[];
  testimonials: Testimonial[];
  companyData: CompanyData | null;
  blogArticles: BlogArticle[];
  loading: boolean;
  error: string | null;
  darkMode: boolean;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'SET_TESTIMONIALS'; payload: Testimonial[] }
  | { type: 'SET_COMPANY_DATA'; payload: CompanyData }
  | { type: 'SET_BLOG_ARTICLES'; payload: BlogArticle[] }
  | { type: 'TOGGLE_DARK_MODE' };

const initialState: AppState = {
  services: [],
  testimonials: [],
  companyData: null,
  blogArticles: [],
  loading: true,
  error: null,
  darkMode: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SET_TESTIMONIALS':
      return { ...state, testimonials: action.payload };
    case 'SET_COMPANY_DATA':
      return { ...state, companyData: action.payload };
    case 'SET_BLOG_ARTICLES':
      return { ...state, blogArticles: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppAction>>(appReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Load all data concurrently
        const [servicesRes, testimonialsRes, companyRes, blogRes] = await Promise.all([
          fetch('/data/services.json'),
          fetch('/data/testimonials.json'),
          fetch('/data/company.json'),
          fetch('/data/blog.json'),
        ]);

        if (!servicesRes.ok || !testimonialsRes.ok || !companyRes.ok || !blogRes.ok) {
          throw new Error('Failed to load data');
        }

        const [servicesData, testimonialsData, companyData, blogData] = await Promise.all([
          servicesRes.json() as Promise<{ services: Service[] }>,
          testimonialsRes.json() as Promise<{ testimonials: Testimonial[] }>,
          companyRes.json() as Promise<CompanyData>,
          blogRes.json() as Promise<{ articles: BlogArticle[] }>,
        ]);

        // Basic runtime validation and dispatch
        if (servicesData && Array.isArray(servicesData.services)) {
          dispatch({ type: 'SET_SERVICES', payload: servicesData.services });
        }
        if (testimonialsData && Array.isArray(testimonialsData.testimonials)) {
          dispatch({ type: 'SET_TESTIMONIALS', payload: testimonialsData.testimonials });
        }
        if (companyData) {
          dispatch({ type: 'SET_COMPANY_DATA', payload: companyData });
        }
        if (blogData && Array.isArray(blogData.articles)) {
          dispatch({ type: 'SET_BLOG_ARTICLES', payload: blogData.articles });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Помилка завантаження даних' });
        console.error('Error loading data:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    // call and intentionally ignore returned promise (handled inside)
    void loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
