import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private router: Router){

  }


  onGoToHomePage(){
    this.router.navigateByUrl("/");
  }

  onGoToKaratePage(){
    this.router.navigateByUrl("karate");
  }

  onGoToBoxingPage(){
    this.router.navigateByUrl("boxe");
  }

  onGoToNewsPage(){
    this.router.navigateByUrl("actualites");
  }

  onGoToContactPage(){
    this.router.navigateByUrl("contact");
  }

}


