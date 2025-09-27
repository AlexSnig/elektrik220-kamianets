import { Service, Testimonial, CompanyData, BlogArticle } from '../types';

export interface AppState {
  services: Service[];
  testimonials: Testimonial[];
  companyData: CompanyData | null;
  blogArticles: BlogArticle[];
  loading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'SET_TESTIMONIALS'; payload: Testimonial[] }
  | { type: 'SET_COMPANY_DATA'; payload: CompanyData }
  | { type: 'SET_BLOG_ARTICLES'; payload: BlogArticle[] };

export const initialState: AppState = {
  services: [],
  testimonials: [],
  companyData: null,
  blogArticles: [],
  loading: true,
  error: null,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
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
    default:
      return state;
  }
};