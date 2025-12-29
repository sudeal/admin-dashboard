import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

import { OrderListsService } from "../order-lists/order-lists.service";
import { OrderRow } from "../order-lists/order.model";
import { ProductStockService } from "../product-stock/product-stock.service";
import { ProductStockItem } from "../product-stock/product-stock.model";

type OrderItemView = {
  productId: string;
  name: string;
  imageUrl: string;
  category: string;
  unitPrice: number;
  qty: number;
  lineTotal: number;
};

@Component({
  selector: "app-order-details-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./order-details.page.html",
  styleUrl: "./order-details.page.css",
})
export class OrderDetailsPage implements OnInit {
  order$!: Observable<OrderRow | undefined>;
  items$!: Observable<OrderItemView[]>;

  shipping = 25;
  taxRate = 0.08;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderListsService,
    private productService: ProductStockService
  ) {}

  ngOnInit() {
    this.order$ = this.route.paramMap.pipe(
      switchMap((p) => this.orderService.getOrderById(p.get("id") || ""))
    );

    this.items$ = this.order$.pipe(
      switchMap(async (order) => {
        if (!order) return [];

        const products = await this.productService.getProducts().toPromise();
        const list = products ?? [];

        return order.items
          .map((it) => {
            const p = list.find((x: ProductStockItem) => x.id === it.productId);
            if (!p) return null;

            const unitPrice = p.price;
            const lineTotal = unitPrice * it.qty;

            return {
              productId: it.productId,
              name: p.name,
              imageUrl: p.imageUrl,
              category: p.category,
              unitPrice,
              qty: it.qty,
              lineTotal,
            } as OrderItemView;
          })
          .filter(Boolean) as OrderItemView[];
      })
    );
  }

  money(v: number) {
    return `$${v.toLocaleString()}`;
  }

  subtotal(items: OrderItemView[]) {
    return items.reduce((s, i) => s + i.lineTotal, 0);
  }

  taxAmount(subtotal: number) {
    return Math.round(subtotal * this.taxRate);
  }

  total(subtotal: number) {
    return subtotal + this.shipping + this.taxAmount(subtotal);
  }

  onPrint() {
    window.print();
  }
}
