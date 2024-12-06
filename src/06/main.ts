async function parseFileInput(): Promise<string[][]> {
  const text = await Deno.readTextFile("src/06/input");
  const lines = text.trim().split("\n");
  return lines.map((line) => line.split(""));
}

type Position = [number, number];
type Direction = "up" | "down" | "right" | "left";

const DIRECTION_MATRIX: Record<Direction, Position> = {
  "up": [-1, 0],
  "down": [1, 0],
  "left": [0, -1],
  "right": [0, 1],
};

const NEXT_DIRECTION: Record<Direction, Direction> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

async function part1() {
  const map = await parseFileInput();
  const position = findStart(map);
  const direction: Direction = "up";
  const [steps] = patrol(position, direction, map);
  console.log("Part 1:", steps.length);
}

async function part2() {
  const map = await parseFileInput();
  const position = findStart(map);
  const direction: Direction = "up";
  const obstacles = new Set();
  const [steps] = patrol(position, direction, map);
  for (let k = 1; k < steps.length; k++) {
    const [i, j] = steps[k];
    const branchMap = createMapWithObstacle(map, [i, j]);
    branchMap[i][j] = '#';
    const [, inLoop] = patrol(position, direction, branchMap);
    if (inLoop) {
      obstacles.add(`${i},${j}`)
    }
  }
  console.log("Part 2:", obstacles.size);
}

function findStart(map: string[][]): Position {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "^") {
        return [i, j]
      }
    }
  }
  throw Error("Unreachable");
}

function isObstacle(position: Position, map: string[][]) {
  return map[position[0]][position[1]] === '#';
}

function isOutside(position: Position, map: string[][]) {
  return position[0] < 0 || position[0] >= map.length || position[1] < 0 || position[1] >= map[0].length;
}

function walk(position: Position, direction: Direction) {
  const step = DIRECTION_MATRIX[direction];
  return [position[0] + step[0], position[1] + step[1]];
}

function patrol(position: Position, direction: Direction, map: string[][]): [Position[], boolean] {
  const uniquePositions: Position[] = [];
  const uniquePositionsWithDir = new Set();
  while(true) {
    if (uniquePositionsWithDir.has(`${position[0]},${position[1]},${direction}`)) {
      return [uniquePositions, true];
    }
    if (!uniquePositions.find(p => p[0] === position[0] && p[1] === position[1])) {
      uniquePositions.push([position[0], position[1]]);
    }
    uniquePositionsWithDir.add(`${position[0]},${position[1]},${direction}`);
    const [i, j] = walk(position, direction);
    if (isOutside([i, j], map)) {
      return [uniquePositions, false];
    }
    if (!isObstacle([i, j], map)) {
      position = [i, j];
    } else {
      direction = NEXT_DIRECTION[direction];
    }
  }
}

function createMapWithObstacle(map: string[][], obstaclePos: Position): string[][] {
  const newMap: string[][] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (!newMap[i]) {
        newMap[i] = [];
      }
      newMap[i][j] = map[i][j];
      if (i === obstaclePos[0] && j === obstaclePos[1]) {
        newMap[i][j] = '#'
      }
    }
  }
  return newMap;
}

part1();
part2();
