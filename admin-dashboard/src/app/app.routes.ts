import { Routes } from '@angular/router';

import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ProductsPage } from './pages/products/products.page';
import { ProductStockPage } from './pages/product-stock/product-stock.page';
import { OrderListsPage } from './pages/order-lists/order-lists.page';


export const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'products', component: ProductsPage },
  { path: 'product-stock', component: ProductStockPage },
  { path: 'order-lists', component: OrderListsPage },
];   
