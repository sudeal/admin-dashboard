import { Component, Input, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router"; // ✅ EKLENDİ

type MenuKey =
  | "dashboard"
  | "products"
  | "favorites"
  | "inbox"
  | "order-lists"
  | "product-stock";

type MenuItem = {
  key: MenuKey;
  label: string;
  icon: string;   // bootstrap icon class
  route: string;  // ✅ EKLENDİ
};

@Component({
  selector: "app-admin-sidebar",
  standalone: true,
  templateUrl: "./admin-sidebar.component.html",
  styleUrl: "./admin-sidebar.component.css",
  imports: [CommonModule, RouterModule], // ✅ RouterModule EKLENDİ
})
export class AdminSidebarComponent {
  @Input() collapsed = false;

  @HostBinding("class.is-collapsed")
  get isCollapsed() {
    return this.collapsed;
  }

  // Artık activeKey’e gerek kalmıyor (routerLinkActive ile otomatik)
  // Ama istersen başka amaçla kalsın diye bırakıyorum:
  activeKey: MenuKey = "dashboard";

  menu: MenuItem[] = [
    { key: "dashboard", label: "Dashboard", icon: "bi-speedometer", route: "/" },
    { key: "products", label: "Products", icon: "bi-grid", route: "/products" },

    // Şimdilik route'ları placeholder bırakıyorum; ileride sayfaları açınca güncellersin:
    { key: "favorites", label: "Favorites", icon: "bi-heart", route: "/favorites" },
    { key: "inbox", label: "Inbox", icon: "bi-chat-left", route: "/inbox" },
    { key: "order-lists", label: "Order Lists", icon: "bi-list-check", route: "/order-lists" },
    { key: "product-stock", label: "Product Stock", icon: "bi-file-earmark-text", route: "/product-stock" },
  ];

  // Eski setActive fonksiyonunu istersen silebilirsin.
  // Eğer tıklayınca başka bir şey yapmak istersen kalsın:
  setActive(key: MenuKey) {
    this.activeKey = key;
  }
}
