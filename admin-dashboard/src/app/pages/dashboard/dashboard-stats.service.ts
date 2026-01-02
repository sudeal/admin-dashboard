import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map, switchMap } from "rxjs/operators";
import { StatCard } from "../../shared/models/stat-card.model";
import { SalesDetail } from "./sales-detail.model";
import { OrderListsService } from "../order-lists/order-lists.service";
import { ProductStockService } from "../product-stock/product-stock.service";

@Injectable({ providedIn: "root" })
export class DashboardStatsService {
  constructor(
    private orderService: OrderListsService,
    private productService: ProductStockService
  ) {}

  getStats(): Observable<StatCard[]> {
    return of<StatCard[]>([
      {
        titleKey: "stats.totalUser",
        value: "40,689",
        descriptionKey: "stats.upFromYesterday",
        trend: "up",
        icon: "bi-people",
        tone: "purple",
      },
      {
        titleKey: "stats.totalOrder",
        value: "10293",
        descriptionKey: "stats.upFromPastWeek",
        trend: "up",
        icon: "bi-box-seam",
        tone: "yellow",
      },
      {
        titleKey: "stats.totalSales",
        value: "$89,000",
        descriptionKey: "stats.downFromYesterday",
        trend: "down",
        icon: "bi-graph-up",
        tone: "green",
      },
      {
        titleKey: "stats.totalPending",
        value: "2040",
        descriptionKey: "stats.upFromYesterday2",
        trend: "up",
        icon: "bi-clock",
        tone: "orange",
      },
    ]).pipe(delay(400));
  }

  getSalesDetails(): Observable<SalesDetail[]> {
    return this.orderService.getOrders().pipe(
      switchMap((orders) => {
        return this.productService.getProducts().pipe(
          map((products) => {
            const salesDetails: SalesDetail[] = [];
            
            orders.forEach((order) => {
              order.items.forEach((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (product) {
                  salesDetails.push({
                    orderId: order.id,
                    customerName: order.name,
                    productName: product.name,
                    quantity: item.qty,
                    unitPrice: product.price,
                    total: product.price * item.qty,
                    date: order.date,
                    status: order.status,
                    payment: order.payment,
                  });
                }
              });
            });

            return salesDetails.slice(0, 10); // İlk 10 satış detayını göster
          })
        );
      }),
      delay(400)
    );
  }
}
