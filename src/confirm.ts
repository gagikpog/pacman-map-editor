export function confirmation(message: string): void {
    const config = { MBOK: true, theme: 'dark', modal: false };
    resolveConfirm().then(() =>{
        // @ts-ignore
        window.showConfirm('', message, config);
    });
}


async function resolveConfirm(): Promise<void> {
    if ('showConfirm' in window) {
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://gagikpog.ru/data/libs/confirm.min3.js';

    return new Promise((resolve) => {
        script.onload = () => resolve();
        script.onerror = () => {
            // @ts-ignore
            window.showConfirm = (_: string, message: string) => window.confirm(message);
            resolve();
        };
        document.body.appendChild(script);
    });
}
