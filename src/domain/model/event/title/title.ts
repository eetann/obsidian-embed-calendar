import { ValueObject } from "@/domain/model/shared/valueObject";

export class Title extends ValueObject<string, "Title"> {
	validate(title: string): void {
		if (title.length < 1) {
			throw new Error("Title must be at least 1 letter");
		}
	}
}
