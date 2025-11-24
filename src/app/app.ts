import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './shared/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'tu-app';
}
