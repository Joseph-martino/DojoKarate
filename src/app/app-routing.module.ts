import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { KarateComponent } from './components/karate/karate.component';
import { BoxingComponent } from './components/boxing/boxing.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { SingleNewsComponent } from './components/single-news/single-news.component';
import { UpdateNewsComponent } from './components/update-news/update-news.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path:"", component: HomepageComponent },
  { path: "karate", component: KarateComponent},
  { path: "boxe", component: BoxingComponent },
  { path: "actualites", component: NewsComponent },
  { path: "contact", component: ContactComponent},
  { path: "creer", component: AddNewsComponent },
  { path: "update/:id", component: UpdateNewsComponent },
  { path: "actualites/:id", component: SingleNewsComponent },
  { path: "404-error", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/404-error"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
