import { businessVehicle } from "./interfaces/businessVechicle";

export class BusinessVehicle implements businessVehicle {
    private _licensePlate: string;
    private _vehicleType: string;
    private _fuelType: string;

    public constructor(licensePlate: string, fuelType: string, vehicleType: string,) {
        this._licensePlate = licensePlate;
        this._fuelType = fuelType;
        this._vehicleType = vehicleType;
    }

    public get licensePlate(): string {
        return this._licensePlate;
    }
    public get fuelType(): string {
        return this._fuelType;
    }
    public get vehicleType(): string {
        return this._vehicleType;
    }
}