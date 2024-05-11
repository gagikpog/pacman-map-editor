import { DataValue } from '../constants';
import { useData } from '../dataContext';
import { Icon } from './icon';

export const Brushes = (props: IProps) => {
    const {brush, setBrush} = useData();

    return (
        <div className={`${props.className || ''} tw-flex tw-items-center tw-gap-y-1 tw-flex-col`}>
            <Icon icon="wall" selected={brush === DataValue.Wall} title='wall' onClick={() => setBrush(DataValue.Wall)}/>
            <Icon icon="track" selected={brush === DataValue.Track} title='track' onClick={() => setBrush(DataValue.Track)}/>
            <Icon icon="score" selected={brush === DataValue.Score} title='score' onClick={() => setBrush(DataValue.Score)}/>
            <Icon icon="bonus" selected={brush === DataValue.Bonus} title='bonus' onClick={() => setBrush(DataValue.Bonus)}/>
            <Icon icon="respawn" selected={brush === DataValue.Respawn} title='PacMan respawn' onClick={() => setBrush(DataValue.Respawn)}/>
            <Icon icon="privateTrack" selected={brush === DataValue.PrivateTrack} title='mobs respawn' onClick={() => setBrush(DataValue.PrivateTrack)}/>
        </div>
    );
}
