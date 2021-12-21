import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AblumsViewComponent } from './ablums-view.component';

describe('AblumsViewComponent', () => {
  let component: AblumsViewComponent;
  let fixture: ComponentFixture<AblumsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AblumsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AblumsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
