import { SelectionBase } from "./common";
import { Connection } from "../connector/connection-impl";
import { ConnectorSpec } from "@jsplumb/common";
export declare class ConnectionSelection extends SelectionBase<Connection> {
    setDetachable(d: boolean): ConnectionSelection;
    setReattach(d: boolean): ConnectionSelection;
    setConnector(spec: ConnectorSpec): ConnectionSelection;
    deleteAll(): void;
    repaint(): ConnectionSelection;
}
