import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlane, faShieldHalved, faBus, faTv } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface MenuItem {
  title: string;
  route?: string;
  icon?: IconDefinition;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  isCollapsed = false;

  activeRoute = '';

  @Output() menuClick = new EventEmitter<MenuItem>();

  menuItems: MenuItem[] = [
    { title: '인천국제공항공사_국가별 항공 통계 서비스', route: 'pages/flight', icon: faPlane },
    { title: '행정안전부_민방위대피시설', route: 'pages/civil', icon: faShieldHalved },
    { title: '서울시_정류장 운행 통계', route: 'pages/bus', icon: faBus },
    { title: '넷플릭스_국가별 최고 인기 작품 (영화, TV)', route: 'pages/netflix', icon: faTv },
  ];

  navigate(sub: { title: string; route?: string }) {
    this.activeRoute = sub.route ?? '';
    this.menuClick.emit(sub);
  }
}
