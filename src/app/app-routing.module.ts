import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RegisterComponent } from './account/register/register.component';
import { LogInComponent } from './account/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateAppointmentComponent } from './users-functionalities/appointments/create-appointment/create-appointment.component';
import { GetAllCustomerAppointmentsComponent } from './users-functionalities/appointments/get-all-customer-appointments/get-all-customer-appointments.component';
import { CreateHairServiceComponent } from './users-functionalities/hair-services/create-hair-service/create-hair-service.component';
import { GetAllHairServicesComponent } from './users-functionalities/hair-services/get-all-hair-services/get-all-hair-services.component';
import { UpdateHairServiceComponent } from './users-functionalities/hair-services/update-hair-service/update-hair-service.component';
import { GetAllAppointmentsComponent } from './users-functionalities/appointments/get-all-appointments/get-all-appointments.component';
import { GetAllEmployeesComponent } from './users-functionalities/employees/get-all-employees/get-all-employees.component';
import { AddHairServiceComponent } from './users-functionalities/hair-services/add-hair-service/add-hair-service.component';
import { GetEmployeeHairServicesComponent } from './users-functionalities/hair-services/get-employee-hair-services/get-employee-hair-services.component';
import { GetAllEmployeeAppointmentsComponent } from './users-functionalities/appointments/get-all-employee-appointments/get-all-employee-appointments.component';
import { GetAllEmployeeWorkingIntervalsComponent } from './users-functionalities/working-intervals/get-all-employee-working-intervals/get-all-employee-working-intervals.component';
import { CreateWorkingIntervalComponent } from './users-functionalities/working-intervals/create-working-interval/create-working-interval.component';
import { ProfileComponent } from './profile/profile.component';
import { GetInWorkEmployeeAppointmentsComponent } from './users-functionalities/appointments/get-in-work-employee-appointments/get-in-work-employee-appointments.component';
import { GetInWorkCustomerAppointmentsComponent } from './users-functionalities/appointments/get-in-work-customer-appointments/get-in-work-customer-appointments.component';
import { GetFinishedEmployeeAppointmentsComponent } from './users-functionalities/appointments/get-finished-employee-appointments/get-finished-employee-appointments.component';
import { GetFinishedCustomerAppointmentsComponent } from './users-functionalities/appointments/get-finished-customer-appointments/get-finished-customer-appointments.component';
import { ReviewAppointmentComponent } from './users-functionalities/appointments/review-appointment/review-appointment.component';

const routes: Routes = [
  // When add path here => go and add it in routingComponents too.
  
  {path: '', component: HomeComponent, children: [
    {path: 'register', component: RegisterComponent},
    {path: 'log-in', component: LogInComponent},
  ]},

  {path: 'profile', component: ProfileComponent, children: [
    {path: 'admin', children: [
      {path: 'hair-service', component: CreateHairServiceComponent},
      {path: 'hair-service/all', component: GetAllHairServicesComponent},
      {path: 'hair-service/update/:id', component: UpdateHairServiceComponent},
      {path: 'appointment/all', component: GetAllAppointmentsComponent},
      {path: 'employee/all', component: GetAllEmployeesComponent},
    ]},

    {path: 'employee', children: [
      {path: 'hair-service', component: AddHairServiceComponent},
      {path: 'hair-service/all', component: GetEmployeeHairServicesComponent},
      {path: 'appointment', children: [
        {path: 'all', component: GetAllEmployeeAppointmentsComponent},
        {path: 'finished', component: GetFinishedEmployeeAppointmentsComponent},
        {path: 'in-work', component: GetInWorkEmployeeAppointmentsComponent},
      ]},
      {path: 'working-interval', component: CreateWorkingIntervalComponent},
      {path: 'working-interval/all', component: GetAllEmployeeWorkingIntervalsComponent},
    ]},

    {path: 'customer', children: [
      {path: 'appointment', component: CreateAppointmentComponent},
      {path: 'appointment', children: [
        {path: 'all', component: GetAllCustomerAppointmentsComponent},
        {path: 'finished', component: GetFinishedCustomerAppointmentsComponent},
        {path: 'in-work', component: GetInWorkCustomerAppointmentsComponent},
        {path: ':appointmentId/review', component: ReviewAppointmentComponent},
      ]},
    ]},

    {path: 'hair-service', component: GetAllHairServicesComponent}
  ]},
  
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  RegisterComponent,
  LogInComponent,

  ProfileComponent,

  CreateHairServiceComponent,
  GetAllHairServicesComponent,
  UpdateHairServiceComponent,
  GetAllAppointmentsComponent,
  GetAllEmployeesComponent,

  AddHairServiceComponent,
  GetEmployeeHairServicesComponent,
  GetAllEmployeeAppointmentsComponent,
  CreateWorkingIntervalComponent,
  GetAllEmployeeWorkingIntervalsComponent,
  GetFinishedEmployeeAppointmentsComponent,
  GetInWorkEmployeeAppointmentsComponent,

  CreateAppointmentComponent,
  GetAllCustomerAppointmentsComponent,
  GetFinishedCustomerAppointmentsComponent,
  GetInWorkCustomerAppointmentsComponent,
  ReviewAppointmentComponent,

  PageNotFoundComponent
]