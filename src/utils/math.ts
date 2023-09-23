import { Statistics } from 'src/models/math';

const describe = (values: Array<number>): Statistics => {
  const max = Math.max(...values);

  const min = Math.min(...values);

  const mean =
    values.reduce((accumulated, x) => {
      return accumulated + x;
    }, 0) / values.length;

  const disp =
    values.reduce((accumulated, x) => {
      const diff = x - mean;
      return accumulated + diff * diff;
    }, 0) / values.length;

  const std = Math.sqrt(disp);

  return {
    max,
    min,
    std,
    mean,
    disp,
  };
};

export { describe };
