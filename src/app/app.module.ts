import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './shared/store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';

import { environment } from './../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { FontModule } from './core/font/font.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AuthInterceptor } from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { LayoutComponent } from './core/layout/layout.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { StudentsComponent } from './students/students.component';
import { EmployeesComponent } from './employees/employees.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserItemComponent } from './users/user-list/user-item/user-item.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentItemComponent } from './students/student-list/student-item/student-item.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { FullNamePipe } from './common/pipes/full-name.pipe';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeItemComponent } from './employees/employee-list/employee-item/employee-item.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { CardActionsComponent } from './shared/components/card-actions/card-actions.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LogsComponent } from './logs/logs.component';
import { LogItemComponent } from './logs/log-list/log-item/log-item.component';
import { LogListComponent } from './logs/log-list/log-list.component';
import { LogFormComponent } from './logs/log-form/log-form.component';

import { DropdownDirective } from './shared/directives/dropdown.directive';
import { DropdownToggleDirective } from './shared/directives/dropdown-toggle.directive';
import { DropdownMenuDirective } from './shared/directives/dropdown-menu.directive';
import { DropdownMenuItemDirective } from './shared/directives/dropdown-menu-item.directive';
import { DropdownInputDirective } from './shared/directives/dropdown-input.directive';
import { DropdownTextDirective } from './shared/directives/dropdown-text.directive';
import { VisibleDirective } from './shared/directives/visible.directive';

import { UserInviteComponent } from './users/user-invite/user-invite.component';
import { NotesComponent } from './shared/components/notes/notes.component';
import { StickyNoteComponent } from './shared/components/sticky-note/sticky-note.component';
import { ExamComponent } from './exam/exam.component';
import { AppErrorMessageDirective } from './shared/directives/app-error-message.directive';
import { ExamLogListComponent } from './exam/exam-log-list/exam-log-list.component';
import { ExamLogItemComponent } from './exam/exam-log-list/exam-log-item/exam-log-item.component';

@NgModule({
  declarations: [
    FullNamePipe,
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    AuthLayoutComponent,
    SigninComponent,
    DashboardComponent,
    UsersComponent,
    UserListComponent,
    UserItemComponent,
    StudentsComponent,
    StudentListComponent,
    StudentItemComponent,
    StudentFormComponent,
    EmployeesComponent,
    EmployeeListComponent,
    EmployeeItemComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ToolbarComponent,
    CardActionsComponent,
    UserFormComponent,
    LogsComponent,
    LogItemComponent,
    LogListComponent,
    LogFormComponent,
    DropdownDirective,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownMenuItemDirective,
    DropdownInputDirective,
    DropdownTextDirective,
    UserInviteComponent,
    NotesComponent,
    StickyNoteComponent,
    ExamComponent,
    AppErrorMessageDirective,
    ExamLogListComponent,
    ExamLogItemComponent,
    VisibleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    FontAwesomeModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AutosizeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
