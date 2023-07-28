import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskListScreenComponent } from './new-task-list-screen.component';

describe('NewTaskListScreenComponent', () => {
  let component: NewTaskListScreenComponent;
  let fixture: ComponentFixture<NewTaskListScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaskListScreenComponent]
    });
    fixture = TestBed.createComponent(NewTaskListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
