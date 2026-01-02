import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { AdminSidebarComponent } from "../sidebar/admin-sidebar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent, HeaderComponent],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.css",
})
export class MainLayoutComponent {
  sidebarCollapsed = signal(this.loadSidebarState());

  private loadSidebarState(): boolean {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  }

  private saveSidebarState(collapsed: boolean): void {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => {
      const newValue = !v;
      this.saveSidebarState(newValue);
      return newValue;
    });
  }
}

