import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditJobAdComponent } from './components/edit-job-ad/edit-job-ad.component';
import { CreateJobAdComponent } from './components/create-job-ad/create-job-ad.component';
import { ListJobAdsComponent } from './components/list-job-ads/list-job-ads.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ItemJobAdComponent } from './components/item-job-ad/item-job-ad.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        EditJobAdComponent,
        CreateJobAdComponent,
        ListJobAdsComponent,
        ItemJobAdComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
