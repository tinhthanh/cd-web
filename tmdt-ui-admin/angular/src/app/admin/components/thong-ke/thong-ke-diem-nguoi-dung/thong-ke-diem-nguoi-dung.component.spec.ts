import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeDiemNguoiDungComponent } from './thong-ke-diem-nguoi-dung.component';

describe('ThongKeDiemNguoiDungComponent', () => {
  let component: ThongKeDiemNguoiDungComponent;
  let fixture: ComponentFixture<ThongKeDiemNguoiDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeDiemNguoiDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeDiemNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
