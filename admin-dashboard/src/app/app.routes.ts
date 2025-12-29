import { Routes } from '@angular/router';

import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ProductsPage } from './pages/products/products.page';
import { ProductStockPage } from './pages/product-stock/product-stock.page';
import { OrderListsPage } from './pages/order-lists/order-lists.page';
import { OrderDetailsPage } from './pages/order-details/order-details.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { InboxPage } from './pages/inbox/inbox.page';
import { FavoritesPage } from './pages/favorites/favorites.page';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  
  { path: 'login', component: LoginPage }, 
  { path: 'dashboard', component: DashboardPage },
  { path: 'products', component: ProductsPage },
  { path: 'product-stock', component: ProductStockPage },
  { path: 'order-lists', component: OrderListsPage },
  { path: 'order-details', redirectTo: '/order-lists', pathMatch: 'full' },
  { path: 'order-details/:id', component: OrderDetailsPage },
  { path: 'signup', component: SignupPage },
  { path: 'inbox', component: InboxPage },
  { path: 'favorites', component: FavoritesPage },

  { path: '**', redirectTo: 'login' },
];   
