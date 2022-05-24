import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGrad } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { canDeactivateGuard } from "./servers/edit-server/can-deativate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { serverResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent} ,
  ]} ,
  {path: 'servers',
    // canActivate: [AuthGrad] ,
    canActivateChild: [AuthGrad],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent, resolve: {server: serverResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [canDeactivateGuard] }
  ]},
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'page not found!'}},
  // {path: '**', redirectTo: '/not-found',  pathMatch: 'full'}
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule{

}
