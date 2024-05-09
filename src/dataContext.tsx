import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { IDataValue } from './constants';

export interface IModel {
    data: IDataValue[][];
    width: number;
    height: number;
    loadData(strData: string):  void;
}

const DataContext = createContext<IModel>({} as IModel);
export const useData = (): IModel => useContext<IModel>(DataContext);

export const Provider = ({children}: IProps) => {

    const [data, setData] = useState<IDataValue[][]>([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);


    const loadData = useCallback((strData: string): void => {
        const [size, ...rows] = strData.split('\n') || [];
        const [width, height] = size ? size.split(' ') : [];
        const data = rows.map((row): IDataValue[] => row.split('') as IDataValue[]);
        setData(data);
        setWidth(Number(width));
        setHeight(Number(height));
    }, []);

    const value = useMemo<IModel>(() => {
        return { height, width, data, loadData }
    }, [height, width, data, loadData]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}