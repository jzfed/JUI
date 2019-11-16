import {
    Util
} from '../../core/util';
class DragAble {
    constructor({
        container = document.body,
        selector = '',
        enterDropTarget = () => {},
        leaveDropTarget = () => {},
        mouseUpCallback = () => {},
    } = {}) {
        this.container = container;
        this.selector = selector;
        this.enterDropTarget = enterDropTarget;
        this.leaveDropTarget = leaveDropTarget;
        this.mouseUpCallback = mouseUpCallback;
        this.dropTarget = null;
        this.init();
    }
    init() {
        this.bindMove = this.bindMove.bind(this);
        this.unbindMove = this.unbindMove.bind(this);
        this.move = this.move.bind(this);
        this.moveThr = Util.throtting(this.move, 50);
        this.enterDropTarget = this.enterDropTarget.bind(this);
        this.enterDropTarget = this.enterDropTarget.bind(this);
        this.bindEvent();
    }
    bindEvent() {
        this.container.addEventListener('mousedown', this.bindMove);
        this.container.addEventListener('mouseup', this.unbindMove);
        this.container.addEventListener('mouseleave', this.unbindMove);
    }
    isDragElement(element) {
        return !!element.closest(this.selector);
    }
    bindMove(e) {
        const target = e.target;
        if (!this.isDragElement(target)) {
            return;
        }
        this.dragElement = target.closest(this.selector);
        const {
            left: dragElementX,
            top: dragElementY,
            width: dragElementWidth,
            height: dragElementHeight,
        } = this.dragElement.getBoundingClientRect();
        const {
            left: containerX,
            top: containerY,
            width: maxPosX,
            height: maxPosY,
        } = this.container.getBoundingClientRect();
        this.offsetX = e.pageX - dragElementX;
        this.offsetY = e.pageY - dragElementY;
        this.containerX = containerX;
        this.containerY = containerY;
        this.maxPosX = maxPosX - dragElementWidth;
        this.maxPosY = maxPosY - dragElementHeight;
        this.dragElement.classList.add('drag-move');
        this.container.addEventListener('mousemove', this.moveThr);
    }
    move(e) {
        // console.log('move');
        const posX = e.pageX - this.containerX - this.offsetX;
        const posY = e.pageY - this.containerY - this.offsetY;
        this.setPos({
            posX,
            posY,
        });
        this.canDrop(e);
    }
    canDrop(e) {
        this.dragElement.hidden = true;
        const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
        this.dragElement.hidden = false;

        if (elementUnderMouse && elementUnderMouse.closest('.jui-drag-target')) {
            // console.dir(elementUnderMouse.closest('.jui-drag-target'));
            if (this.dropTarget === null) {
                this.dropTarget = elementUnderMouse.closest('.jui-drag-target');
                this.enterDropTarget(this.dropTarget);
            }
        } else {
            if (this.dropTarget) {
                this.leaveDropTarget(this.dropTarget);
                this.dropTarget = null;
            }
        }
    }
    setPos(posObj) {
        this.limit(posObj);
        this.dragElement.style.left = `${posObj.posX}px`;
        this.dragElement.style.top = `${posObj.posY}px`;
    }
    limit(posObj) {
        posObj.posX = Util.limitNumberMinMax(0, this.maxPosX, posObj.posX);
        posObj.posY = Util.limitNumberMinMax(0, this.maxPosY, posObj.posY);
    }
    unbindMove(e) {
        if (!this.dragElement) {
            return;
        }
        this.mouseUpCallback(this.dragElement);
        this.container.removeEventListener('mousemove', this.moveThr);
        // this.dragElement.classList.remove('drag-move');
        this.dropTarget = null;
        this.dragElement = null;
        this.offsetX = 0;
        this.offsetY = 0;
    }
}
export {
    DragAble,
}