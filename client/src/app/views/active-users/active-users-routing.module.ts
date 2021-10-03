import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UccComponent } from "./ucc/ucc.component";
import { AlertsComponent } from "./alerts/alerts.component";

const routes: Routes = [
  // {path:'' , component:UccComponent}
  { path: "haha", data: { title: "Click me" } },
  
  {
    path: "",
    data: {
      title: "Users",
    },
    children: [
      {
        path: "",
        redirectTo: "ausers",
      },
      {
        path: "ausers",
        component: UccComponent,
        data: {
          title: "Active Users",
        },
      },

      {
        path: "err",
        component: AlertsComponent,
        data: {
          title: "Alerts",
        },
      },
      {
        path: ":err",
        component: UccComponent,
        data: {
          title: "Alerts",
        },
      },
    ],
  },
  { path: "err/:mail", component: UccComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveUsersRoutingModule {}
