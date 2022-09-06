import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    ChatboxComponent,
    GroupListComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, LoginComponent, AccountComponent, GroupListComponent]
})
export class AppModule { }
