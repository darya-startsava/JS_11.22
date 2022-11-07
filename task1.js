function makeDeepCopy(obj) {
  function goDeeperMap(map, copyMap) {
    for ([key, value] of map) {
      if (typeof value !== 'object' || value === null) {
        copyMap.set(key, value);
        continue;
      }
      if (value instanceof Map) {
        const deeperCopyMap = new Map();
        copyMap.set(key, deeperCopyMap);
        return goDeeperMap(value, deeperCopyMap);
      }
      if (value instanceof Set) {
        const deeperCopySet = new Set();
        copyMap.set(key, deeperCopyset);
        return goDeeperSet(value, deeperCopySet);
      }
      if (Array.isArray(value)) {
        const deeperCopyArray = [];
        copyMap.set(key, deeperCopyArray);
        return goDeeper(value, deeperCopyArray);
      }
      const deeperCopyObject = {};
      copyMap.set(key, deeperCopyObject);
      return goDeeper(value, deeperCopyObject);
    }
  }

  function goDeeperSet(set, copySet) {
    for (item of set) {
      if (typeof item !== 'object' || item === null) {
        copySet.add(item);
        continue;
      }
      if (item instanceof Map) {
        const deeperCopyMap = new Map();
        copySet.add(deeperCopyMap);
        return goDeeperMap(item, deeperCopyMap);
      }
      if (item instanceof Set) {
        const deeperCopySet = new Set();
        copySet.add(deeperCopySet);
        return goDeeperSet(item, deeperCopySet);
      }
      if (Array.isArray(item)) {
        const deeperCopyArray = [];
        copySet.add(deeperCopyArray);
        return goDeeper(item, deeperCopyArray);
      }
      const deeperCopyObject = {};
      copySet.add(deeperCopyObject);
      return goDeeper(item, deeperCopyObject);
    }
  }

  function goDeeper(object, copy) {
    Object.keys(object).forEach((key) => {
      if (typeof object[key] !== 'object' || object[key] === null) {
        copy[key] = object[key];
        return;
      }
      if (Array.isArray(object[key])) {
        copy[key] = [];
        return goDeeper(object[key], copy[key]);
      }
      if (object[key] instanceof Map) {
        copy[key] = new Map();
        return goDeeperMap(object[key], copy[key]);
      }
      if (object[key] instanceof Set) {
        copy[key] = new Set();
        return goDeeperSet(object[key], copy[key]);
      }
      copy[key] = {};
      return goDeeper(object[key], copy[key]);
    });
  }

  if (obj === null || typeof obj !== 'object') {
    throw new Error();
  }
  const deepCopy = {};

  goDeeper(obj, deepCopy);
  return deepCopy;
}
