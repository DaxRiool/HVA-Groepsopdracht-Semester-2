import { carLoan } from "./interfaces/carLoan";

export class CarLoan implements carLoan {
    private _email: string;
    private _licensePlate: string;
    private _startDate: Date;
    private _endDate: Date;

    public constructor(email: string, licensePlate: string, startDate: Date, endDate: Date) {
        this._email = email;
        this._licensePlate = licensePlate;
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get email(): string {
        return this._email;
    }

    get licensePlate(): string {
        return this._licensePlate;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date {
        return this._endDate;
    }
}