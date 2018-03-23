import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgDragDropModule } from 'ng-drag-drop';

// Services
import { UserService } from './services/user.service';
import { FileDropDirective } from './services/file-drop.directive';

// Component
import { AppComponent } from './app.component';
import { UploadFormComponent } from './services/upload-form/upload-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgDragDropModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
