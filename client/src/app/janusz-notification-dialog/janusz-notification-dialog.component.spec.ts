import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JanuszNotificationDialogComponent } from './janusz-notification-dialog.component';

describe('JanuszNotificationDialogComponent', () => {
  let component: JanuszNotificationDialogComponent;
  let fixture: ComponentFixture<JanuszNotificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JanuszNotificationDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JanuszNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
