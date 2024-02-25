export default function formatNumber(
  number: number,
  options: {
    unit: string;
    step: number;
    precision?: number;
  }[]
) {
  const _ops = options.sort((a, b) => b.step - a.step),
    len = _ops.length;
  //   let _num = number;
  for (let i = 0; i < len; i++) {
    const { unit, step, precision = 1 } = _ops[i];
    if (number > step) {
      return `${(number / step).toFixed(precision)}${unit}`;
    }
  }
  return number.toString();
}
