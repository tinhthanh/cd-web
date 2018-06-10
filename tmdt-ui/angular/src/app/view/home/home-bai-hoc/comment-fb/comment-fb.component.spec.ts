import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFbComponent } from './comment-fb.component';

describe('CommentFbComponent', () => {
  let component: CommentFbComponent;
  let fixture: ComponentFixture<CommentFbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentFbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
