export const range = (start, end) => {
  let length = end - start + 1;
  const arreglo = Array.from({ length }, (_, idx) => idx + start);
  console.log(arreglo);
  return arreglo;
};
