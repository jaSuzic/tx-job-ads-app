import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IJobAd } from 'src/app/models';
import { AdsService } from 'src/app/services/ads.service';
import { COMMA, ENTER, SEMICOLON } from '@angular/cdk/keycodes';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-edit-job-ad',
    templateUrl: './edit-job-ad.component.html',
    styleUrls: ['./edit-job-ad.component.scss']
})
export class EditJobAdComponent implements OnInit {
    #route = inject(ActivatedRoute);
    #adsService = inject(AdsService);
    #router = inject(Router);
    @ViewChild('editForm') form: HTMLFormElement;

    adId: string | null;
    ad: IJobAd;
    queryParams: Object;

    readonly separatorKeysCodes = [ENTER, COMMA, SEMICOLON] as const;

    ngOnInit(): void {
        this.#route.paramMap.pipe(take(1)).subscribe(
            params => {
                this.adId = params.get('id');
                if (!this.adId) this.goBack();
                if (this.adId) {
                    this.#adsService.getAd(this.adId).pipe(take(1)).subscribe({
                        next: ad => {
                            this.ad = ad;
                            if (!this.ad) this.goBack();
                        },
                        error: err => { this.goBack(); }
                    }
                    );

                }
            }
        );

        this.#route.queryParams.pipe(take(1)).subscribe(params => this.queryParams = params);
    }

    remove(skill: string): void {
        const index = this.ad.skills.indexOf(skill);
        if (index >= 0) {
            this.ad.skills.splice(index, 1);
        }
    }

    edit(skill: string, event: MatChipEditedEvent) {
        const value = event.value.trim();

        const index = this.ad.skills.indexOf(skill);
        if (index >= 0) {
            this.ad.skills[index] = value;
        }
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.ad.skills.push(value);
        }
        event.chipInput!.clear();
    }

    changeStatus(event: MatSlideToggleChange) {
        this.ad.status = event.checked ? 'published' : 'draft';
    }

    goBack() {
        this.#router.navigate(['/'], { queryParams: this.queryParams });
    }

    saveEditedAd() {
        this.#adsService.updateAd(this.ad).subscribe({
            next: () => {
                this.goBack();
            },
            error: () => { 
                //display some error
            }
        });

    }

}
