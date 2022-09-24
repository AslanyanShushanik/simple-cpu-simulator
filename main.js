const process = require("process");
const fs = require("fs");
const FakeCPU = require("./cpu.js");
const preprocessing = require("./utils.js");

const fakeCPU = new FakeCPU();

fs.readFile(process.argv[2], "utf8", function (err, data) {
  let instructions = preprocessing(data.split("\n"));
  while (true) {
    let ip = fakeCPU.registers.ip;
    let instruction = instructions[ip];
    if (instruction && instruction.length) {
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
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "add": {
              fakeCPU.addReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "sub": {
              fakeCPU.subReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "mul": {
              fakeCPU.mulReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "div": {
              fakeCPU.divReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "cmp": {
              fakeCPU.cmpReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "and": {
              fakeCPU.andReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "or": {
              fakeCPU.orReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "xor": {
              fakeCPU.xorReg(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
          }
        } else if (!arg2 && operation === "not") {
          fakeCPU.not(arg1);
          fakeCPU.setIP(ip + 1);
        } else if (arg2 && arg2.length && !isNaN(Number(arg2))) {
          arg2 = Number(arg2);
          switch (operation) {
            case "mov": {
              fakeCPU.movImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "add": {
              fakeCPU.addImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "sub": {
              fakeCPU.subImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "mul": {
              fakeCPU.mulImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "div": {
              fakeCPU.divImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "cmp": {
              fakeCPU.cmpImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "and": {
              fakeCPU.andImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "or": {
              fakeCPU.orImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
            case "xor": {
              fakeCPU.xorImm(arg1, arg2);
              fakeCPU.setIP(ip + 1);
              break;
            }
          }
        }
      } else if (arg1 && Number.isInteger(+arg1)) {
        arg1 = +arg1;
        switch (operation) {
          case "jump": {
            fakeCPU.jump(arg1);
            break;
          }
          case "jl": {
            fakeCPU.jl(arg1);
            break;
          }
          case "jle": {
            fakeCPU.jle(arg1);
            break;
          }
          case "jg": {
            fakeCPU.jg(arg1);
            break;
          }
          case "jge": {
            fakeCPU.jge(arg1);
            break;
          }
          case "je": {
            fakeCPU.je(arg1);
            break;
          }
        }
      } else {
        fakeCPU.setIP(ip + 1);
      }
    } else {
      fakeCPU.setIP(ip + 1);
    }

    if (fakeCPU.registers.ip > instructions.length) {
      console.log(fakeCPU.registers);
      return;
    }
  }
});
