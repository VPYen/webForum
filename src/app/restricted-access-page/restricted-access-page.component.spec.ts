import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedAccessPageComponent } from './restricted-access-page.component';

describe('RestrictedAccessPageComponent', () => {
  let component: RestrictedAccessPageComponent;
  let fixture: ComponentFixture<RestrictedAccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictedAccessPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
