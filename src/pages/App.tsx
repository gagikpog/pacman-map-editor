import Header from '../components/header';
import { Editor } from '../components/editor';

export default function App() {
    return (
        <>
            <Header/>
            <main className='tw-flex tw-h-full tw-flex-1'>
                <Editor className='tw-m-auto' />
            </main>
        </>
    );
}
