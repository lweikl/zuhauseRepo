import { Aufgabe } from "../daten/aufgaben.js";
import { aufgaben } from "../daten/aufgabenKalendar.js";
import { Tagesaufgaben } from "../daten/tagenaufgaben.js";
import { brunnenAnleitung } from "../anleitungen/brunnen.js";

//Brunnen funktion
function zeigeBrunnenAnleitung(): void {

    const overlay = document.createElement("div");
    overlay.className = "anleitung-overlay";

    const fenster = document.createElement("div");
    fenster.className = "anleitung-fenster";

    const kopf = document.createElement("div");
    kopf.className = "anleitung-kopf";

    const titel = document.createElement("h2");
    titel.textContent = "💧 Brunnen reinigen";

    const schliessenButton =
        document.createElement("button");

    schliessenButton.className =
        "anleitung-schliessen";

    schliessenButton.textContent = "✕";
    schliessenButton.setAttribute(
        "aria-label",
        "Anleitung schließen"
    );

    schliessenButton.addEventListener(
        "click",
        () => {
            overlay.remove();
        }
    );

    kopf.appendChild(titel);
    kopf.appendChild(schliessenButton);

    fenster.appendChild(kopf);


    const inhalt =
        document.createElement("div");

    inhalt.className =
        "anleitung-inhalt";


    brunnenAnleitung.forEach(
        (schritt, index) => {

            const schrittElement =
                document.createElement("article");

            schrittElement.className =
                "anleitung-schritt";


            const nummer =
                document.createElement("h3");

            nummer.textContent =
                `Schritt ${index + 1}`;


            const bild =
                document.createElement("img");

            bild.src = schritt.bild;

            bild.alt =
                `Brunnen Anleitung Schritt ${index + 1}`;

            bild.loading = "lazy";


            const text =
                document.createElement("p");

            text.textContent =
                schritt.text;


            schrittElement.appendChild(nummer);
            schrittElement.appendChild(bild);
            schrittElement.appendChild(text);

            inhalt.appendChild(
                schrittElement
            );
        }
    );


    fenster.appendChild(inhalt);
    overlay.appendChild(fenster);

    document.body.appendChild(overlay);


    // Schließen mit Klick neben das Fenster
    overlay.addEventListener(
        "click",
        (event) => {

            if (event.target === overlay) {
                overlay.remove();
            }
        }
    );


    // Schließen mit Escape
    document.addEventListener(
        "keydown",
        function escapeHandler(event) {

            if (event.key === "Escape") {

                overlay.remove();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );
            }
        }
    );
}

let ausgewaehltesDatum = getHeute();


function getHeute(): string {
    const heute = new Date();

    const jahr = heute.getFullYear();
    const monat = String(heute.getMonth() + 1).padStart(2, "0");
    const tag = String(heute.getDate()).padStart(2, "0");

    return `${jahr}-${monat}-${tag}`;
}

function formatDatum(datum: string): string {
    const date = new Date(datum + "T00:00:00");

    return date.toLocaleDateString("de-DE", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit"
    });
}


