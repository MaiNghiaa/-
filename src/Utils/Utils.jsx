export function replaceSpecialCharacters(str) {
  return str.replace(/[_-]/g, " ");
}

export function formatCash(input) {
  if (!Array.isArray(input) && typeof input !== "string") {
    return input;
  }
  const cashArray = Array.isArray(input) ? input : input.split("");
  if (cashArray.length === 0) {
    return 0;
  }
  return cashArray.reverse().reduce((prev, next, index) => {
    return (index % 3 ? next : next + ",") + prev;
  }, "");
}
