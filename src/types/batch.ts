import { PlayerDefinition } from "./player";

export interface batchDefinition {
  id: number;
  name: string;
  description: string;
  playerIds: number[];
  players: PlayerDefinition[];
}
