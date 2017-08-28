import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AddOrderPage } from '../add-order/add-order';
import { SettingsPage } from '../settings/settings';
import { CompletedOrdersPage } from '../completed-orders/completed-orders';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddOrderPage;
  tab3Root = SettingsPage;
  tab4Root = CompletedOrdersPage;

  constructor() {

  }
}
