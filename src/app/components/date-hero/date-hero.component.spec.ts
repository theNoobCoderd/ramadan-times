import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateHeroComponent } from './date-hero.component';

describe('DateHeroComponent', () => {
  let component: DateHeroComponent;
  let fixture: ComponentFixture<DateHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
