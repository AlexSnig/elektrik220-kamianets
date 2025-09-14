export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  urgent?: boolean;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export interface Company {
  name: string;
  tagline: string;
  description: string;
  experience: string;
  completed_projects: string;
  guarantee: string;
  response_time: string;
  services_count: number;
}

export interface Contact {
  phones: Array<{
    number: string;
    type: string;
    primary: boolean;
  }>;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    postal_code: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  working_hours: {
    monday_friday: string;
    saturday: string;
    sunday: string;
    emergency: string;
  };
}

export interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  reading_time: string;
}

export interface CompanyData {
  company: Company;
  contact: Contact;
  certificates: string[];
  social_media: {
    facebook: string;
    instagram: string;
    telegram: string;
  };
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email?: string;
  service: string;
  description: string;
  address: string;
  preferred_time: string;
}
