/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction, initialState, appReducer } from './app-context-core';
import { Service, Testimonial, CompanyData, BlogArticle } from '../types';

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