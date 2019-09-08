import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShutdownConfirmationDialogComponent } from './shutdown-confirmation-dialog.component';

describe('ShutdownConfirmationDialogComponent', () => {
  let component: ShutdownConfirmationDialogComponent;
  let fixture: ComponentFixture<ShutdownConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShutdownConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShutdownConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
