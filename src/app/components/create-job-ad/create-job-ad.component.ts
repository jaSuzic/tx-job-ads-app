import { COMMA, ENTER, SEMICOLON } from '@angular/cdk/keycodes';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { JobAdStatus } from 'src/app/models';
import { AdsService } from 'src/app/services/ads.service';

@Component({
    selector: 'app-create-job-ad',
    templateUrl: './create-job-ad.component.html',
    styleUrls: ['./create-job-ad.component.scss']
})
export class CreateJobAdComponent implements OnInit {

    #adsService = inject(AdsService);
    #router = inject(Router);

    readonly separatorKeysCodes = [ENTER, COMMA, SEMICOLON] as const;
    newAdForm: FormGroup;
    skills: Array<string> = [];
    status: JobAdStatus;

    ngOnInit(): void {
        this.createForm();
    }

    remove(skill: string): void {
        const index = this.skills.indexOf(skill);
        if (index >= 0) {
            this.skills.splice(index, 1);
        }
    }

    edit(skill: string, event: MatChipEditedEvent) {
        const value = event.value.trim();
        const index = this.skills.indexOf(skill);
        if (index >= 0) {
            this.skills[index] = value;
        }
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.skills.push(value);
        }
        event.chipInput!.clear();
    }

    defineStatus() {
        this.status = this.newAdForm.get('status')?.value ? 'published' : 'draft';
    }

    resetForm() {
        this.newAdForm.reset();
        this.skills = [];
    }

    saveAd() {
        this.defineStatus();
        this.#adsService.insertAd({
            ...this.newAdForm.value,
            status: this.status,
            skills: this.newAdForm.controls['skills'].value || []
        }).subscribe({
            next: () => {
                this.resetForm();
            },
            error: () => { }
        });
    }

    createForm() {
        this.newAdForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl(''),
            skills: new FormControl(''),
            status: new FormControl('')
        });
    }

    goBack() {
        this.#router.navigate(['..']);
    }
}
