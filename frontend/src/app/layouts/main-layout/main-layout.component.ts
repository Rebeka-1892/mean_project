import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';
import {LoginService} from '../../services/login.service';
import {MenuService} from '../../services/menu.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './main-layout.component.html',
  standalone: true,
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent extends BaseComponent implements OnInit {
  menus: any[] = [];
  constructor(private loginService: LoginService, private menuService: MenuService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(data =>  this.menus = data);
  }

  logout(): void {
    this.loginService.logout().subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
