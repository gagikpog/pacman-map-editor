import Header from '../components/header';
import { Editor } from '../components/editor';
import { Menu } from '../components/menu';


export default function App() {
    return (
        <>
            <Header/>
            <main className='tw-flex tw-flex-col tw-h-full tw-flex-1'>
                <Menu/>
                <Editor className='tw-m-auto' />
            </main>
        </>
    );
}
