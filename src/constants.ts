export const ITEM_SIZE = 10;


export enum DataValue {
    Empty = '0',
    Wall = '1',
    Track = '2',
    Bonus = '3',
    Score = '4',
    PrivateTrack = '5',
    Respawn = '6'
}


export const ITEMS_COLOR = {
    [DataValue.Empty]: '#ddd',
    [DataValue.Wall]: '#000',
    [DataValue.Track]: '#555',
    [DataValue.Bonus]: '#ff0',
    [DataValue.Score]: '#0f0',
    [DataValue.PrivateTrack]: '#f00',
    [DataValue.Respawn]: '#00f'
};
