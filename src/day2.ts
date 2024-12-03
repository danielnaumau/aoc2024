import * as fs from 'fs';
import * as _ from 'lodash';

const input = fs.readFileSync('data/day2.txt', 'utf-8');

const parsedInput = input.split('\n').map(line => line.split(' ').map(value => parseInt(value)));

let failedIndex: number;


function analyzeLine(values: number[]): boolean {
    const [head, ...tail] = values;
    if(head == tail[0]) {
        failedIndex = 1;
        return false;
    }
    
    const isIncreasing = head < tail[0];

    return _.every(tail, (curNumber, i) => {
        const diff = Math.abs(curNumber - values[i]);
        if(diff > 3 || diff < 1) {
            failedIndex = i + 1;
            return false;
        }
        let finalRes: boolean;
        if(isIncreasing) finalRes = curNumber > values[i];
        else finalRes = curNumber < values[i];

        if(!finalRes)
            failedIndex = i + 1;

        return finalRes;
    });
}

function removeElement(line: number[], index: number): number[] {
    return [...line.slice(0, index), ...line.slice(index + 1)]
}

/*
const res = parsedInput.filter(line => analyzeLine(line)).length;
console.log(res);
*/

/*
function testNeighbour(curLine: number[], index: number): boolean {
    if (index >= 0 && index < curLine.length - 1)
        return analyzeLine(removeElement(curLine, index))
    else return false;
}*/



const analyzeWithRemoving = (report: number[]) => {
    if (analyzeLine(report)) return true;
    for (let i = 0; i < report.length; i++) {
      if (analyzeLine([...report.slice(0, i), ...report.slice(i + 1)])) {
        return true;
      }
    }
    return false;
};

const res2 = parsedInput.filter(line => analyzeWithRemoving(line)).length;
console.log(res2);