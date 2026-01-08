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
import { PricingPage } from './pages/pricing/pricing.page';
import { ChartsPage } from './pages/charts/charts.page';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ContactPage } from './pages/contact/contact.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPage, title: 'Login' },
      { path: 'signup', component: SignupPage, title: 'Create Account' },
      { path: '404notfound', component: NotFoundPage, title: 'Not Found' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardPage, title: 'Admin Dashboard' },
      { path: 'products', component: ProductsPage, title: 'Products' },
      { path: 'product-stock', component: ProductStockPage, title: 'Product Stock' },
      { path: 'order-lists', component: OrderListsPage, title: 'Order Lists' },
      { path: 'order-details', redirectTo: '/order-lists', pathMatch: 'full' },
      { path: 'order-details/:id', component: OrderDetailsPage, title: 'Order Details' },
      { path: 'todo-list', component: TodoListPage, title: 'To Do List' },
      { path: 'pricing', component: PricingPage, title: 'Pricing' },
      { path: 'charts', component: ChartsPage, title: 'Charts' },
      { path: 'calendar', component: CalendarPage, title: 'Calendar' },
      { path: 'contact', component: ContactPage, title: 'Contact' },
      { path: 'inbox', component: InboxPage, title: 'Inbox' },
      { path: 'favorites', component: FavoritesPage, title: 'Favorites' },
    ],
  },
  { path: '**', redirectTo: '404notfound' },
];
