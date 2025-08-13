import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import loader from '@ibsheet/loader';

loader.load({
  name: 'ibsheet',
  baseUrl: 'https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/ibsheet',
  locales: ['ko'],
  // plugins: ['excel', 'common', 'dialog']
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class App {}