import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ import this
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,          // ✅ add this line
    HttpClientModule      // ✅ if not already added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
