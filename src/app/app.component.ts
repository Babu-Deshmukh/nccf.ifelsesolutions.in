import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Carey Development CRM';

  //instantiating LogoutService at startup
  //yes I could also do this in the module with APP_INITIALIZER, but... why?
  constructor() { }    

}
