import { PlayerDefinition } from "./player";

interface Player {
  name: string;
  playerid: string;
}

export interface batchDefinition {
  _id: string;
  batch_name: string;
  coach_id: string;
  description: string;
  players: Player[];
}