function formatLangesDatum(datum: string): string {
    const date = new Date(datum + "T00:00:00");

    return date.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
function getAufgabenFuerTag(
    datum: string
): Aufgabe[] {

    const tag: Tagesaufgaben | undefined =
        aufgaben.find(
            (eintrag: Tagesaufgaben) =>
                eintrag.datum === datum
        );

    return tag?.aufgaben ?? [];
}

function istErledigt(
    aufgabeId: string,
    datum: string
): boolean {

    return localStorage.getItem(
        `erledigt-${datum}-${aufgabeId}`
    ) === "true";
}


function setErledigt(
    aufgabeId: string,
    datum: string,
    erledigt: boolean
): void {

    localStorage.setItem(
        `erledigt-${datum}-${aufgabeId}`,
        String(erledigt)
    );
}


/* =========================
   TAGE
   ========================= */

function erstelleTage(): void {

    const container =
        document.getElementById("tage");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const heute = new Date();

    // Zwei Tage zurück und vier Tage voraus
    for (let i = -2; i <= 4; i++) {

        const datum = new Date(heute);

        datum.setDate(
            heute.getDate() + i
        );

        const datumString =
            `${datum.getFullYear()}-${String(
                datum.getMonth() + 1
            ).padStart(2, "0")}-${String(
                datum.getDate()
            ).padStart(2, "0")}`;


        const button =
            document.createElement("button");

        button.className = "tag";

        if (
            datumString === ausgewaehltesDatum
        ) {
            button.classList.add("aktiv");
        }

        button.textContent =
            formatDatum(datumString);


        button.addEventListener(
            "click",
            () => {

                ausgewaehltesDatum =
                    datumString;

                erstelleTage();
                zeigeAufgaben();
            }
        );


        container.appendChild(button);
    }
}


/* =========================
   AUFGABEN
   ========================= */

function zeigeAufgaben(): void {

    const container =
        document.getElementById(
            "aufgaben-container"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    const tagesAufgaben =
        getAufgabenFuerTag(
            ausgewaehltesDatum
        );


    if (tagesAufgaben.length === 0) {

        container.innerHTML = `
            <div class="keine-aufgaben">
                <p>🎉 Heute stehen keine Aufgaben an.</p>
            </div>
        `;

        return;
    }


    // Kategorien
    const katzen =
        tagesAufgaben.filter(
            (aufgabe: Aufgabe) =>
                aufgabe.kategorie === "katzen"
        );
    const haushalt =
        tagesAufgaben.filter(
            (aufgabe: Aufgabe) =>
                aufgabe.kategorie === "haushalt"
        );
    const test: Aufgabe[] = tagesAufgaben;
    const pflanzen =
        tagesAufgaben.filter(
            (aufgabe: Aufgabe) =>
                aufgabe.kategorie === "pflanzen"
        );


    if (katzen.length > 0) {

        container.appendChild(
            erstelleKategorie(
                "🐱",
                "Katzen",
                katzen
            )
        );
    }


    if (pflanzen.length > 0) {

        container.appendChild(
            erstelleKategorie(
                "🌱",
                "Pflanzen",
                pflanzen
            )
        );
    }


    if (haushalt.length > 0) {

        container.appendChild(
            erstelleKategorie(
                "🏠",
                "Haushalt",
                haushalt
            )
        );
    }
}


/* =========================
   KATEGORIE
   ========================= */

function erstelleKategorie(
    emoji: string,
    name: string,
    aufgabenDerKategorie: Aufgabe[]
): HTMLElement {

    const section =
        document.createElement("section");

    section.className =
        "aufgaben-kategorie";


    const ueberschrift =
        document.createElement("h2");

    ueberschrift.textContent =
        `${emoji} ${name}`;


    section.appendChild(
        ueberschrift
    );


    for (
        const aufgabe
        of aufgabenDerKategorie
    ) {

        const erledigt =
            istErledigt(
                aufgabe.id,
                ausgewaehltesDatum
            );


        const element =
            document.createElement("div");

        element.className =
            "aufgabe";


        if (erledigt) {
            element.classList.add(
                "erledigt"
            );
        }


        /* Informationen */

        const info =
            document.createElement("div");

        info.className =
            "aufgabe-info";


        const zeit =
            document.createElement("span");

        zeit.className = "zeit";

        zeit.textContent =
            aufgabe.zeit;


        const titel =
            document.createElement("span");

        titel.className = "titel";

        titel.textContent =
            aufgabe.titel;


        info.appendChild(zeit);
        info.appendChild(titel);


        /* Aktionen */

        const aktionen =
            document.createElement("div");

        aktionen.className =
            "aufgabe-aktionen";


       if (aufgabe.anleitung) {

    const anleitungButton =
        document.createElement("button");

    anleitungButton.className =
        "anleitung";

    anleitungButton.textContent =
        "📖 Anleitung";


    anleitungButton.addEventListener(
        "click",
        () => {

            console.log(
                "Anleitung angeklickt:",
                aufgabe.anleitung
            );

            zeigeBrunnenAnleitung();
        }
    );


    aktionen.appendChild(
        anleitungButton
    );
}

        const erledigtButton =
            document.createElement("button");

        erledigtButton.className =
            "erledigt-button";


        erledigtButton.textContent =
            erledigt
                ? "✓ Erledigt"
                : "Erledigt";


        erledigtButton.addEventListener(
            "click",
            () => {

                const neuerStatus =
                    !istErledigt(
                        aufgabe.id,
                        ausgewaehltesDatum
                    );


                setErledigt(
                    aufgabe.id,
                    ausgewaehltesDatum,
                    neuerStatus
                );


                zeigeAufgaben();
            }
        );


        aktionen.appendChild(
            erledigtButton
        );


        element.appendChild(info);
        element.appendChild(aktionen);

        section.appendChild(element);
    }


    return section;
}


/* =========================
   START
   ========================= */

const datumAnzeige =
    document.getElementById(
        "aktuelles-datum"
    );

if (datumAnzeige) {

    datumAnzeige.textContent =
        formatLangesDatum(
            ausgewaehltesDatum
        );
}


erstelleTage();
zeigeAufgaben();
