import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobAdsComponent } from './list-job-ads.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AdsService } from 'src/app/services/ads.service';
import { IJobAd } from 'src/app/models';
import { HttpResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('ListJobAdsComponent', () => {
    let component: ListJobAdsComponent;
    let fixture: ComponentFixture<ListJobAdsComponent>;
    let adsServiceSpy: jasmine.SpyObj<AdsService>;
    const mockData: Array<IJobAd> = [{
        "id": "1",
        "title": "Frontend developer",
        "description": "We are looking for medior to senior front-end developer. We are using React v17 and next.js v12. Experience in Next.js is not necessary but would be a plus. Work from the office is possible, but WFH is also ok. Contact us for information about benefits (there are lots of them) and any additional info via contact form at jobs.txservices.rs",
        "skills": [
            "frontend",
            "react",
            "next.js"
        ],
        "status": "archived"
    },
    {
        "id": "2",
        "title": "Angular developer",
        "description": "We are looking for senior front-end developer (Angular). We are using Angular v15. Experience in RxJs is required and with NgRx isn't necessary but would be a plus. Work from the office is possible, but WFH is also ok. Contact us for information about benefits (there are lots of them) and any additional info via contact form at jobs.txservices.rs",
        "skills": [
            "frontend",
            "angular",
            "rxjs",
            "typescript"
        ],
        "status": "published"
    },
    {
        "id": "3",
        "title": "Backend developer",
        "description": "We are looking for senior backend developer. We are using java v18. Work from the office is recommended at least for first 2 months and after that period switching to hybrid is possible. Contact us for information about benefits (there are lots of them) and any additional info via contact form at jobs.txservices.rs",
        "skills": [
            "java",
            "backend"
        ],
        "status": "published"
    }];

    beforeEach(() => {
        const spy = jasmine.createSpyObj('AdsService', ['getFilteredAds', 'changeAdStatus']);
        TestBed.configureTestingModule({
            declarations: [ListJobAdsComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule, FormsModule],
            providers: [provideAnimations(), { provide: AdsService, useValue: spy }]
        });
        fixture = TestBed.createComponent(ListJobAdsComponent);
        component = fixture.componentInstance;
        adsServiceSpy = TestBed.inject(AdsService) as jasmine.SpyObj<AdsService>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch data ono init', async () => {
        const response = new HttpResponse({ body: mockData });
        adsServiceSpy.getFilteredAds.and.returnValue(Promise.resolve(response));
        fixture.detectChanges();

        await fixture.whenStable();

        expect(component.adsList).toEqual(mockData);
        expect(adsServiceSpy.getFilteredAds).toHaveBeenCalled();
    });

    it('should contain pagination segment', () => {
        const pagination = fixture.debugElement.query(By.css('.pagination-wrapper'));
        expect(pagination).toBeTruthy();
    });
});

