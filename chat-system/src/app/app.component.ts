import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'chat';
  element = true;

  constructor(router: Router){
  }
  hide(){
    return (this.element = false, console.log('false'));
  }
 /* loggedin(){
    if()
  }*/
}