import {Kategorie} from "./kategorie.js";
export interface Aufgabe {
    id: string;
    titel: string;
    zeit: string;
    kategorie: Kategorie;
    anleitung?: string;
}

