import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JanuszComponent } from './janusz.component';

describe('JanuszComponent', () => {
  let component: JanuszComponent;
  let fixture: ComponentFixture<JanuszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JanuszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JanuszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
