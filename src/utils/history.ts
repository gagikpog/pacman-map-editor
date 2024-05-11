import { DataValue } from '../constants';
import { debounce } from './debounce';

export class History {
    private _data: string[] = [];
    private _cursor = -1;
    add: (value: DataValue[][]) => void;

    constructor() {
        this.add = debounce(this._add, 200);
    }

    get(): DataValue[][] {
        return JSON.parse(this._data[this._cursor]);
    }

    back(): boolean {
        if (this._cursor > 0) {
            this._cursor--;
            return true;
        }
        return false;
    }

    forward(): boolean {
        if (this._cursor < this._data.length - 1) {
            this._cursor++;
            return true;
        }
        return false;
    }

    private _add = (value: DataValue[][]): void => {
        if (this._cursor < this._data.length - 1) {
            this._data.splice(this._cursor + 1);
        }
        this._cursor++;
        this._data.push(JSON.stringify(value));
    }
}
