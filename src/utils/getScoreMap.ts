import { confirmation } from '../confirm';
import { DataValue } from '../constants';
import { formatMapForExport } from '../normalize/export';

export function getScoreMap(data: DataValue[][]): DataValue[][] {
    try {
        const formatData = formatMapForExport(data);
        let stepX = 1;
        let stepY = 1;

        formatData.find((rowData, row) => {
            return rowData.find((value, col) => {
                const isScore = value === DataValue.Score;
                if (isScore) {
                    stepX = col % 2;
                    stepY = row % 2;
                }
                return isScore;
            });
        });

        const result: DataValue[][] = Array(data.length).fill(null).map(() => Array(data[0].length).fill(DataValue.Hidden));

        formatData.forEach((rowData, row) => {
            rowData.forEach((value, col) => {
                if (value === DataValue.Track && row % 2 === stepY && col % 2 === stepX) {
                    result[row][col] = DataValue.Score;
                }
            });
        });

        return result.reverse();

    } catch (error) {
        if (error instanceof Error) {
            confirmation(error.message);
        }
        return [];
    }
}
