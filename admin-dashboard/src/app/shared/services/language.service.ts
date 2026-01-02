import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'en' | 'tr';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage = signal<Language>('en');
  private readonly defaultLanguage: Language = 'en';
  private readonly storageKey = 'app-language';

  constructor(private translate: TranslateService) {
    
    const savedLanguage = localStorage.getItem(this.storageKey) as Language;
    const language = savedLanguage || this.defaultLanguage;
    
    this.setLanguage(language);
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    this.translate.use(lang);
    localStorage.setItem(this.storageKey, lang);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'en' ? 'tr' : 'en';
    this.setLanguage(newLang);
  }

  getLanguageLabel(): string {
    return this.currentLanguage() === 'en' ? 'English' : 'Türkçe';
  }
}

