import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeDoanhThuTheoTuanComponent } from './thong-ke-doanh-thu-theo-tuan.component';

describe('ThongKeDoanhThuTheoTuanComponent', () => {
  let component: ThongKeDoanhThuTheoTuanComponent;
  let fixture: ComponentFixture<ThongKeDoanhThuTheoTuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeDoanhThuTheoTuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeDoanhThuTheoTuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
