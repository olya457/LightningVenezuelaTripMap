import {ImageSourcePropType} from 'react-native';

export type TabKey = 'explore' | 'saved' | 'map' | 'facts' | 'blog' | 'quiz';

export type Route =
  | {name: 'explore'}
  | {name: 'category'; categoryId: string}
  | {name: 'locationDetail'; locationId: string; backTo?: Route}
  | {name: 'saved'}
  | {name: 'map'; selectedLocationId?: string}
  | {name: 'facts'}
  | {name: 'blog'}
  | {name: 'blogDetail'; articleId: string}
  | {name: 'quiz'};

export type LocationCategory = {
  id: string;
  title: string;
  eyebrow: string;
  emoji: string;
  gradient: [string, string];
};

export type StormLocation = {
  id: string;
  categoryId: string;
  title: string;
  place: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  tag: string;
  description: string;
  image: ImageSourcePropType;
  markerType: 'lightning' | 'lake' | 'jungle';
};

export type FactCategory = {
  id: string;
  title: string;
  emoji: string;
};

export type Fact = {
  id: string;
  categoryId: string;
  title: string;
  body: string;
};

export type BlogArticle = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  image: ImageSourcePropType;
  body: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  image: ImageSourcePropType;
};
