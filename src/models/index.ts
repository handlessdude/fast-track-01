interface Period {
  from: string;
  to?: string;
}

type MaybeUndefined<T> = T | undefined;

type MaybeNull<T> = T | null;

export type {
  Period,
  MaybeUndefined,
  MaybeNull
}
