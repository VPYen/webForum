import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent} from './home/home.component';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PermissionsPageComponent } from './permissions-page/permissions-page.component';
import { RestrictedAccessPageComponent } from './restricted-access-page/restricted-access-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "forum", component: ForumPageComponent},                // Remember to add forum title into url routing
  { path: "thread", component: ThreadPageComponent},              // Remember to add forum title into url routing
  { path: "restricted", component: RestrictedAccessPageComponent},
  { path: "privileges", component: PermissionsPageComponent},
  { path: "**", component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }