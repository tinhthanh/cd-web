import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeLuocMuaKhoaHocComponent } from './thong-ke-luoc-mua-khoa-hoc.component';

describe('ThongKeLuocMuaKhoaHocComponent', () => {
  let component: ThongKeLuocMuaKhoaHocComponent;
  let fixture: ComponentFixture<ThongKeLuocMuaKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeLuocMuaKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeLuocMuaKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
