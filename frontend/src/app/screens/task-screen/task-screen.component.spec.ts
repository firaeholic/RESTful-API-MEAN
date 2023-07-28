import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskScreenComponent } from './task-screen.component';

describe('TaskScreenComponent', () => {
  let component: TaskScreenComponent;
  let fixture: ComponentFixture<TaskScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskScreenComponent]
    });
    fixture = TestBed.createComponent(TaskScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
