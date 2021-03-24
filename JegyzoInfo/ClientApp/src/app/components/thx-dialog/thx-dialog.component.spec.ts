import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThxDialogComponent } from './thx-dialog.component';

describe('ThxDialogComponent', () => {
  let component: ThxDialogComponent;
  let fixture: ComponentFixture<ThxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThxDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
