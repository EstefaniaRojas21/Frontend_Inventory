import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFormComponent } from './sales-list-form';

describe('SalesListForm', () => {
  let component: SaleFormComponent;
  let fixture: ComponentFixture<SaleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
