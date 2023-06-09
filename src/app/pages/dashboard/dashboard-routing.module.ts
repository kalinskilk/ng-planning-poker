import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/pages/home/home.module').then((m) => m.HomeModule),
      },

      {
        path: 'planning/:id',
        loadChildren: () =>
          import('src/app/pages/planning/planning.module').then(
            (m) => m.PlanningModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class DashBoardRoutingModule {}
