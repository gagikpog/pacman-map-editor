import { Menu } from './menu';

export default function Header() {
    return (
        <header className="tw-flex tw-bg-slate-700 tw-p-2 tw-text-white">
            <div> PMME </div>
            <Menu className="tw-ml-1" />
        </header>
    );
}
