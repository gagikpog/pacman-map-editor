export function importData(): Promise<string> {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.lmp';
    input.classList.add('tw-hidden')
    return new Promise<string>((resolve) => {
        input.onchange = () => {
            resolve(getData(input))
        }
        input.onabort = () => {
            resolve('');
        }
        document.body.appendChild(input);
        input.click();
    }).then((res: string) => {
        input.remove();
        return res;
    });
}

function getData(input: HTMLInputElement): Promise<string> {
    return new Promise<string>((resolve) => {
        const files = input.files;
        const reader = new FileReader();
        reader.onload = function () {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                resolve('');
            }
        };
        reader.onerror = () => resolve('');

        if(files?.length) {
            reader.readAsText(files[0]);
        } else {
            resolve('');
        }
    }).then((res: string) => {
        input.remove();
        return res;
    });
}
