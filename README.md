# simple-cpu-simulator

<br />
The following project is a simple CPU simulator written in Javascript. As of now, the simulated CPU consists of  10 registers and supports arithmetic and logical operations, comparison, moving of data, and unconditional and conditional jumps, based on provided labels. <br />

```cpu.js``` contains the simulated FakeCPU class.
```main.js``` is responsible for parsing a fake assembly text, reading it line by line and calling instructions of FakeCPU if those are valid.
<br />

Agreed on assumptions: In the following project, it is assumed that the labels used for jumps end with a colon ```:``` .
<br />

To run the programm, you can use the provided assembler.txt file using the command:
<br />

``` node main.js assembler.txt ```
<br />
<br />
