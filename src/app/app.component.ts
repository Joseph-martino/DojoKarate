import { Component } from '@angular/core';
import { HeaderInformations } from './models/HeaderInformations';
import { DisplayHeaderService } from './services/display-header.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DojoKarate';

  currentHeaderInformations!: HeaderInformations|undefined;

  constructor(private displayHeaderService: DisplayHeaderService, private router: Router){
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const currentRoute = (event as NavigationEnd).url;
      this.currentHeaderInformations = displayHeaderService.getHeaderInformationsByPath(currentRoute);
      });
  }
}
