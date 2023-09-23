interface Period {
  from: string;
  to?: string;
}

type MaybeUndefined<T> = T | undefined;

type MaybeNull<T> = T | null;

interface GenericSchema {
  id: string;
  name: string;
}

export type { Period, MaybeUndefined, MaybeNull, GenericSchema };
