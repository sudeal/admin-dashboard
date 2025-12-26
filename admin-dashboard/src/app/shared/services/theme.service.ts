import { Injectable, signal } from "@angular/core";

type Theme = "light" | "dark";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly storageKey = "admin_theme";
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  toggleTheme() {
    const next: Theme = this.theme() === "light" ? "dark" : "light";
    this.theme.set(next);
    this.applyTheme(next);
    localStorage.setItem(this.storageKey, next);
  }

  private applyTheme(theme: Theme) {
    // tüm uygulamaya uygulanacak attribute
    document.documentElement.setAttribute("data-theme", theme);
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    if (saved === "light" || saved === "dark") return saved;

    // sistem tercihi dark ise default dark
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }
}
