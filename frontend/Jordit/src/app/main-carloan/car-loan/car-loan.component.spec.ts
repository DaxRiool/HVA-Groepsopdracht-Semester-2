import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarLoanComponent } from './car-loan.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarLoanOverviewAndLoanComponent } from '../car-loan-overview-and-loan/car-loan-overview-and-loan.component';
import { CarLoanSearchFilterComponent } from '../car-loan-search-filter/car-loan-search-filter.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('CarLoanComponent', () => {
    let component: CarLoanComponent;
    let fixture: ComponentFixture<CarLoanComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CarLoanComponent, CarLoanOverviewAndLoanComponent, CarLoanSearchFilterComponent],
            imports: [HttpClientTestingModule, FormsModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CarLoanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});