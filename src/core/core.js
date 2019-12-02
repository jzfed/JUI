class JUI {
    static mixin(originalClass, ...mixObjects) {
        Object.assign(originalClass.prototype, ...mixObjects);
    }
}
export {
    JUI,
}