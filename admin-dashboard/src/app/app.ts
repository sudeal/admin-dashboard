import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AdminSidebarComponent } from "./layout/sidebar/admin-sidebar.component";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, AdminSidebarComponent, HeaderComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("admin-dashboard");
  sidebarCollapsed = signal(false);

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }
}
