export function findIndexInArrayWithAttribute(arr, key, value) {
  let index = -1;
  arr.forEach((element, idx) => {
    if (element[key] == value) {
      index = idx;
    }
  });
  return index;
}
