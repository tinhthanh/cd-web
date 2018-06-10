import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeLuocXemKhoaHocComponent } from './thong-ke-luoc-xem-khoa-hoc.component';

describe('ThongKeLuocXemKhoaHocComponent', () => {
  let component: ThongKeLuocXemKhoaHocComponent;
  let fixture: ComponentFixture<ThongKeLuocXemKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeLuocXemKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeLuocXemKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
