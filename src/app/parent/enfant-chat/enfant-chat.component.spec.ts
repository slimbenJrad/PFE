import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantChatComponent } from './enfant-chat.component';

describe('EnfantChatComponent', () => {
  let component: EnfantChatComponent;
  let fixture: ComponentFixture<EnfantChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfantChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfantChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
