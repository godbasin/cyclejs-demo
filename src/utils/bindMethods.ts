// bind this to instance for class method
export function bindMethods(oldConstructor) {
    const newConstructor: any = function(...args) {
        const instance = new oldConstructor(...args);
        const prototype = oldConstructor.prototype;

        Object.keys(prototype).forEach(key => {
            if (typeof prototype[key] === 'function') {
                instance[key] = prototype[key].bind(instance);
            }
        });

        return instance;
    };

    // copy constructor $inject property
    Object.assign(newConstructor, oldConstructor);

    newConstructor.prototype = oldConstructor.prototype;
    return newConstructor;
}