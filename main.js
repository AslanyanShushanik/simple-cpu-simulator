const FakeCPU = require("./cpu.js");

const process = require("process");

const fakeCPU = new FakeCPU();

let fs = require("fs");

fs.readFile(process.argv[2], "utf8", function (err, data) {
  let instructions = data.split("\n");
  let i = 0;
  while (i < instructions.length) {
    let instruction = instructions[i].replace(",", "");
    if (instruction.length) {
      // assuming all the labels will end with a colon :
      if (instruction.endsWith(":")) {
        let nextInd = i + 1;
        instruction = instruction.replace(":", "");
        fakeCPU.setLabel(instruction, nextInd);
        i++;
      } else {
        let operation = instruction.split(" ")[0];
        let arg1 = instruction.split(" ")[1];
        let arg2 = instruction.split(" ")[2];
        if (
          arg1 &&
          arg1.startsWith("r") &&
          fakeCPU.registers.hasOwnProperty(arg1)
        ) {
          if (
            arg2 &&
            arg2.startsWith("r") &&
            fakeCPU.registers.hasOwnProperty(arg1)
          ) {
            switch (operation) {
              case "mov": {
                fakeCPU.movReg(arg1, arg2);
                i++;
                break;
              }
              case "add": {
                fakeCPU.addReg(arg1, arg2);
                i++;
                break;
              }
              case "sub": {
                fakeCPU.subReg(arg1, arg2);
                i++;
                break;
              }
              case "mul": {
                fakeCPU.mulReg(arg1, arg2);
                i++;
                break;
              }
              case "div": {
                fakeCPU.divReg(arg1, arg2);
                i++;
                break;
              }
              case "cmp": {
                fakeCPU.cmpReg(arg1, arg2);
                i++;
                break;
              }
              case "and": {
                fakeCPU.andReg(arg1, arg2);
                i++;
                break;
              }
              case "or": {
                fakeCPU.orReg(arg1, arg2);
                i++;
                break;
              }
              case "xor": {
                fakeCPU.xorReg(arg1, arg2);
                i++;
                break;
              }
            }
          } else if (!arg2 && operation === "not") {
            fakeCPU.not(arg1);
            i++;
          } else if (arg2 && arg2.length && !isNaN(Number(arg2))) {
            arg2 = Number(arg2);
            switch (operation) {
              case "mov": {
                fakeCPU.movImm(arg1, arg2);
                i++;
                break;
              }
              case "add": {
                fakeCPU.addImm(arg1, arg2);
                i++;
                break;
              }
              case "sub": {
                fakeCPU.subImm(arg1, arg2);
                i++;
                break;
              }
              case "mul": {
                fakeCPU.mulImm(arg1, arg2);
                i++;
                break;
              }
              case "div": {
                fakeCPU.divImm(arg1, arg2);
                i++;
                break;
              }
              case "cmp": {
                fakeCPU.cmpImm(arg1, arg2);
                i++;
                break;
              }
              case "and": {
                fakeCPU.andImm(arg1, arg2);
                i++;
                break;
              }
              case "or": {
                fakeCPU.orImm(arg1, arg2);
                i++;
                break;
              }
              case "xor": {
                fakeCPU.xorImm(arg1, arg2);
                i++;
                break;
              }
            }
          }
        } else if (arg1 && arg1.endsWith(":") && !arg2) {
          switch (operation) {
            case "jump": {
              let indx = fakeCPU.jump(arg1);
              i = indx;
              break;
            }
            case "jl": {
              i = fakeCPU.jl(arg1);
              break;
            }
            case "jle": {
              i = fakeCPU.jle(arg1);
              break;
            }
            case "jg": {
              i = fakeCPU.jl(arg1);
              break;
            }
            case "jge": {
              i = fakeCPU.jle(arg1);
              break;
            }
            case "je": {
              i = fakeCPU.jle(arg1);
              break;
            }
          }
        } else {
          i++;
        }
      }
    } else {
      i++;
    }
  }
  console.log(fakeCPU.registers);
});
