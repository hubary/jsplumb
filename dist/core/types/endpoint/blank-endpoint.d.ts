import { EndpointRepresentation } from "./endpoints";
import { Endpoint } from "./endpoint";
import { EndpointHandler } from "../factory/endpoint-factory";
import { BlankEndpointParams } from "@jsplumb/common";
export declare type ComputedBlankEndpoint = [number, number, number, number];
export declare class BlankEndpoint extends EndpointRepresentation<ComputedBlankEndpoint> {
    constructor(endpoint: Endpoint, params?: BlankEndpointParams);
    static type: string;
    type: string;
}
export declare const BlankEndpointHandler: EndpointHandler<BlankEndpoint, ComputedBlankEndpoint>;
