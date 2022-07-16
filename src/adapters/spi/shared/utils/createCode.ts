export const createCode = (): string => {
	let code: string = String(Math.floor(Math.random() * 9));

	for (let count: number = 0; count < 3; count++) {
		code += String(Math.floor(Math.random() * 9));
	}
	return (code);
};
