import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeDanhThuComponent } from './thong-ke-danh-thu.component';

describe('ThongKeDanhThuComponent', () => {
  let component: ThongKeDanhThuComponent;
  let fixture: ComponentFixture<ThongKeDanhThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeDanhThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeDanhThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
