import { Moment } from "moment";

export interface IDrvierInfor {
  id: number;
  grandPrix: string;
  date: Moment;
  winner: string;
  car: string;
  laps: number;
  time: string;
}

export interface IDrvierFilter {
  year?: string;
  grandPrix?: string;
  date?: Moment;
  winner?: string;
  car?: string;
  laps?: number;
  time?: string;
}

export interface ITeam {
  id: string;
  name: string;
  points: number;
}
