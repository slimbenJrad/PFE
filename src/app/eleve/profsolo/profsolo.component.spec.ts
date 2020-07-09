import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfsoloComponent } from './profsolo.component';

describe('ProfsoloComponent', () => {
  let component: ProfsoloComponent;
  let fixture: ComponentFixture<ProfsoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfsoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfsoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
