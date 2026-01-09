import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
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
  imports: [CommonModule, RouterModule, TranslateModule],
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
    private productService: ProductStockService,
    private translate: TranslateService
  ) {}

  translateStatus(status: string): string {
    // Status'ü translation key formatına çevir (camelCase)
    // "On Hold" -> "onHold", "In Transit" -> "inTransit", "Completed" -> "completed"
    let statusKey = '';
    if (status === 'On Hold') {
      statusKey = 'onHold';
    } else if (status === 'In Transit') {
      statusKey = 'inTransit';
    } else {
      // Diğer status'ler için lowercase ve boşlukları kaldır
      statusKey = status.toLowerCase().replace(/\s+/g, '');
    }
    
    // Translation'ı al
    const translated = this.translate.instant(`orderDetails.statuses.${statusKey}`);
    
    // Eğer translation bulunamazsa orijinal status'ü döndür
    if (translated && translated !== `orderDetails.statuses.${statusKey}`) {
      return translated;
    }
    
    return status;
  }

  translatePayment(payment: string): string {
    const paymentKey = payment.toLowerCase();
    return this.translate.instant(`orderDetails.payments.${paymentKey}`) || payment;
  }

  translateCategory(category: string): string {
    // Kategori isimlerini translate key'lerine çevir
    const categoryMap: { [key: string]: string } = {
      'Digital Product': 'orderLists.orderTypes.digitalProduct',
      'Computer': 'orderLists.orderTypes.computer',
      'Fashion': 'orderLists.orderTypes.fashion',
      'Accessory': 'orderLists.orderTypes.accessory',
      'Mobile': 'orderLists.orderTypes.mobile'
    };
    
    const translateKey = categoryMap[category];
    if (translateKey) {
      return this.translate.instant(translateKey);
    }
    return category;
  }

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
