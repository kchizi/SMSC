import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "./shared/auth.guard";
import {LoginComponent} from "./login/login.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NgModule} from "@angular/core";

export const ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: NavigationComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                data: {
                    translationKey: 'DASHBOARDS',
                    showInNavigation: true,
                    icon: 'fa-tachometer'
                },
            },
            {

                path: 'customers',
                data: {
                    translationKey: 'CUSTOMERS',
                    showInNavigation: true,
                    icon: 'fa-users'
                },
                loadChildren: './customers/customers.module#CustomersModule'
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule'
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, {useHash: false})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
