import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'color-theme';

  constructor() {
    this.loadTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (event) => {
      console.log(event.matches);
      if (!localStorage.getItem(this.themeKey)) {
        const darkThemeMq = event.matches;
        if (darkThemeMq) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        this.loadTheme();
      }
    });
  }

  // Toggle dark mode
  toggleTheme(): void {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(this.themeKey, isDark ? 'dark' : 'light');
  }

  // Load theme from local storage
  private loadTheme(): void {
    const storedTheme = localStorage.getItem(this.themeKey);
    if (
      storedTheme === 'dark' ||
      (!storedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
