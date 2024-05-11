type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export function debounce<T extends Function>(callback: T, wait: number) {
    let timeoutId: number;

    type TestArguments = ArgumentTypes<T>

    return (...args: TestArguments) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            callback(...args);
        }, wait) as unknown as number;

    };
}
