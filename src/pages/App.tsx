import Header from '../components/header';
import { Editor } from '../components/editor';
import { Menu } from '../components/menu';
import { useData } from '../dataContext';
import { Empty } from '../components/empty';


export default function App() {
    const {data} = useData();
    return (
        <>
            <Header/>
            <main className='tw-flex tw-h-full tw-flex-1 tw-min-h-0'>
                <Menu/>
                <div className='tw-flex tw-w-full tw-h-full tw-overflow-y-auto'>
                    {
                        data.length ? <Editor className='tw-m-auto' /> : <Empty className='tw-m-auto' />
                    }
                </div>
            </main>
        </>
    );
}
