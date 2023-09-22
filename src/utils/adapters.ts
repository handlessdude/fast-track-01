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

export { periodAdapter, omitProperty };
