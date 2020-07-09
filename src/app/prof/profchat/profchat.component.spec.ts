import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfchatComponent } from './profchat.component';

describe('ProfchatComponent', () => {
  let component: ProfchatComponent;
  let fixture: ComponentFixture<ProfchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
