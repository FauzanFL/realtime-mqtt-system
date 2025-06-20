import { Routes } from '@angular/router';
import { SmartHome } from './smart-home/smart-home';
import { Fleet } from './fleet/fleet';
import { Factory } from './factory/factory';

export const routes: Routes = [
    {
        path: "smarthome",
        component: SmartHome
    },
    {
        path: "fleet",
        component: Fleet
    },
    {
        path: "factory",
        component: Factory
    },
    {
        path: "",
        redirectTo: "smarthome",
        pathMatch: 'full'
    },
    {
        path: "**",
        redirectTo: "smarthome"
    }
];
