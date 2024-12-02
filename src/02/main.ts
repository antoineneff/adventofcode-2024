async function parseFileInput(): Promise<number[][]> {
  const text = await Deno.readTextFile("src/02/input");
  const lines = text.trim().split("\n");
  return lines.map((line) => line.split(/\s+/).map(Number));
}

async function part1() {
  const lines = await parseFileInput();
  let output = 0;
  for (const line of lines) {
    if (isLineValid(line)) {
      output += 1;
    }
  }
  console.log("Part 1:", output);
}

async function part2() {
  const lines = await parseFileInput();
  let output = 0;
  for (const line of lines) {
    const generatedLines = generateLines(line);
    if (generatedLines.some((line) => isLineValid(line))) {
      output += 1;
    }
  }
  console.log("Part 2:", output);
}

function isLineValid(line: number[]): boolean {
  let lineOrder = null;
  for (let i = 1; i < line.length; i++) {
    const currentOrder = Math.sign(line[i] - line[i - 1]);
    if (lineOrder === null) {
      lineOrder = currentOrder;
    }
    if (currentOrder !== lineOrder) {
      return false;
    }
    lineOrder = currentOrder;
    const currentDiff = Math.abs(line[i] - line[i - 1]);
    if (currentDiff < 1 || currentDiff > 3) {
      return false;
    }
  }
  return true;
}

function generateLines(line: number[]): number[][] {
  const lines = [];
  for (let i = 0; i < line.length; i++) {
    const newLine = [...line];
    newLine.splice(i, 1);
    lines.push(newLine);
  }
  return lines;
}

part1();
part2();
