// eslint-disable-next-line import/prefer-default-export
export function isNumber(val) {
  // eslint-disable-next-line no-restricted-globals
  return typeof val === 'number' && !isNaN(val);
}

export function getApiNumber(val) {
  const num = Number(val);
  return isNumber(num) ? num : 'N/A';
}

export function getApiPercent(val) {
  const num = Number(val);
  if (isNumber(num)) {
    return num * 100;
  }
  return 'N/A';
}
