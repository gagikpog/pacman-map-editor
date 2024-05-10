import { DataValue } from './constants';
const TRACK_LAYER = new Set([DataValue.Track, DataValue.Bonus, DataValue.Score, DataValue.Respawn]);

function isValidTrack(map: DataValue[][], row: number, col: number): boolean {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (map[row - y]?.[col + x] === DataValue.Wall) {
                return false;
            }
        }
    }
    return true;
}

function checkRequiredItem(data: DataValue[][]): void {
    const items = new Map<DataValue, number>([
        [DataValue.Empty, 0],
        [DataValue.Wall, 0],
        [DataValue.Track, 0],
        [DataValue.Bonus, 0],
        [DataValue.Score, 0],
        [DataValue.PrivateTrack, 0],
        [DataValue.Respawn, 0]
    ]);

    data.forEach((rowData) => {
        rowData.forEach((value) => {
            const prevCount = items.get(value) as number;
            items.set(value, prevCount + 1)
        });
    });

    if (items.get(DataValue.Respawn) === 0) {
        throw new Error('PackMen respawn required!');
    }

    if (items.get(DataValue.Respawn) !== 1) {
        throw new Error('Multiple PackMen respawn!');
    }

    if (items.get(DataValue.PrivateTrack) === 0) {
        throw new Error('')
    }

    if (items.get(DataValue.Score) === 0) {
        throw new Error('Scores required!')
    }

    if (items.get(DataValue.Bonus) === 0) {
        throw new Error('Bonuses required!')
    }

}

export function normalizeMap(data: DataValue[][]): DataValue[][] {

    const cloned: DataValue[][] = data.map((row) => row.map((v) => v));

    for (let row = 0; row < cloned.length; row++) {
        for (let col = 0; col < cloned[row].length; col++) {
            if (TRACK_LAYER.has(cloned[row][col])) {
                cloned[row][col] = isValidTrack(cloned, row, col) ? cloned[row][col] : DataValue.Empty;
            }
        }
    }

    checkRequiredItem(data);

    return cloned;
}