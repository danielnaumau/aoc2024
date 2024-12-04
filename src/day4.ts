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

function findAllWords(board: string[], location: Coordinate, word: string, delta: Delta): boolean {
    return [...word].every ( (curChar, i) => {
        try {
            return board[location.y + delta.iy * i][location.x + delta.ix * i] === curChar;
        } 
        catch(e) {
            return false;
        }
    });
};

const word = 'XMAS';

const allCoordinates: Coordinate[] = board.flatMap((curLine, y) => [...curLine].map((curChar, x) => curChar === 'X' ? {y: y, x: x} : undefined).filter(value => value !== undefined))

const res = deltas.flatMap(delta => allCoordinates.filter(coordinate => findAllWords(board, coordinate, word, delta))).length;
console.log(res);