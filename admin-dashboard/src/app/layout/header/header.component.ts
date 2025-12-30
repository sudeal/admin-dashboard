import { Component, Output, EventEmitter, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ThemeService } from "../../shared/services/theme.service";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  imports: [CommonModule],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  searchValue = "";
  profileMenuOpen = false;
  notificationMenuOpen = false;

  notifications = [
    {
      icon: 'bi-gear',
      iconBg: '#3b82f6',
      title: 'Settings',
      description: 'Update Dashboard'
    },
    {
      icon: 'bi-calendar',
      iconBg: '#ec4899',
      title: 'Event Update',
      description: 'An event date update again'
    },
    {
      icon: 'bi-person',
      iconBg: '#8b5cf6',
      title: 'Profile',
      description: 'Update your profile'
    },
    {
      icon: 'bi-exclamation-triangle',
      iconBg: '#ef4444',
      title: 'Application Error',
      description: 'Check Your running application'
    }
  ];

  constructor(public themeService: ThemeService, private router: Router) {}

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
    }
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
  }
}
