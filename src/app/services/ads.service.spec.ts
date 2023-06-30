import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdsService } from './ads.service';
import { IJobAd } from '../models';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

describe('AdsService', () => {
    let service: AdsService;
    let httpMock: HttpTestingController;
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
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AdsService]
        });
        service = TestBed.inject(AdsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch ads from BE', () => {
        service.getAllAds().subscribe(ads => {
            expect(ads).toEqual(mockData);
        });

        const req = httpMock.expectOne('http://localhost:3000/ads');
        expect(req.request.method).toBe('GET');

        req.flush(mockData);
    });

    it('should fetch filtered ads from BE and have filters in url', () => {
        const publishedMockData = mockData.filter(item => item.status === 'published');
        service.getFilteredAds("1", "published").then(ads => {
            expect(ads.body?.length).toEqual(2);
        });

        const req = httpMock.expectOne('http://localhost:3000/ads?_page=1&status=published');
        expect(req.request.method).toBe('GET');

        req.flush(publishedMockData);
    });

    it('should fetch specific ad from BE', () => {
        const chosenAd: IJobAd = mockData.find(ad => ad.id = "1")!;
        service.getAd("1").subscribe(ads => {
            expect(ads).toEqual(chosenAd);
        });

        const req = httpMock.expectOne('http://localhost:3000/ads/1');
        expect(req.request.method).toBe('GET');

        req.flush(chosenAd);
    });

    it('should send update req with correct data', () => {
        const mockDataForUpdate = mockData.find(ad => ad.id === "1")!;
        const updatedData = { ...mockDataForUpdate, title: "Updated title" };
        service.updateAd(updatedData).subscribe(ads => {
            expect(ads).toBeTruthy();
        });

        const req = httpMock.expectOne('http://localhost:3000/ads/1');
        expect(req.request.method).toBe('PUT');

        req.flush(mockData);
    });

    it('should send ad via post method', () => {
        const newAd: IJobAd = { status: 'draft', title: 'new ad for test', description: 'description for new ad just for testing purposes', id: "5", skills: [] };
        service.insertAd(newAd).subscribe(ad => {
            expect(ad).toBeTruthy();
        });

        const req = httpMock.expectOne('http://localhost:3000/ads');
        expect(req.request.method).toBe('POST');

        req.flush(mockData);
    });

    it('should update status using put request', () => {
        service.changeAdStatus("1", "published").subscribe(res => {
            expect(res).toBeTruthy();
        });

        const req = httpMock.expectOne('http://localhost:3000/ads/1');
        expect(req.request.body).toEqual({ status: "published" });
        req.flush(mockData.find(ad => ad.id === "1")!, { status: 200, statusText: 'OK' });
    });


});
