import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AddOrderPage } from '../add-order/add-order';
import { SettingsPage } from '../settings/settings';
import { CustomerListPage } from '../customer-list/customer-list';
import { SelectCustomerPage } from '../select-customer/select-customer';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SelectCustomerPage;
  tab3Root = SettingsPage;
  tab4Root = CustomerListPage;

  constructor() {

  }
}
