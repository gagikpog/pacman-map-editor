import { Dispatch, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DataValue } from './constants';
import { formatMapFromImport } from './normalize/import';
import { confirmation } from './confirm';
import { useDataHistory } from './hooks/useDataHistory';
type TIterationFunc = (row: number, col: number, value: DataValue) => void;
export interface IModel {
    data: DataValue[][];
    width: number;
    height: number;
    brush: DataValue;
    setBrush: Dispatch<SetStateAction<DataValue>>;
    loadData(strData: string):  void;
    forEach(func: TIterationFunc): void;
    create: (width: number, height: number) => void;
    drawPixel(startX: number, startY: number, value: DataValue[][]): void;
}

const DataContext = createContext<IModel>({} as IModel);
export const useData = (): IModel => useContext<IModel>(DataContext);

export const Provider = ({children}: IProps) => {

    const [data, setData] = useDataHistory();
    const [brush, setBrush] = useState(DataValue.Wall);

    const loadData = useCallback((strData: string): void => {
        try {
            setData(formatMapFromImport(strData));
        } catch (error) {
            if (error instanceof Error) {
                confirmation(error.message);
            }
        }
    }, [setData]);

    const forEach = useCallback((func: TIterationFunc): void => {
        data.forEach((rowData: DataValue[], row: number): void => {
            rowData.forEach((value: DataValue, col: number): void => func(row, col, value));
        });
    }, [data]);

    const drawPixel = useCallback((startX: number, startY: number, value: DataValue[][]) => {
        setData((prevData) => {
            let changed = false;

            for (let y = 0; y < value.length; y++) {
                for (let x = 0; x < value[y].length; x++) {
                    const posX = startX + x;
                    const posY = startY - y;
                    if (prevData[posY]?.[posX] !== undefined && value[y][x] !== DataValue.Hidden && prevData[posY][posX] !== value[y][x]) {
                        prevData[posY][posX] = value[y][x];
                        changed = true;
                    }
                }
            }

            return changed ? [...prevData] : prevData;
        });
    }, [setData]);

    const create = useCallback((width: number, height: number) => {
        setData(() => Array(height).fill(null).map(() => Array(width).fill(DataValue.Wall)));
    }, [setData]);

    const value = useMemo<IModel>(() => {
        return { height: data.length, width: data[0]?.length || 0, data, brush, loadData, forEach, setBrush, drawPixel, create };
    }, [data, brush, loadData, forEach, setBrush, drawPixel, create]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}