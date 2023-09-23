import { MaybeUndefined, Period } from 'src/models';
import { DEFAULT_CURRENCY_RATE_DATE } from 'src/resources';

const omitProperty = <T extends object>(obj: T, propertyName: keyof T) => {
  const { [propertyName]: _, ...newObj } = obj;
  return newObj;
};

const periodAdapter = (period: MaybeUndefined<Period>) => {
  if (!period) {
    return DEFAULT_CURRENCY_RATE_DATE;
  }
  if (period.to) {
    return `${period.from}..${period.to}`;
  }
  return period.from;
};

function isCallback<T>(maybeFunc: T | unknown): maybeFunc is CallableFunction {
  return typeof maybeFunc === 'function';
}

type KeyMap<T> =
  | Partial<{
      [Key in keyof T]: string | ((val: Key) => string);
    }>
  | ((val: keyof T) => string);

export type ValueMap<T> =
  | Partial<{
      [Key in keyof T]: (val: T[Key]) => any;
    }>
  | ((val: T[keyof T]) => any);

const mapEntries = <T extends object>(
  payload: T,
  {
    keyMap = {},
    valueMap = {},
  }: Partial<{
    keyMap: KeyMap<T>;
    valueMap: ValueMap<T>;
  }>
) => {
  const isKeyMapUniform = isCallback(keyMap);
  const isValueMapUniform = isCallback(valueMap);
  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      const keyMapper = !isKeyMapUniform && keyMap[key as keyof T];
      const valueMapper = !isValueMapUniform && valueMap[key as keyof T];
      const newKey =
        (isKeyMapUniform && keyMap(key as keyof T)) ||
        (isCallback(keyMapper) && keyMapper(key as keyof T)) ||
        keyMapper ||
        key;
      const newVal = isValueMapUniform
        ? valueMap(value)
        : isCallback(valueMapper)
        ? valueMapper(value)
        : valueMapper || value;
      return [newKey, newVal];
    })
  );
};

export { periodAdapter, omitProperty, mapEntries };
