class FakeCPU {
  constructor() {
    this.registers = {
      r1: null,
      r2: null,
      r3: null,
      r4: null,
      r5: null,
      r6: null,
      r7: null,
      r8: null,
      flag: null,
      labels: {},
    };
  }

  movReg(src, dest) {
    this.registers[src] = this.registers[dest];
  }

  movImm(src, dest) {
    this.registers[src] = dest;
  }

  addReg(arg1, arg2) {
    this.registers[arg1] += this.registers[arg2];
  }

  addImm(arg1, arg2) {
    this.registers[arg1] += arg2;
  }

  subReg(arg1, arg2) {
    this.registers[arg1] -= this.registers[arg2];
  }

  subImm(arg1, arg2) {
    this.registers[arg1] -= arg2;
  }

  mulReg(arg1, arg2) {
    this.registers[arg1] *= this.registers[arg2];
  }

  mulImm(arg1, arg2) {
    this.registers[arg1] *= arg2;
  }

  divReg(arg1, arg2) {
    this.registers[arg1] /= this.registers[arg2];
  }

  divImm(arg1, arg2) {
    this.registers[arg1] /= arg2;
  }

  cmpReg(arg1, arg2) {
    if (this.registers[arg1] > this.registers[arg2]) {
      this.registers.flag = 1;
    } else if (this.registers[arg1] < this.registers[arg2]) {
      this.registers.flag = -1;
    } else {
      this.registers.flag = 0;
    }
  }

  cmpImm(arg1, arg2) {
    if (arg1 > arg2) {
      this.registers.flag = 1;
    } else if (arg1 < arg2) {
      this.registers.flag = -1;
    } else {
      this.registers.flag = 0;
    }
  }

  andReg(arg1, arg2) {
    this.registers[arg1] &= this.registers[arg2];
  }

  andImm(arg1, arg2) {
    this.registers[arg1] &= arg2;
  }

  orReg(arg1, arg2) {
    this.registers[arg1] |= this.registers[arg2];
  }

  orImm(arg1, arg2) {
    this.registers[arg1] |= arg2;
  }

  xorReg(arg1, arg2) {
    this.registers[arg1] ^= this.registers[arg2];
  }

  xorImm(arg1, arg2) {
    this.registers[arg1] ^= arg2;
  }

  not(arg) {
    this.registers[arg] = ~this.registers[arg];
  }

  jl(label) {
    if (this.registers.flag === -1) {
      return this.registers.labels[label];
    }
  }

  jle(label) {
    if (this.registers.flag === -1 || this.registers.flag === 0) {
      return this.registers.labels[label];
    }
  }

  jg(label) {
    if (this.registers.flag === 1) {
      return this.registers.labels[label];
    }
  }

  jge(label) {
    if (this.registers.flag === 1 || this.registers.flag === 0) {
      return this.registers.labels[label];
    }
  }

  je(label) {
    if (this.registers.flag === 0) {
      return this.registers.labels[label];
    }
  }

  jump(label) {
    return this.registers.labels[label];
  }

  setLabel(label, indx) {
    this.registers.labels = { ...this.registers.labels, [label]: indx};
  }
}

module.exports = FakeCPU;
