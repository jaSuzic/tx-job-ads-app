import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListJobAdsComponent } from './components/list-job-ads/list-job-ads.component';
import { CreateJobAdComponent } from './components/create-job-ad/create-job-ad.component';
import { EditJobAdComponent } from './components/edit-job-ad/edit-job-ad.component';
import { idCheckGuard } from './id-check.guard';

const routes: Routes = [
    { path: 'list-ads', component: ListJobAdsComponent },
    { path: 'create-ad', component: CreateJobAdComponent },
    { path: 'edit-ad/:id', canActivate: [idCheckGuard], component: EditJobAdComponent },
    { path: '**', redirectTo: 'list-ads' },
    { path: '', redirectTo: 'list-ads', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
