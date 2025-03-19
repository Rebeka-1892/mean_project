import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ]
})
export class AppModule { }
