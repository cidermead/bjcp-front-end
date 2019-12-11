const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// adds array of values passed.
const numToChar = num => letters[num];

const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

const getRandom = (arr, n) => {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);

  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available");
  }

  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
};

export {
  numToChar,
  capitalize,
  getRandom,
}
