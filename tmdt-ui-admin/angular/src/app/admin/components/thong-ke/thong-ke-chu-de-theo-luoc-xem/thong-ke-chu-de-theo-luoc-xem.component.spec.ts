import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeChuDeTheoLuocXemComponent } from './thong-ke-chu-de-theo-luoc-xem.component';

describe('ThongKeChuDeTheoLuocXemComponent', () => {
  let component: ThongKeChuDeTheoLuocXemComponent;
  let fixture: ComponentFixture<ThongKeChuDeTheoLuocXemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeChuDeTheoLuocXemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeChuDeTheoLuocXemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
