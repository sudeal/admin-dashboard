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
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login' },

  { path: 'login', component: LoginPage, title: 'Login' },
  { path: 'signup', component: SignupPage, title: 'Create Account' },

  { path: 'dashboard', component: DashboardPage, title: 'Admin Dashboard' },
  { path: 'products', component: ProductsPage, title: 'Products' },
  { path: 'product-stock', component: ProductStockPage, title: 'Product Stock' },
  { path: 'order-lists', component: OrderListsPage, title: 'Order Lists' },

  { path: 'order-details', redirectTo: '/order-lists', pathMatch: 'full', title: 'Order Lists' },
  { path: 'order-details/:id', component: OrderDetailsPage, title: 'Order Details' },

  { path: 'todo-list', component: TodoListPage, title: 'To Do List' },

  { path: 'inbox', component: InboxPage, title: 'Inbox' },
  { path: 'favorites', component: FavoritesPage, title: 'Favorites' },

  { path: '404notfound', component: NotFoundPage, title: 'Not Found' },

  { path: '**', component: NotFoundPage, title: 'Not Found' },
];
