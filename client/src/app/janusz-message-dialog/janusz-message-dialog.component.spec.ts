import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JanuszMessageDialogComponent } from './janusz-message-dialog.component';

describe('JanuszMessageDialogComponent', () => {
  let component: JanuszMessageDialogComponent;
  let fixture: ComponentFixture<JanuszMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JanuszMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JanuszMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
