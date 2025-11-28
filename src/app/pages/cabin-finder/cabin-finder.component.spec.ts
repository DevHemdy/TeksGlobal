import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinFinderComponent } from './cabin-finder.component';

describe('CabinFinderComponent', () => {
  let component: CabinFinderComponent;
  let fixture: ComponentFixture<CabinFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
