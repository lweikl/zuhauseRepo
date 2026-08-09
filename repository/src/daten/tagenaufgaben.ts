import {Aufgabe} from "./aufgaben.js";


export interface Tagesaufgaben {
    datum: string;
    aufgaben: Aufgabe[];
}
