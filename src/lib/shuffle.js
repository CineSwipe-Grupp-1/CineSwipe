export function pickOne(array) {
  if (!array || array.length === 0) return null;
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
