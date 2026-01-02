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
  | "todo-list";

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

  menu: MenuItem[] = [
    { key: "dashboard", labelKey: "sidebar.dashboard", icon: "bi-speedometer", route: "/dashboard" },
    { key: "products", labelKey: "sidebar.products", icon: "bi-grid", route: "/products" },
    { key: "favorites", labelKey: "sidebar.favorites", icon: "bi-heart", route: "/favorites" },
    { key: "inbox", labelKey: "sidebar.inbox", icon: "bi-chat-left", route: "/inbox" },
    { key: "order-lists", labelKey: "sidebar.orderLists", icon: "bi-list-check", route: "/order-lists" },
    { key: "product-stock", labelKey: "sidebar.productStock", icon: "bi-file-earmark-text", route: "/product-stock" },
    { key: "order-details", labelKey: "sidebar.orderDetails", icon: "bi-file-text", route: "/order-details" },
    { key: "todo-list", labelKey: "sidebar.todoList", icon: "bi-check2-square", route: "/todo-list" },
  ];

  // Eski setActive fonksiyonunu istersen silebilirsin.
  // Eğer tıklayınca başka bir şey yapmak istersen kalsın:
  setActive(key: MenuKey) {
    this.activeKey = key;
  }
}
