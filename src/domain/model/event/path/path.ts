import { ValueObject } from "@/domain/model/shared/valueObject";

export class Path extends ValueObject<string, "Path"> {
	validate(path: string): void {
		if (path.length < 1) {
			throw new Error("Path must be at least 1 letter");
		}
	}
}
