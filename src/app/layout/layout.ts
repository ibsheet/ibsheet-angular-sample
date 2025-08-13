import { Component, Type, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Sidebar } from './sidebar/sidebar';

import { routes } from '../app.routes';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Sidebar, NgFor, NgIf, RouterModule, CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  private router = inject(Router);

  tabs: { title: string; route: string; component: Type<any>; }[] = [];
  activeRoute: string | null = null;

  buildComponentMap(): Record<string, any> {
    const routeTree = routes.find(r => r.path === '' && r.children);
    const map: Record<string, any> = {};

    if (routeTree?.children) {
      for (const route of routeTree.children) {
        if (route.component && typeof route.path === 'string') {
          map[route.path] = route.component;
        }
      }
    }

    return map;
  }

  // 라우트 문자열과 컴포넌트 매핑
  componentMap: Record<string, any> = this.buildComponentMap();

  onMenuClick(item: { title: string; route?: string }) {
    if (!item.route) return;

    const component = this.componentMap[item.route];

    const existingTab = this.tabs.find(tab => tab.route === item.route);
    if (!existingTab && component) {
      this.tabs.push({
        title: item.title,
        route: item.route,
        component,
      });
    }

    this.activeRoute = item.route;
  }

  selectTab(tab: { title: string; route: string; component: Type<any> }) {
    this.activeRoute = tab.route;
  }

  closeTab(tab: { title: string; route: string }) {
    this.tabs = this.tabs.filter(t => t.route !== tab.route);

    if (this.activeRoute === tab.route) {
      if (this.tabs.length > 0) {
        this.selectTab(this.tabs[this.tabs.length - 1]);
      } else {
        this.activeRoute = null;
        this.router.navigateByUrl('/');
      }
    }
  }

}
