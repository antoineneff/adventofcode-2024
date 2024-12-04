async function parseFileInput(): Promise<string[][]> {
  const text = await Deno.readTextFile("src/04/input");
  const lines = text.trim().split("\n");
  return lines.map((line) => line.split(""));
}

async function part1() {
  const lines = await parseFileInput();
  let output = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === 'X') {
        const possibilities = findPossiblities(lines, i, j);
        for (const possibility of possibilities) {
          if (possibility === "XMAS" || possibility === "SAMX") {
            output += 1;
          }
        }
      }
    }
  }
  console.log("Part 1:", output);
}

async function part2() {
  const lines = await parseFileInput();
  let output = 0;
  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      const char = lines[i][j];
      if (char === 'A') {
        if (isCross(lines, i, j)) {
          output += 1;
        }
      }
    }
  }
  console.log("Part 2:", output);
}

function findPossiblities(lines: string[][], i: number, j: number): string[] {
  const possibilities = [];
  if (j + 3 < lines[i].length) {
    possibilities.push(horizontal(lines[i], j));
  }
  if (j - 3 >= 0) {
    possibilities.push(horizontal(lines[i], j - 3));
  }
  if (i + 3 < lines.length) {
    possibilities.push(vertical(lines, i, j));
  }
  if (i - 3 >= 0) {
    possibilities.push(vertical(lines, i - 3, j));
  }
  if (i + 3 < lines.length && j + 3 < lines[i].length) {
    possibilities.push(diagonal(lines, i, j));
  }
  if (i - 3 >= 0 && j - 3 >= 0) {
    possibilities.push(diagonal(lines, i - 3, j - 3));
  }
  if (i + 3 < lines.length && j - 3 >= 0) {
    possibilities.push(otherDiagonal(lines, i, j));
  }
  if (i - 3 >= 0 && j + 3 < lines[i].length) {
    possibilities.push(otherDiagonal(lines, i - 3, j + 3));
  }
  return possibilities;
}

function horizontal(line: string[], i: number): string {
  const chars = [];
  for (let k = 0; k < 4; k++) {
    chars.push(line[i + k]);
  }
  return chars.join("");
}

function vertical(lines: string[][], i: number, j: number): string {
  const chars = [];
  for (let k = 0; k < 4; k++) {
    chars.push(lines[i + k][j]);
  }
  return chars.join("");
}

function diagonal(lines: string[][], i: number, j: number, length = 4): string {
  const chars = [];
  for (let k = 0; k < length; k++) {
    chars.push(lines[i + k][j + k]);
  }
  return chars.join("");
}

function otherDiagonal(lines: string[][], i: number, j: number, length = 4): string {
  const chars = [];
  for (let k = 0; k < length; k++) {
    chars.push(lines[i + k][j - k]);
  }
  return chars.join("");
}

function isCross(lines: string[][], i: number, j: number) {
  const firstDiagonal = diagonal(lines, i - 1, j - 1, 3);
  if (firstDiagonal === "MAS" || firstDiagonal === "SAM") {
    const secondDiagonal = otherDiagonal(lines, i - 1, j + 1, 3);
    if (secondDiagonal === "MAS" || secondDiagonal === "SAM") {
      return true;
    }
  }
  return false;
}

part1();
part2();
