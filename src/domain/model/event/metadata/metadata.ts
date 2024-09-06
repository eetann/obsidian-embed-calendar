import { ValueObject } from "@/domain/model/shared/valueObject";

export type MetadataType = undefined | string | HTMLElement;

export class Metadata extends ValueObject<MetadataType, "Metadata"> {
	validate(): void {
		// nothing
	}

	get metadata() {
		return this.value ?? "";
	}
}
