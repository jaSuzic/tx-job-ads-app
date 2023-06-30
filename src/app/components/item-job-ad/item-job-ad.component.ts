import { Component, Input, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJobAd } from 'src/app/models';
import { AdsService } from 'src/app/services/ads.service';

@Component({
    selector: 'app-item-job-ad',
    templateUrl: './item-job-ad.component.html',
    styleUrls: ['./item-job-ad.component.scss']
})
export class ItemJobAdComponent implements OnInit {
    @Input() jobAd: IJobAd;

    #adsService = inject(AdsService);
    #route = inject(ActivatedRoute);
    skills: Array<string>;
    queryMap: Object;

    ngOnInit(): void {
        this.#route.queryParams.subscribe((paramMap) => this.queryMap = paramMap);
    }

    changeStatus(status: string) {
        this.#adsService.changeAdStatus(this.jobAd.id, status).subscribe({
            next: () => { },
            error: () => { }
        });
    }

}
