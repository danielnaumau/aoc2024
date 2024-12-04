import * as _ from 'lodash';
import * as fs from 'fs';

type Coordinate = {
    x: number;
    y: number;
};

type Delta = {
    ix: number;
    iy: number;
}

const board = fs.readFileSync('data/day4.txt', 'utf-8').split('\n');


const deltas = [
    {ix: -1, iy: -1},
    {ix: -1, iy: 0},
    {ix: 0, iy: -1},
    {ix: 1, iy: -1},
    {ix: -1, iy: 1},
    {ix: 0, iy: 1},
    {ix: 1, iy: 0},
    {ix: 1, iy: 1},
];

function matchWord(board: string[], location: Coordinate, word: string, delta: Delta): boolean {
    return [...word].every ( (curChar, i) => {
        try {
            return board[location.y + delta.iy * i][location.x + delta.ix * i] === curChar;
        } 
        catch(e) {
            return false;
        }
    });
};

function findAllIndexes(board: string[], symbol: string): Coordinate[] {
    return board.flatMap((curLine, y) => [...curLine].map((curChar, x) => curChar === symbol ? {y: y, x: x} : undefined).filter(value => value !== undefined))
}

const word = 'XMAS';

const allCoordinates = findAllIndexes(board, 'X')

const res = deltas.flatMap(delta => allCoordinates.filter(coordinate => matchWord(board, coordinate, word, delta))).length;
console.log(res);



const cutBoard =  board.slice(1, board.length - 1).map(line => line.slice(1, line.length - 1));
const allCoordinates2 = findAllIndexes(cutBoard, 'A')


const matchWords = (board: string[], words: string[], delta: Delta, coordinate: Coordinate) => {
    return words.some(word => matchWord(board, coordinate, word, delta));
}

const res2 = allCoordinates2.filter(coordinate => 
    matchWords(board, ['MAS', 'SAM'], {ix: 1, iy: 1}, coordinate) && matchWords(board, ['MAS', 'SAM'], {ix: -1, iy: 1}, {x: coordinate.x + 2, y: coordinate.y})
).length;


console.log(res2);

