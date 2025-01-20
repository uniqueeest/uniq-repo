const HEX = '0123456789abcdefghijklmnopqrstuvwxyz';

export function randomId() {
  let uuid = '';

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else {
      uuid += HEX[Math.floor(Math.random() * 16)];
    }
  }

  return uuid;
}
