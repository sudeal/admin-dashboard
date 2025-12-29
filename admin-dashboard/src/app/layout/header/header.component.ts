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
  }
}
