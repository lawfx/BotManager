import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotInfoComponent } from './bot-info.component';

describe('BotInfoComponent', () => {
  let component: BotInfoComponent;
  let fixture: ComponentFixture<BotInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
