import * as _ from 'lodash';
import * as fs from 'fs';

const inputStr = fs.readFileSync('data/day3.txt', 'utf-8');

//const str = 'mul4mul3,mul1';
//mul\([0-9]{1,3},[0-9]{1,3}\)

function solve(lines: string[]): number {
    const parsed = lines
        .map(line => line.substring(0, line.length - 1).substring(4).split(',').map(num => parseInt(num)));
    
    return _.sum(parsed.map(numbers => numbers[0] * numbers[1]));
}

const r1 = /mul\(\d{1,3},\d{1,3}\)/g;
const matched1 = [...inputStr.matchAll(r1)].map(matched => matched[0]);

console.log(solve(matched1));

const r2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don[']t\(\)/g;
const matched2 = [...inputStr.matchAll(r2)];

let enabled = true;

const filteredMatches = matched2.map(line => line[0]).filter(curMatch => {
    if(curMatch === 'don\'t()') {
        enabled = false;
        return false;
    }
    else if (curMatch == 'do()') {
        enabled = true;
        return false;
    }
    else {
        return enabled;
    }
});

console.log(solve(filteredMatches))
