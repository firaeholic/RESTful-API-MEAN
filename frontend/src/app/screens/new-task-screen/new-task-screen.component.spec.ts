import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskScreenComponent } from './new-task-screen.component';

describe('NewTaskScreenComponent', () => {
  let component: NewTaskScreenComponent;
  let fixture: ComponentFixture<NewTaskScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaskScreenComponent]
    });
    fixture = TestBed.createComponent(NewTaskScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
