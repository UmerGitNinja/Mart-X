export default function limitDecimalPlaces(
  number: number,
  decimalPlaces: number
) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(number * multiplier) / multiplier;
}
