import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndexComponent } from './product-index.component';

describe('ProductIndexComponent', () => {
  let component: ProductIndexComponent;
  let fixture: ComponentFixture<ProductIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
