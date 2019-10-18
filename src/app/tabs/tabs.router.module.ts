import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

function getDay() : string {
  var days = ['Luni', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Luni'];
  var d = new Date();
  return days[d.getDay()];
}

const routes: Routes = [
  {
    path: 'day',
    component: TabsPage,
    children: [
      {
        path: 'Luni',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ],
      },
      {
        path: 'Marti',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: 'Miercuri',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: 'Joi',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: 'Vineri',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      { path: "", redirectTo: getDay(), pathMatch: 'full' }
    ]
  },
  { path: "", redirectTo: 'day', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
