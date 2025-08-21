export function pickOne(array) {
  if (!array || array.length === 0) return null;
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
