import { Component, signal, OnInit, OnDestroy, HostListener } from "@angular/core";
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
export class MainLayoutComponent implements OnInit, OnDestroy {
  sidebarCollapsed = signal(this.loadSidebarState());

  ngOnInit() {
    
    if (this.isMobile() && !this.sidebarCollapsed()) {
      this.sidebarCollapsed.set(true);
    }
  }

  @HostListener('window:resize')
  onResize() {
    
    if (this.isMobile() && !this.sidebarCollapsed()) {
      this.sidebarCollapsed.set(true);
    }
   
    else if (!this.isMobile()) {
      const saved = localStorage.getItem("sidebarCollapsed");
      const shouldBeCollapsed = saved === "true";
      if (shouldBeCollapsed !== this.sidebarCollapsed()) {
        this.sidebarCollapsed.set(shouldBeCollapsed);
      }
    }
  }

  isMobile(): boolean {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 576;
    }
    return false;
  }

  ngOnDestroy() {
    
  }

  private loadSidebarState(): boolean {
    
    if (typeof window !== 'undefined' && window.innerWidth < 576) {
      return true;
    }
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

