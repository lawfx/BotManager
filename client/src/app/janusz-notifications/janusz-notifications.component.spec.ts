import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JanuszNotificationsComponent } from './janusz-notifications.component';

describe('JanuszNotificationsComponent', () => {
  let component: JanuszNotificationsComponent;
  let fixture: ComponentFixture<JanuszNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JanuszNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JanuszNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
