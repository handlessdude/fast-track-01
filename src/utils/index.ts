const copy = <T>(obj: T) => JSON.parse(JSON.stringify(obj));

export { copy };
