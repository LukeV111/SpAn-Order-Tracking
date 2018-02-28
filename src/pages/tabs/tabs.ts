import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AddOrderPage } from '../add-order/add-order';
import { SettingsPage } from '../settings/settings';
import { CustomerListPage } from '../customer-list/customer-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddOrderPage;
  tab3Root = SettingsPage;
  tab4Root = CustomerListPage;

  constructor() {

  }
}
