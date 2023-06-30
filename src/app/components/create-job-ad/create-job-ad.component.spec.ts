import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobAdComponent } from './create-job-ad.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CreateJobAdComponent', () => {
    let component: CreateJobAdComponent;
    let fixture: ComponentFixture<CreateJobAdComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CreateJobAdComponent],
            imports: [HttpClientTestingModule, MaterialModule, FormsModule, ReactiveFormsModule],
            providers: [provideAnimations()]
        });
        fixture = TestBed.createComponent(CreateJobAdComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not be able to submit if form is empty', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        const saveChanges = buttons.find(btn => btn.nativeElement.textContent.trim() === 'Save ad')!;
        expect(saveChanges.nativeElement.disabled).toBeTrue();
    });

    it('should be able to submit after title is inserted', () => {
        component.newAdForm.controls['title'].setValue('Test title');
        fixture.detectChanges();
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        const saveChanges = buttons.find(btn => btn.nativeElement.textContent.trim() === 'Save ad')!;
        expect(saveChanges.nativeElement.disabled).toBeFalse();
    });
});
