import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotificationDialogComponent } from './create-notification-dialog.component';

describe('CreateNotificationDialogComponent', () => {
  let component: CreateNotificationDialogComponent;
  let fixture: ComponentFixture<CreateNotificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
