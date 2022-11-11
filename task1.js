function concatStrings(str, sep) {
  const args = [];
  let separator = '';
  let wasInvalid = false;
  function curried(str, sep) {
    if (!arguments.length) {
      return args.join(separator);
    }
    if (typeof str === 'string' && !wasInvalid) {
      args.push(str);
    } else {
      wasInvalid = true;
    }
    if (typeof sep === 'string') {
      separator = sep;
    }
    return curried;
  }
  curried(str, sep);
  return curried;
}