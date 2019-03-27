import { Component } from '@angular/core';
import { FaIconService } from '@fortawesome/angular-fontawesome';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasktracker-portal';

  constructor (
    private faIconService: FaIconService
  ) {
    this.faIconService.defaultPrefix = 'fas';
    setTheme('bs4');
  }
}
