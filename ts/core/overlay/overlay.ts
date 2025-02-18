
import {JsPlumbInstance} from "../core"
import {Component} from "../component/component"
import {Dictionary, isString, uuid, EventGenerator} from "@jsplumb/util"
import {OverlaySpec, FullOverlaySpec, OverlayOptions} from "@jsplumb/common"


/**
 * Returns whether or not the given overlay spec is a 'full' overlay spec, ie. has a `type` and some `options`, or is just an overlay name.
 * @param o
 */
export function isFullOverlaySpec(o:OverlaySpec):o is FullOverlaySpec {
    return (o as any).type != null && (o as any).options != null
}

/**
 * Convert the given input into an object in the form of a `FullOverlaySpec`
 * @param spec
 */
export function convertToFullOverlaySpec(spec:string | OverlaySpec):FullOverlaySpec {
    let o:FullOverlaySpec = null
    if (isString(spec)) {
        o = { type:spec as string, options:{ } }
    } else {
        o = spec as FullOverlaySpec
    }
    o.options.id = o.options.id || uuid()
    return o
}

export abstract class Overlay extends EventGenerator {

    id:string
    abstract type:string

    cssClass:string

    visible:boolean = true
    location: number | Array<number>

    events?:Dictionary<(value:any, event?:any)=>any>

    constructor(public instance:JsPlumbInstance, public component:Component, p:OverlayOptions) {
        super()
        p = p || {}
        this.id = p.id  || uuid()
        this.cssClass = p.cssClass || ""
        this.location = p.location || 0.5
        this.events = p.events || {}

        for (let event in this.events) {
            this.bind(event, this.events[event])
        }
    }

    shouldFireEvent(event: string, value: any, originalEvent?: Event): boolean {
        return true
    }

    setVisible(v: boolean): void {
        this.visible = v
        this.instance.setOverlayVisible(this, v)
    }

    isVisible(): boolean {
        return this.visible
    }

    abstract updateFrom(d:any):void

    // private _postComponentEvent(eventName:string, originalEvent:Event) {
    //     this.instance.fire(eventName, this.component, originalEvent)
    // }

    // click(e:Event) {
    //     this.fire<OverlayMouseEventParams>(Constants.EVENT_CLICK, {e, overlay:this})
    //     let eventName = this.component instanceof Connection ? Constants.EVENT_CLICK : Constants.EVENT_ENDPOINT_CLICK
    //     this._postComponentEvent(eventName, e)
    // }
    //
    // dblclick(e:Event) {
    //     this.fire<OverlayMouseEventParams>(Constants.EVENT_DBL_CLICK, {e, overlay:this})
    //     let eventName = this.component instanceof Connection ? Constants.EVENT_DBL_CLICK : Constants.EVENT_ENDPOINT_DBL_CLICK
    //     this._postComponentEvent(eventName, e)
    // }
    //
    // tap(e:Event) {
    //     this.fire<OverlayMouseEventParams>(Constants.EVENT_TAP, {e, overlay:this})
    //     let eventName = this.component instanceof Connection ? Constants.EVENT_TAP : Constants.EVENT_ENDPOINT_TAP
    //     this._postComponentEvent(eventName, e)
    // }
    //
    // dbltap(e:Event) {
    //     this.fire<OverlayMouseEventParams>(Constants.EVENT_DBL_TAP, {e, overlay:this})
    //     let eventName = this.component instanceof Connection ? Constants.EVENT_DBL_TAP : Constants.EVENT_ENDPOINT_DBL_TAP
    //     this._postComponentEvent(eventName, e)
    // }

}


export interface OverlayMouseEventParams {
    e:Event
    overlay:Overlay
}




