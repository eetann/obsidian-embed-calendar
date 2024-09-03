export class ExecuteCodeBlockAS {
	async execute(source: string) {
		try {
			const func = new Function(
				`return new Promise((s,r)=>{(async ()=>{
const dv = DataviewAPI;
return ${source};
})().then(s).catch(r)})`,
			);
			return await func();
		} catch (err) {
			if (
				err instanceof ReferenceError &&
				err.message === "DataviewAPI is not defined"
			) {
				throw Error("Please install Dataview plugin");
			}
		}
	}
}
