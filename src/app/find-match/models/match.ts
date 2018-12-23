import { Map } from "./map";

export class Match {
  id?:string;
  userId?:string;
  maps: Map[];
  rank: string;
  teamSize:string;
  matchType:string;
}
