import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JanuszHolidaysComponent } from './janusz-holidays.component';

describe('JanuszHolidaysComponent', () => {
  let component: JanuszHolidaysComponent;
  let fixture: ComponentFixture<JanuszHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JanuszHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JanuszHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
