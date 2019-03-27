import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { EmployeesComponent } from './employees/employees.component';
import { UsersComponent } from './users/users.component';
import { UserInviteComponent } from './users/user-invite/user-invite.component';
import { LogsComponent } from './logs/logs.component';
import { LogFormComponent } from './logs/log-form/log-form.component';
import { ExamComponent } from './exam/exam.component';

const routes: Routes = [
  { path: 'auth', component: AuthLayoutComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'resetpassword/:code', component: ResetPasswordComponent }
    ]
  },
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuard] },
  { path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'students', component: StudentsComponent, canActivate: [AuthGuard],
        children: [
          { path: 'new', component: StudentFormComponent },
          { path: ':id/edit', component: StudentFormComponent }
        ] },
      { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard],
        children: [
          { path: 'invite', component: UserInviteComponent }
        ]
      },
      { path: 'logs', component: LogsComponent, canActivate: [AuthGuard],
        children: [
          { path: 'new', component: LogFormComponent },
          { path: ':id/:edit', component: LogFormComponent }
        ]
      }
    ]
  }
  // { path: 'login', component: LoginLayoutComponent,
  //   children: [
  //     { path: '', component: LoginComponent },
  //     { path: 'password/forget', component: ForgotPasswordComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
