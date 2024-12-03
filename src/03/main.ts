const MUL_REGEX = /mul\(\d{1,3},\d{1,3}\)/g;
const DONT_REGEX = /don't\(\).*?do\(\)/g;

async function part1() {
  const text = await Deno.readTextFile("src/03/input");
  const matches = text.match(MUL_REGEX) ?? [];
  const output = multiplyMatches(matches);
  console.log("Part 1:", output);
}

async function part2() {
  const input = await Deno.readTextFile("src/03/input");
  const singleLine = input.replaceAll("\n", "");
  // In case there is a last remaining don't() at the end
  // of the input without any do() following it
  const text = singleLine.concat("do()");
  const clean = text.replaceAll(DONT_REGEX, "");
  const matches = clean.match(MUL_REGEX) ?? [];
  const output = multiplyMatches(matches);
  console.log("Part 2:", output);
}

function multiplyMatches(matches: string[]) {
  let output = 0;
  for (const match of matches) {
    const numbers = match.slice(4, -1).split(",");
    const [a, b] = numbers.map(Number);
    output += a * b;
  }
  return output;
}

part1();
part2();
