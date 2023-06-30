import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobAdComponent } from './edit-job-ad.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IJobAd } from 'src/app/models';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('EditJobAdComponent', () => {
    let component: EditJobAdComponent;
    let fixture: ComponentFixture<EditJobAdComponent>;
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
        "status": "archived"
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EditJobAdComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, MaterialModule],
            providers: [provideAnimations()]
        });
        fixture = TestBed.createComponent(EditJobAdComponent);
        component = fixture.componentInstance;
        component.ad = mockData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not be able to change status when ad is archived', () => {
        const status = fixture.debugElement.query(By.css('.mdc-switch')).nativeElement;
        expect(status.disabled).toBeTrue();

    });

    it('should be 4 skills chips', () => {
        const chips = fixture.debugElement.queryAll(By.css('mat-chip-row'));
        expect(chips.length).toEqual(4);
    });
});
