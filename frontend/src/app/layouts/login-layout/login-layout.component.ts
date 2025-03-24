import {Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-layout.component.html',
  imports: [
    FormsModule
  ],
  standalone: true,
  styleUrl: './login-layout.component.css'
})

export class LoginComponent {
  utilisateur: any = {};

  constructor(private loginService: LoginService) { }

  login(): void {
    this.loginService.login(this.utilisateur).subscribe(data => {
      console.log(data);
    });
  }
}
