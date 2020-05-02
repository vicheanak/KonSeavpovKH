import React from 'react';
import { AppStorage } from './app-storage.service';

export type Theme = 'light' | 'dark';
export type Local = 'kh' | 'en';

export const ThemeContext = React.createContext({
  theme: 'light',
  setCurrentTheme: (nextTheme: Theme) => {
    AppStorage.setTheme(nextTheme);
  },
});

