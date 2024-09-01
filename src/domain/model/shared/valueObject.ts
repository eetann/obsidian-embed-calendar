import { isEqual } from "es-toolkit";

export abstract class ValueObject<T, U> {
	// to recognize that they are different objects even though they have the same structure
	private _type: U;
	protected readonly _value: T;

	constructor(value: T) {
		this.validate(value);
		this._value = value;
	}

	protected abstract validate(value: T): void;

	get value(): T {
		return this._value;
	}

	equals(other: ValueObject<T, U>): boolean {
		return isEqual(this._value, other._value);
	}
}
