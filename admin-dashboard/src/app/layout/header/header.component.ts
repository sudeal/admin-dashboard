import { Component, Output, EventEmitter, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ThemeService } from "../../shared/services/theme.service";
import { LanguageService } from "../../shared/services/language.service";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  imports: [CommonModule, TranslateModule],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  searchValue = "";
  profileMenuOpen = false;
  notificationMenuOpen = false;
  languageMenuOpen = false;

  notifications = [
    {
      icon: 'bi-gear',
      iconBg: '#3b82f6',
      titleKey: 'common.settings',
      descriptionKey: 'common.updateDashboard'
    },
    {
      icon: 'bi-calendar',
      iconBg: '#ec4899',
      titleKey: 'common.eventUpdate',
      descriptionKey: 'common.anEventDateUpdate'
    },
    {
      icon: 'bi-person',
      iconBg: '#8b5cf6',
      titleKey: 'common.profile',
      descriptionKey: 'common.updateProfile'
    },
    {
      icon: 'bi-exclamation-triangle',
      iconBg: '#ef4444',
      titleKey: 'common.applicationError',
      descriptionKey: 'common.checkApplication'
    }
  ];

  constructor(
    public themeService: ThemeService,
    private router: Router,
    public languageService: LanguageService
  ) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onSearch(value: string) {
    this.searchValue = value;
  }

  onToggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
    if (this.profileMenuOpen) {
      this.notificationMenuOpen = false;
    }
  }

  toggleNotificationMenu() {
    this.notificationMenuOpen = !this.notificationMenuOpen;
    if (this.notificationMenuOpen) {
      this.profileMenuOpen = false;
      this.languageMenuOpen = false;
    }
  }

  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
    if (this.languageMenuOpen) {
      this.profileMenuOpen = false;
      this.notificationMenuOpen = false;
    }
  }

  selectLanguage(lang: 'en' | 'tr') {
    this.languageService.setLanguage(lang);
    this.languageMenuOpen = false;
  }

  onLogout() {
    this.profileMenuOpen = false;
    this.router.navigateByUrl("/login"); 
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest(".profile-wrapper")) {
      this.profileMenuOpen = false;
    }
    if (!target.closest(".notification-wrapper")) {
      this.notificationMenuOpen = false;
    }
    if (!target.closest(".language-wrapper")) {
      this.languageMenuOpen = false;
    }
  }
}
