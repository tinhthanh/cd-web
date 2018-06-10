import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeTheoChuDeComponent } from './thong-ke-theo-chu-de.component';

describe('ThongKeTheoChuDeComponent', () => {
  let component: ThongKeTheoChuDeComponent;
  let fixture: ComponentFixture<ThongKeTheoChuDeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeTheoChuDeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeTheoChuDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
