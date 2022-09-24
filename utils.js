function preprocessing(instructions) {
  let i = 0;
  let labels = {};
  while (i < instructions.length) {
    instructions[i] = instructions[i].replace(",", "");
    if (!instructions[i].length) {
      instructions.splice(i, 1);
    } else if (instructions[i].endsWith(":")) {
      let instruction = instructions[i].replace(":", "");
      labels = { ...labels, [instruction]: i };
      instructions.splice(i, 1);
    } else {
      i++;
    }
  }
  i = 0;
  while (i < instructions.length) {
    let subStr = instructions[i].split(" ")[1];
    if (subStr && subStr.length && labels.hasOwnProperty(subStr)) {
      instructions[i] = instructions[i].replace(subStr, labels[subStr]);
    }
    i++;
  }
  return instructions;
}

module.exports = preprocessing;
