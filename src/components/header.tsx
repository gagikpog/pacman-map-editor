import { Icon } from './icon';

export default function Header() {
    return (
        <header className="tw-flex tw-bg-slate-700 tw-p-2 tw-text-white tw-sticky tw-top-0 tw-items-center">
            <Icon icon="logo" type="png" size={32}/>
            <div className="tw-ml-2 tw-uppercase"> PacMan map editor</div>
        </header>
    );
}
