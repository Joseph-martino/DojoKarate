import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { KarateComponent } from './components/karate/karate.component';
import { BoxingComponent } from './components/boxing/boxing.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path:"", component: HomepageComponent },
  { path: "karate", component: KarateComponent},
  { path: "boxe", component: BoxingComponent },
  { path: "actualites", component: NewsComponent },
  { path: "contact", component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
