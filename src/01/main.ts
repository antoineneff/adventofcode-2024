async function parseFileInput(): Promise<[number[], number[]]> {
  const text = await Deno.readTextFile("src/01/input");
  const lines = text.trim().split("\n");
  const numbers = lines.map((line) => line.split(/\s+/).map(Number));
  const firstList = numbers.map((n) => n[0]);
  const secondList = numbers.map((n) => n[1]);
  return [firstList, secondList];
}

async function part1() {
  const [firstList, secondList] = await parseFileInput();
  const sortedFirst = firstList.sort((a, b) => a - b);
  const sortedSecond = secondList.sort((a, b) => a - b);
  let output = 0;
  for (let i = 0; i < firstList.length; i++) {
    const first = sortedFirst[i];
    const second = sortedSecond[i];
    output += Math.abs(first - second);
  }
  console.log("Part 1:", output);
}

async function part2() {
  const [firstList, secondList] = await parseFileInput();
  let output = 0;
  for (const number of firstList) {
    const numberOfAppearances = secondList.filter((n) => n === number).length;
    output += number * numberOfAppearances;
  }
  console.log("Part 2:", output);
}

part1();
part2();
