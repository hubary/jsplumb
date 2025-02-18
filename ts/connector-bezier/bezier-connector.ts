import {AbstractBezierConnector, AbstractBezierOptions} from "./abstract-bezier-connector"
import {Connection, PaintGeometry, ConnectorComputeParams} from "@jsplumb/core"
import { AnchorPlacement } from "@jsplumb/common"

import {BezierSegment} from "./bezier-segment"

/**
 * Options for the Bezier connector.
 */
export interface BezierOptions extends AbstractBezierOptions {}

export class BezierConnector extends AbstractBezierConnector {

    static type = "Bezier"
    type = BezierConnector.type

    majorAnchor:number
    minorAnchor:number

    constructor(public connection:Connection, params:BezierOptions) {
        super(connection, params)
        params = params || {}
        this.majorAnchor = params.curviness || 150
        this.minorAnchor = 10
    }

    getCurviness ():number {
        return this.majorAnchor
    }

    protected _findControlPoint (point:any, sourceAnchorPosition:any, targetAnchorPosition:any, soo:any, too:any) {
        // determine if the two anchors are perpendicular to each other in their orientation.  we swap the control
        // points around if so (code could be tightened up)
        let perpendicular = soo[0] !== too[0] || soo[1] === too[1],
            p = []

        if (!perpendicular) {
            if (soo[0] === 0) {
                p.push(sourceAnchorPosition[0] < targetAnchorPosition[0] ? point[0] + this.minorAnchor : point[0] - this.minorAnchor)
            }
            else {
                p.push(point[0] - (this.majorAnchor * soo[0]))
            }

            if (soo[1] === 0) {
                p.push(sourceAnchorPosition[1] < targetAnchorPosition[1] ? point[1] + this.minorAnchor : point[1] - this.minorAnchor)
            }
            else {
                p.push(point[1] + (this.majorAnchor * too[1]))
            }
        }
        else {
            if (too[0] === 0) {
                p.push(targetAnchorPosition[0] < sourceAnchorPosition[0] ? point[0] + this.minorAnchor : point[0] - this.minorAnchor)
            }
            else {
                p.push(point[0] + (this.majorAnchor * too[0]))
            }

            if (too[1] === 0) {
                p.push(targetAnchorPosition[1] < sourceAnchorPosition[1] ? point[1] + this.minorAnchor : point[1] - this.minorAnchor)
            }
            else {
                p.push(point[1] + (this.majorAnchor * soo[1]))
            }
        }

        return p
    }

    _computeBezier (paintInfo:PaintGeometry, p:ConnectorComputeParams, sp:AnchorPlacement, tp:AnchorPlacement, _w:number, _h:number):void {

        let _CP, _CP2,
            _sx = sp.curX < tp.curX ? _w : 0,
            _sy = sp.curY < tp.curY ? _h : 0,
            _tx = sp.curX < tp.curX ? 0 : _w,
            _ty = sp.curY < tp.curY ? 0 : _h

        if (this.edited !== true) {
            _CP = this._findControlPoint([_sx, _sy], sp, tp, paintInfo.so, paintInfo.to)
            _CP2 = this._findControlPoint([_tx, _ty], tp, sp, paintInfo.to, paintInfo.so)

        } else {
            _CP = this.geometry.controlPoints[0]
            _CP2 = this.geometry.controlPoints[1]
        }

        this.geometry = {
            controlPoints:[_CP, _CP2],
            source:p.sourcePos,
            target:p.targetPos

        }

        this._addSegment(BezierSegment, {
            x1: _sx, y1: _sy, x2: _tx, y2: _ty,
            cp1x: _CP[0], cp1y: _CP[1], cp2x: _CP2[0], cp2y: _CP2[1]
        })
    }

}
