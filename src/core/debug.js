const debug = {
    log(...info) {
        console.log(`[${this.constructor.name}]${new Date()}`);
        console.log.apply(undefined, info);
    }
};

export {
    debug,
}