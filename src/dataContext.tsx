import { Dispatch, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DataValue } from './constants';
type TIterationFunc = (row: number, col: number, value: DataValue) => void;
export interface IModel {
    data: DataValue[][];
    width: number;
    height: number;
    brush: DataValue;
    setBrush: Dispatch<SetStateAction<DataValue>>;
    loadData(strData: string):  void;
    forEach(func: TIterationFunc): void;
    drawPixel(startX: number, startY: number, value: DataValue[][]): void;
}

const DataContext = createContext<IModel>({} as IModel);
export const useData = (): IModel => useContext<IModel>(DataContext);

export const Provider = ({children}: IProps) => {

    const [data, setData] = useState<DataValue[][]>([]);
    const [brush, setBrush] = useState(DataValue.Wall);

    const loadData = useCallback((strData: string): void => {
        const [, ...rows] = strData.split('\n') || [];
        const data = rows.map((row): DataValue[] => row.trim().split('').map((value): DataValue => {
            switch (value) {
                case DataValue.Track:
                case DataValue.Empty:
                    return DataValue.Track
                default:
                    return value as DataValue;
            }
        }));
        setData(data);
    }, []);

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
    }, []);

    const value = useMemo<IModel>(() => {
        return { height: data.length, width: data[0]?.length || 0, data, brush, loadData, forEach, setBrush, drawPixel };
    }, [data, brush, loadData, forEach, setBrush, drawPixel]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}