import { Injectable } from '@angular/core';
import { HeaderInformations } from '../models/headerInformations';

@Injectable({
  providedIn: 'root'
})
export class DisplayHeaderService {

  private headerInformations: HeaderInformations[] = [

    {
      title: "Dojo Karate",
      description: "Lorem ipsum dolor sit amet consectetur. Feugiat aenean vitae eleifend rhoncus viverra lobortis varius.",
      banner: "assets/images/banners/homepage-banner.jpg",
      path: "/"
    }, 

    {
      title: "Karate",
      description: "Lorem ipsum dolor sit amet consectetur. Feugiat aenean vitae eleifend rhoncus viverra lobortis varius.",
      banner: "assets/images/banners/karate-banner.jpg",
      path: "/karate"
    }, 

    {
      title: "Boxe thaï",
      description: "Lorem ipsum dolor sit amet consectetur. Feugiat aenean vitae eleifend rhoncus viverra lobortis varius.",
      banner: "assets/images/banners/boxing-banner.jpg",
      path: "/boxe"
    }, 

    {
      title: "Actualités",
      description: "Lorem ipsum dolor sit amet consectetur. Feugiat aenean vitae eleifend rhoncus viverra lobortis varius.",
      banner: "assets/images/banners/news-banner.jpg",
      path: "/actualités"
    }, 

    {
      title: "Contact",
      description: "Lorem ipsum dolor sit amet consectetur. Feugiat aenean vitae eleifend rhoncus viverra lobortis varius.",
      banner: "assets/images/banners/contact-banner.png",
      path: "/contact"
    }
  ];
}
