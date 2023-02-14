import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
    {
        path: '',
        component: FeaturesComponent,
        children: [
          { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {})
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
