import * as fs from 'fs';
import * as _ from 'lodash';

function procesLocationIds(index: number, locationIds: number [][]): number [] {
  return locationIds.map(line => line[index]).sort((n1,n2) => n1 - n2);
};

function count(numbers: number[]) {
  const counts: { [key: number]: number } = {};

  for (const num of numbers) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
}

const input = fs.readFileSync('data/day1.txt','utf8');

const locationIds = input.split('\n').map(line => line.split('   ').map(number => parseInt(number)));

const leftIds: number[] = procesLocationIds(0, locationIds);
const rightIds: number[] = procesLocationIds(1, locationIds);


// Part 1
const res2 = leftIds.map((value, ind) => {
  return Math.abs(rightIds[ind] - value);
});

console.log(_.sum(res2));

// Part 2

const countedNumbers = _.mapValues(_.groupBy(rightIds, i => i), i => i.length);

const finalRes = leftIds.map(id => (countedNumbers[id] ?? 0) * id);
console.log(_.sum(finalRes));

