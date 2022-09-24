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
      ip: 0,
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
    this.registers.flag = this.registers[arg1] - this.registers[arg2];
  }

  cmpImm(arg1, arg2) {
    this.registers.flag = this.registers[arg1] - arg2;
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

  jl(ip) {
    if (this.registers.flag > 0) {
      this.setIP(ip);
    } else {
      this.setIP(this.registers.ip + 1);
    }
  }

  jle(ip) {
    if (this.registers.flag >= 0) {
      this.setIP(ip);
    } else {
      this.setIP(this.registers.ip + 1);
    }
  }

  jg(ip) {
    if (this.registers.flag < 0) {
      this.setIP(ip);
    } else {
      this.setIP(this.registers.ip + 1);
    }
  }

  jge(ip) {
    if (this.registers.flag <= 0) {
      this.setIP(ip);
    } else {
      this.setIP(this.registers.ip + 1);
    }
  }

  je(ip) {
    if (this.registers.flag === 0) {
      this.setIP(ip);
    } else {
      this.setIP(this.registers.ip + 1);
    }
  }

  jump(ip) {
    this.setIP(ip);
  }

  setIP(ip) {
    this.registers.ip = ip;
  }
}

module.exports = FakeCPU;
