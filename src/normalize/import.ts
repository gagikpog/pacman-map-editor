import { DataValue } from '../constants';

export function formatMapFromImport(strData: string): DataValue[][] {

    const trimData =  strData.trim();

    if (!trimData) {
        throw new Error('There is an empty file');
    }

    const [, ...rows] = trimData.trim().split('\n') || [];
    const data = rows.map((row): DataValue[] => row.trim().split('').map((value): DataValue => {
        switch (value) {
            case DataValue.Track:
            case DataValue.Empty:
                return DataValue.Track
            case DataValue.Wall:
                return DataValue.Wall
            case DataValue.Bonus:
                return DataValue.Bonus
            case DataValue.Score:
                return DataValue.Score
            case DataValue.PrivateTrack:
                return DataValue.PrivateTrack
            case DataValue.Respawn:
                return DataValue.Respawn
            default:
                throw new Error('Invalid file data');
        }
    }));

    let size = data[0].length;

    if (!size) {
        throw new Error('There is an empty line in the file');
    }

    data.forEach((row) => {
        if (row.length !== size) {
            throw new Error('The map from the file has different line lengths');
        }
    });

    return data;
}
