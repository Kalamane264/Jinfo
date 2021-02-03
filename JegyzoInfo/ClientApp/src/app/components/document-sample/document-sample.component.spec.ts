import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSampleComponent } from './document-sample.component';

describe('DocumentSampleComponent', () => {
  let component: DocumentSampleComponent;
  let fixture: ComponentFixture<DocumentSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
