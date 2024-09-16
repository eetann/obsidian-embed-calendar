import { ValueObject } from "@/domain/model/shared/valueObject";

export class Path extends ValueObject<string, "Path"> {
	validate(path: string): void {
		if (path.length < 4) {
			throw new Error("Path must be at least 4 letter");
		}
		if (!path.endsWith(".md")) {
			throw new Error("Path must be markdown");
		}
	}
}
