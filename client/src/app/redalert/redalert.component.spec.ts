import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedalertComponent } from './redalert.component';

describe('RedalertComponent', () => {
  let component: RedalertComponent;
  let fixture: ComponentFixture<RedalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
