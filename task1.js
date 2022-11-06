function makeDeepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    throw new Error();
  }
  const deepCopy = Array.isArray(obj) ? [...obj] : { ...obj };

  function goDeeper(copy) {
    Object.keys(copy).forEach((key) => {
      if (typeof copy[key] === 'object' && copy[key] !== null) {
        copy[key] = Array.isArray(copy[key]) ? [...copy[key]] : { ...copy[key] };
        return goDeeper(copy[key]);
      }
    });
  }
  goDeeper(deepCopy);
  return deepCopy;
}