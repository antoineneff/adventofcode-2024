async function parseFileInput(): Promise<
  { pairs: number[][]; updates: number[][] }
> {
  const text = await Deno.readTextFile("src/05/input");
  const [pairsRaw, updatesRaw] = text.trim().split("\n\n");
  const pairs = pairsRaw.trim().split("\n").map((p) =>
    p.split("|").map(Number)
  );
  const updates = updatesRaw.trim().split("\n").map((u) =>
    u.split(",").map(Number)
  );
  return { pairs, updates };
}

async function part1() {
  const { pairs, updates } = await parseFileInput();
  let output = 0;
  for (const update of updates) {
    if (isValidUpdate(update, pairs)) {
      const middleIndex = Math.floor(update.length / 2);
      output += update[middleIndex]
    }
  }
  console.log("Part 1:", output)
}

async function part2() {
  const { pairs, updates } = await parseFileInput();
  let output = 0;
  for (const update of updates) {
    if (!isValidUpdate(update, pairs)) {
      const reordered = reorder(update, pairs);
      const middleIndex = Math.floor(reordered.length / 2);
      output += reordered[middleIndex]
    }
  }
  console.log("Part 2:", output)
}

function isValidUpdate(update: number[], pairs: number[][]) {
  for (let i = 0; i < update.length - 1; i++) {
    const number = update[i];
    const followingNumbers = update.slice(i + 1);
    for (const following of followingNumbers) {
      if (!isValidPair(number, following, pairs)) {
        return false;
      }
    }
  }
  return true
}

function isValidPair(first: number, last: number, pairs: number[][]) {
  const matchingPair = pairs.find(pair => pair.includes(first) && pair.includes(last));
  if (!matchingPair) {
    return true;
  }
  if (matchingPair[0] === first && matchingPair[1] === last) {
    return true;
  }
  return false;
}

function reorder(update: number[], pairs: number[][]): number[] {
  const output = [...update];
  let i = 0;
  while (i < output.length) {
    if (!isValidPair(output[i], output[i + 1], pairs)) {
      const temp = output[i];
      output[i] = output[i + 1];
      output[i + 1] = temp;
      i -= 1;
    } else {
      i += 1
    }
  }
  return output;
}

part1();
part2();
