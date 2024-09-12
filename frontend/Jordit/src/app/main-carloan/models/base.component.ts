import { BusinessVehicle } from './businessVechicle';
import { CarLoanService } from '../car-loan/car-loan.service';
export abstract class BaseComponent {
    protected _businessVehicle: BusinessVehicle[] = [];
    protected _fuelTypes: string[] = [];
    protected _fuelType: string = 'noFuelType';
    protected _fromDate: Date | null = null;
    protected _toDate: Date | null = null;
    protected _errorMessage: string | undefined;
    protected selectedVehicle: BusinessVehicle | undefined;

    protected constructor(
        protected carLoanService: CarLoanService,
    ) { }

    public get businessVehicle(): BusinessVehicle[] {
        return this._businessVehicle;
    }

    public set businessVehicle(value: BusinessVehicle[]) {
        this._businessVehicle = value;
    }

    public get fuelTypes(): string[] {
        return this._fuelTypes;
    }

    public set fuelTypes(value: string[]) {
        this._fuelTypes = value;
    }

    public get fuelType(): string {
        return this._fuelType;
    }

    public set fuelType(value: string) {
        this._fuelType = value;
    }

    public get fromDate(): Date | null {
        return this._fromDate;
    }

    public set fromDate(value: Date | null) {
        this._fromDate = value;
    }

    public get toDate(): Date | null {
        return this._toDate;
    }

    public set toDate(value: Date | null) {
        this._toDate = value;
    }

    public get errorMessage(): string | undefined {
        return this._errorMessage;
    }

    public set errorMessage(value: string | undefined) {
        this._errorMessage = value;
    }
}