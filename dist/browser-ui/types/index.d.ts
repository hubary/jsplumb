import { BrowserJsPlumbDefaults, BrowserJsPlumbInstance } from "./browser-jsplumb-instance";
export * from './constants';
export * from './browser-jsplumb-instance';
export * from './collicat';
export { EVENT_DRAG_START, EVENT_DRAG_MOVE, EVENT_DRAG_STOP, EVENT_CONNECTION_DRAG, EVENT_CONNECTION_ABORT } from './constants';
export { EventManager, pageLocation, touches, touchCount, getTouch } from './event-manager';
export * from "./browser-util";
export * from './element-facade';
export * from './element-drag-handler';
export declare function newInstance(defaults?: BrowserJsPlumbDefaults): BrowserJsPlumbInstance;
export declare function ready(f: Function): void;
