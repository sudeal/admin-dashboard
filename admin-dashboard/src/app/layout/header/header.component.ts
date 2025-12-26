import { Component, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
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

  constructor(public themeService: ThemeService) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onSearch(value: string) {
    this.searchValue = value;
  }

  onToggleTheme() {
    this.themeService.toggleTheme();
  }
}
