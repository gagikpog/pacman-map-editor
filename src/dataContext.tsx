import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DataValue } from './constants';
type TIterationFunc = (row: number, col: number, value: DataValue) => void;
export interface IModel {
    data: DataValue[][];
    width: number;
    height: number;
    loadData(strData: string):  void;
    forEach(func: TIterationFunc): void;
}

const DataContext = createContext<IModel>({} as IModel);
export const useData = (): IModel => useContext<IModel>(DataContext);

export const Provider = ({children}: IProps) => {

    const [data, setData] = useState<DataValue[][]>([]);

    const loadData = useCallback((strData: string): void => {
        const [, ...rows] = strData.split('\n') || [];
        const data = rows.map((row): DataValue[] => row.trim().split('') as DataValue[]);
        setData(data);
    }, []);

    const forEach = useCallback((func: TIterationFunc): void => {
        data.forEach((rowData: DataValue[], row: number): void => {
            rowData.forEach((value: DataValue, col: number): void => func(row, col, value));
        });
    }, [data]);

    const value = useMemo<IModel>(() => {
        return { height: data.length, width: data[0]?.length || 0, data, loadData, forEach };
    }, [data, loadData, forEach]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}