import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetDataComponent } from './reset-data.component';

describe('ResetDataComponent', () => {
  let component: ResetDataComponent;
  let fixture: ComponentFixture<ResetDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
