import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessagesDialogComponent } from './show-messages-dialog.component';

describe('ShowMessagesDialogComponent', () => {
  let component: ShowMessagesDialogComponent;
  let fixture: ComponentFixture<ShowMessagesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMessagesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
