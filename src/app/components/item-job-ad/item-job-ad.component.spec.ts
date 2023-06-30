import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemJobAdComponent } from './item-job-ad.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { IJobAd } from 'src/app/models';
import { By } from '@angular/platform-browser';

describe('ItemJobAdComponent', () => {
    let component: ItemJobAdComponent;
    let fixture: ComponentFixture<ItemJobAdComponent>;
    const mockData: IJobAd = {
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
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ItemJobAdComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule]
        });
        fixture = TestBed.createComponent(ItemJobAdComponent);
        component = fixture.componentInstance;
        component.jobAd = mockData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have two buttons, archive and edit', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.mdc-button'));
        const archiveButton = buttons.find(btn => btn.nativeElement.textContent.trim() === 'Archive');
        const editButton = buttons.find(btn => btn.nativeElement.textContent.trim() === 'Edit');
        expect(archiveButton).toBeTruthy();
        expect(editButton).toBeTruthy();
    });

    it('should display skills', () => {
        const skills = fixture.debugElement.query(By.css('.mat-mdc-card-subtitle')).nativeElement.textContent.trim();
        const expectedSkills = mockData.skills.join(', ');
        expect(skills).toEqual(expectedSkills);
    });

    it('should display title', () => {
        const skills = fixture.debugElement.query(By.css('.mat-mdc-card-title')).nativeElement.textContent.trim();
        expect(skills).toEqual(mockData.title);
    });

    it('should display description', () => {
        const skills = fixture.debugElement.query(By.css('.mat-mdc-card-content')).nativeElement.textContent.trim();
        expect(skills).toEqual(mockData.description);
    });
}); 
