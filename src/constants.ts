export const ITEM_SIZE = 12;

export enum DataValue {
    Empty = '0',
    Wall = '1',
    Track = '2',
    Bonus = '3',
    Score = '4',
    PrivateTrack = '5',
    Respawn = '6',
    Hidden = '-1'
}


export const ITEMS_COLOR = {
    [DataValue.Empty]: '#ddd',
    [DataValue.Wall]: '#000',
    [DataValue.Track]: '#555',
    [DataValue.Bonus]: '#ff0',
    [DataValue.Score]: '#fff',
    [DataValue.PrivateTrack]: '#f00',
    [DataValue.Respawn]: '#00f',
    [DataValue.Hidden]: '#0ff'
};
