import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { ChecklistState } from './store/checklist-item.state';
import { ValidationMessagePipe } from './pipe/validation-message.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ValidationMessagePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ChecklistState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
