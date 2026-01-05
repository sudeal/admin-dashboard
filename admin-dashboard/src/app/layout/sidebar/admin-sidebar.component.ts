import { Component, Input, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

type MenuKey =
  | "dashboard"
  | "products"
  | "favorites"
  | "inbox"
  | "order-lists"
  | "product-stock"
  | "order-details"
  | "todo-list"
  | "pricing"
  | "contact";

type MenuItem = {
  key: MenuKey;
  labelKey: string;  // Translation key
  icon: string;   // bootstrap icon class
  route: string;
};

@Component({
  selector: "app-admin-sidebar",
  standalone: true,
  templateUrl: "./admin-sidebar.component.html",
  styleUrl: "./admin-sidebar.component.css",
  imports: [CommonModule, RouterModule, TranslateModule],
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

  mainMenu: MenuItem[] = [
    { key: "dashboard", labelKey: "sidebar.dashboard", icon: "bi-speedometer", route: "/dashboard" },
    { key: "products", labelKey: "sidebar.products", icon: "bi-grid", route: "/products" },
    { key: "favorites", labelKey: "sidebar.favorites", icon: "bi-heart", route: "/favorites" },
    { key: "inbox", labelKey: "sidebar.inbox", icon: "bi-chat-left", route: "/inbox" },
    { key: "order-lists", labelKey: "sidebar.orderLists", icon: "bi-list-check", route: "/order-lists" },
    { key: "product-stock", labelKey: "sidebar.productStock", icon: "bi-file-earmark-text", route: "/product-stock" },
  ];

  pagesMenu: MenuItem[] = [
    { key: "todo-list", labelKey: "sidebar.todoList", icon: "bi-clipboard-check", route: "/todo-list" },
    { key: "contact", labelKey: "sidebar.contact", icon: "bi-people", route: "/contact" },
    { key: "pricing", labelKey: "sidebar.pricing", icon: "bi-gift", route: "/pricing" },
  ];

  // Eski setActive fonksiyonunu istersen silebilirsin.
  // Eğer tıklayınca başka bir şey yapmak istersen kalsın:
  setActive(key: MenuKey) {
    this.activeKey = key;
  }
}
