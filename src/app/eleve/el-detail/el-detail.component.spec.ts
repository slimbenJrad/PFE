import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElDetailComponent } from './el-detail.component';

describe('ElDetailComponent', () => {
  let component: ElDetailComponent;
  let fixture: ComponentFixture<ElDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
