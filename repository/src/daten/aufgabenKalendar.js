export function dailyTasks() {
    let taeglich = [
        {
            id: "trockenfutter",
            titel: "Trockenfutter nachschauen & ggf. auffüllen",
            zeit: "egal",
            kategorie: "katzen",
            anleitung: "trockenfutterAuffuellen"
        },
        {
            id: "nach-Wasser-Schauen",
            titel: "Schauen, ob in den Näpfen und Brunnen genügend Wasser ist",
            zeit: "egal",
            kategorie: "katzen"
        },
        {
            id: "katzenklo-morgens",
            titel: "Katzenklo reinigen",
            zeit: "morgens",
            kategorie: "katzen"
        },
        {
            id: "susi-fuettern1",
            titel: "Susi fuettern morgens",
            zeit: "morgens",
            kategorie: "katzen",
            anleitung: "susiFuetternAnleitung"
        },
        {
            id: "susi-fuettern2",
            titel: "Susi fuettern mittags",
            zeit: "mittags",
            kategorie: "katzen",
            anleitung: "susiFuetternAnleitung"
        },
        {
            id: "susi-fuettern3",
            titel: "Susi fuettern nachmittags",
            zeit: "nachmittags",
            kategorie: "katzen",
            anleitung: "susiFuetternAnleitung"
        },
        {
            id: "susi-fuettern4",
            titel: "Susi fuettern abends",
            zeit: "abends",
            kategorie: "katzen",
            anleitung: "susiFuetternAnleitung"
        },
        {
            id: "katzenklo-abends",
            titel: "Katzenklo reinigen",
            zeit: "abends",
            kategorie: "katzen"
        },
        {
            id: "durchlueften",
            titel: "durchlueften",
            zeit: "morgens",
            kategorie: "haushalt",
            anleitung: "durchlueftenAnleitung"
        },
        {
            id: "balkon-schliessen-abends",
            titel: "Abends Balkon schließen",
            zeit: "abends",
            kategorie: "haushalt"
        }
    ];
    return taeglich;
}
export function allThreeDays() {
    let jedenDrittenTag = [
        {
            id: "staubsaugen",
            titel: "staubsaugen, Wilma dankt:)",
            zeit: "egal",
            kategorie: "haushalt"
        },
        {
            id: "brunnen-reinigen",
            titel: "Katzenbrunnen reinigen",
            zeit: "egal",
            kategorie: "katzen",
            anleitung: "katzenbrunnenReinigenAnleitung"
        },
        {
            id: "wassernapf-auffüllen",
            titel: "Frisches Wasser in die Näpfe füllen",
            zeit: "egal",
            kategorie: "katzen"
        }
    ];
    return jedenDrittenTag;
}
export function onceAWeek() {
    let einmalProWoche = [
        {
            id: "futternapf-reinigen",
            titel: "Futternäpfe voller Trockenfutter reinigen",
            zeit: "egal",
            kategorie: "katzen"
        },
        {
            id: "blumen-giessen",
            titel: "Blume in der Küche gießen",
            kategorie: "haushalt",
            zeit: "egal"
        }
    ];
    return einmalProWoche;
}
export const aufgaben = [
    {
        datum: "2026-08-10",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-11",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-12",
        aufgaben: [
            ...dailyTasks(),
            ...allThreeDays()
        ]
    },
    {
        datum: "2026-08-13",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-14",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-15",
        aufgaben: [
            ...dailyTasks(),
            ...allThreeDays()
        ]
    },
    {
        datum: "2026-08-16",
        aufgaben: [
            ...dailyTasks(),
            ...onceAWeek()
        ]
    },
    {
        datum: "2026-08-17",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-18",
        aufgaben: [
            ...dailyTasks(),
            ...allThreeDays()
        ]
    },
    {
        datum: "2026-08-19",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-20",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-21",
        aufgaben: [
            ...dailyTasks(),
            ...allThreeDays()
        ]
    },
    {
        datum: "2026-08-22",
        aufgaben: dailyTasks()
    },
    {
        datum: "2026-08-23",
        aufgaben: dailyTasks()
    },
];
