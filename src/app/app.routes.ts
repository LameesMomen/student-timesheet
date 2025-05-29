import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent : ()=> import('./pages/student-timesheet/student-timesheet.component').then(m=> m.StudentTimesheetComponent)
    },
    {
        path :'**',
        redirectTo : ''
    }
];
