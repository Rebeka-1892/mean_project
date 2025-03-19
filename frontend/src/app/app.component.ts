import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent
  title = 'frontend';
  isLoading;

  constructor(private loadingService: LoadingService) {
    this.isLoading = this.loadingService.loading;
  }
}
