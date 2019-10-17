const exstat = {};

const string = {};
const array = {};
const number = {};

// array methods

const normalize = (set, range = [0, 1]) => {
  const min = Math.min(...set);
  let newSet = set.map(n => n - min);
  const max = Math.max(...newSet);
  newSet = newSet.map(n => n / max);

  // newSet is now in range [0, 1]

  let newRange = range[1] - range[0];
  let initial = range[0];

  // normalized = (array * new range) + range[0];

  return newSet.map(n => n * newRange + initial);
};

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);

  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const mean = arr => {
  const n = arr.length / arr[0];
  let sum = 0;

  for (let i = 0; i < n; i++) sum += arr[i];

  return sum / n;
};

// string methods

const toUTF8Array = str => {
  let utf8 = [];

  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);

    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode > 0x80) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    } else {
      i++;
      charcode =
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));

      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }

  return utf8;
};

const binAdd = (str1, str2) => {
  const num1 = parseInt(str1, 2);
  const num2 = parseInt(str2, 2);

  let sum = (num1 + num2).toString(2);
  let len = str1.length;

  while (sum.length < len) sum = "0" + sum;

  return sum.length === length ? "1" + sum : sum;
};

const binToInt = bin => parseInt(bin, 2);

const trunc = (str, len) => {
  while (str.length > len) str = str.slice(1);
  return str;
};

const binToHex = str => {
  let dec = parseInt(str, 2);
  if (dec == NaN) throw new Error("invalid input to binToHex");
  return dec.toString(16);
};
console.log(binToHex("10010011"));
// number methods

const mod = (a, b) => ((a % b) + b) % b;

const padZero = (num, len) => {
  let arr = num.toString().split("");
  if (len <= arr.length) throw new Error("zero padding failed");

  while (arr.length < len) arr.unshift("0");

  return arr.join("");
};

exstat.array = {
  normalize: normalize,
  median: median,
  mean: mean
};

exstat.string = {
  toUTF8Array: toUTF8Array,
  binAdd: binAdd,
  binToInt: binToInt,
  trunc: trunc,
  binToHex: binToHex
};

exstat.number = {
  mod: mod,
  padZero: padZero
};

module.exports = exstat;
