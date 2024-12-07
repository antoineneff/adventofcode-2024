async function parseFileInput(): Promise<Array<[number, number[]]>> {
  const text = await Deno.readTextFile("src/07/input");
  const lines = text.trim().split("\n");
  return lines.map((line) => {
    const [value, numbers] = line.split(":");
    return [Number(value), numbers.trim().split(" ").map(Number)];
  });
}

async function part1() {
  const equations = await parseFileInput();
  let output = 0;
  for (const [value, numbers] of equations) {
    if (isValidEquation(value, numbers, [add, multiply])) {
      output += value;
    }
  }
  console.log("Part 1:", output);
}

async function part2() {
  const equations = await parseFileInput();
  let output = 0;
  for (const [value, numbers] of equations) {
    if (isValidEquation(value, numbers, [add, multiply, concat])) {
      output += value;
    }
  }
  console.log("Part 2:", output);
}

function isValidEquation(value: number, numbers: number[], operators: ((a: number, b: number) => number)[]) {
  let results: number[] = [];
  for (let i = 1; i < numbers.length; i++) {
    const newResults: number[] = [];
    if (i === 1) {
      for (const operator of operators) {
        newResults.push(operator(numbers[i - 1], numbers[i]))
      }
    } else {
      for (let j = 0; j < results.length; j++) {
        for (const operator of operators) {
          newResults.push(operator(results[j], numbers[i]))
        }
      }
    }
    results = [...newResults]
  }
  return results.some(result => result === value);
}

function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

function concat(a: number, b: number) {
  return Number(a.toString() + b.toString());
}

part1();
part2();
