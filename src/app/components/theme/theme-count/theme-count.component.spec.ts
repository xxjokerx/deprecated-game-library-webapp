import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemeCountComponent} from './theme-count.component';

describe('ThemeCountComponent', () => {
  let component: ThemeCountComponent;
  let fixture: ComponentFixture<ThemeCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeCountComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
