<template>
    <div>
        <nav>
            <div class="bar container">
                <a @click="$router.back()">Abbrechen</a>
                <a class="save">Speichern</a>
            </div>
        </nav>

        <div class="wrapper">
            <div class="dashboard">
                <div class="widget">
                    <div class="container">
                        <h5>Kurse auswählen</h5>
                    </div>
                    <form class="subjects" method="POST" action="?submit">
                        <div class="container">
                            <div v-for="subject in subjects" class="item">
                                <div class="header">
                                    <label>
                                        <div class="icon icon-fw icon-prepend checkbox">
                                            <input type="checkbox" :indeterminate="true">
                                            <span class="name">{{subject.name}}</span>
                                            <span class="amount">({{subject.courses.length}})</span>
                                        </div>
                                    </label>
                                    <a class="arrow icon" @click="log(subject.active = !subject.active)">
                                        <fa-icon icon="chevron-down"/>
                                    </a>
                                </div>
                                <div :class="'courses ' + (subject.active ? 'active':'')">
                                    <label v-for="course in subject.courses">
                                        <input type="checkbox" value="on">
                                        <span class="icon icon-fw icon-prepend checkbox">{{course.title}}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="note">
                <div class="container">
                    <p>Vorlesungsverzeichnis</p>
                    <p>© <a href="http://www.hft-stuttgart.de/" target="_blank">Hochschule für Technik Stuttgart</a></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            log: console.log
        },
        data() {
            return {
                selected: "",
                subjects: [{
                    "id": "14",
                    "name": "AB1A",
                    "courses": [{"id": "94605", "title": "GB - Grundlagen Baukonstruktion"}, {
                        "id": "94621",
                        "title": "GD1 - Darstellende Geometrie"
                    }, {"id": "99326", "title": "GD1 - Freihandzeichnen 1"}, {
                        "id": "94617",
                        "title": "GD1 - Technisches Zeichnen"
                    }, {"id": "94623", "title": "GE1 - Baugeschichte Überblick"}, {
                        "id": "99324",
                        "title": "GE1 - Entwerfen 1"
                    }, {"id": "99325", "title": "GE1 - Gebäudelehre 1"}, {
                        "id": "94622",
                        "title": "GT - Bauphysik"
                    }, {"id": "94620", "title": "GT - Gebäudetechnik"}, {
                        "id": "94801",
                        "title": "GT - Materialkunde"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94540",
                        "title": "SPO2Go - Studienberatung"
                    }, {"id": "99041", "title": "Tutorium Baukonstruktion und Entwerfen AB1"}, {
                        "id": "99490",
                        "title": "WF - Grafik und Layout"
                    }]
                }, {
                    "id": "15",
                    "name": "AB1B",
                    "courses": [{"id": "94605", "title": "GB - Grundlagen Baukonstruktion"}, {
                        "id": "94621",
                        "title": "GD1 - Darstellende Geometrie"
                    }, {"id": "99326", "title": "GD1 - Freihandzeichnen 1"}, {
                        "id": "94617",
                        "title": "GD1 - Technisches Zeichnen"
                    }, {"id": "94623", "title": "GE1 - Baugeschichte Überblick"}, {
                        "id": "99324",
                        "title": "GE1 - Entwerfen 1"
                    }, {"id": "99325", "title": "GE1 - Gebäudelehre 1"}, {
                        "id": "94622",
                        "title": "GT - Bauphysik"
                    }, {"id": "94620", "title": "GT - Gebäudetechnik"}, {
                        "id": "94801",
                        "title": "GT - Materialkunde"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94540",
                        "title": "SPO2Go - Studienberatung"
                    }, {"id": "99041", "title": "Tutorium Baukonstruktion und Entwerfen AB1"}]
                }, {
                    "id": "16",
                    "name": "AB1C",
                    "courses": [{"id": "94605", "title": "GB - Grundlagen Baukonstruktion"}, {
                        "id": "94621",
                        "title": "GD1 - Darstellende Geometrie"
                    }, {"id": "99326", "title": "GD1 - Freihandzeichnen 1"}, {
                        "id": "94617",
                        "title": "GD1 - Technisches Zeichnen"
                    }, {"id": "94623", "title": "GE1 - Baugeschichte Überblick"}, {
                        "id": "99324",
                        "title": "GE1 - Entwerfen 1"
                    }, {"id": "99325", "title": "GE1 - Gebäudelehre 1"}, {
                        "id": "94622",
                        "title": "GT - Bauphysik"
                    }, {"id": "94620", "title": "GT - Gebäudetechnik"}, {
                        "id": "94801",
                        "title": "GT - Materialkunde"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94540",
                        "title": "SPO2Go - Studienberatung"
                    }, {"id": "99041", "title": "Tutorium Baukonstruktion und Entwerfen AB1"}]
                }, {
                    "id": "17",
                    "name": "AB2A",
                    "courses": [{"id": "94607", "title": "BI1 - Baukonstruktion 2"}, {
                        "id": "94979",
                        "title": "GD2 - CAAD"
                    }, {"id": "99325", "title": "GE1 - Gebäudelehre 1"}, {
                        "id": "94614",
                        "title": "GE2 - Baugeschichte 2"
                    }, {"id": "94616", "title": "GE2 - Entwerfen 1"}, {
                        "id": "94794",
                        "title": "GE2 - Gebäudelehre 1"
                    }, {"id": "94608", "title": "Integrierte Übung AB 2 (BKE2, TWL2, MBP2, GET2)"}, {
                        "id": "94105",
                        "title": "Pecha-Kucha Erasmus Architektur"
                    }, {"id": "94792", "title": "SB1 - Städtebau 1"}, {
                        "id": "94613",
                        "title": "TI1 - Gebäudetechnik 2"
                    }, {"id": "95149", "title": "TI1 - Materialkunde + Bauphysik 2"}, {
                        "id": "94802",
                        "title": "TI1 - Tragwerkslehre 2"
                    }]
                }, {
                    "id": "18",
                    "name": "AB2B",
                    "courses": [{"id": "94607", "title": "BI1 - Baukonstruktion 2"}, {
                        "id": "94979",
                        "title": "GD2 - CAAD"
                    }, {"id": "99325", "title": "GE1 - Gebäudelehre 1"}, {
                        "id": "94614",
                        "title": "GE2 - Baugeschichte 2"
                    }, {"id": "94616", "title": "GE2 - Entwerfen 1"}, {
                        "id": "94794",
                        "title": "GE2 - Gebäudelehre 1"
                    }, {"id": "94608", "title": "Integrierte Übung AB 2 (BKE2, TWL2, MBP2, GET2)"}, {
                        "id": "94105",
                        "title": "Pecha-Kucha Erasmus Architektur"
                    }, {"id": "94792", "title": "SB1 - Städtebau 1"}, {
                        "id": "94613",
                        "title": "TI1 - Gebäudetechnik 2"
                    }, {"id": "95149", "title": "TI1 - Materialkunde + Bauphysik 2"}, {
                        "id": "94802",
                        "title": "TI1 - Tragwerkslehre 2"
                    }]
                }, {
                    "id": "19",
                    "name": "AB2C",
                    "courses": [{"id": "94607", "title": "BI1 - Baukonstruktion 2"}, {
                        "id": "94979",
                        "title": "GD2 - CAAD"
                    }, {"id": "99325", "title": "GE1 - Gebäudelehre 1"}, {
                        "id": "94614",
                        "title": "GE2 - Baugeschichte 2"
                    }, {"id": "94616", "title": "GE2 - Entwerfen 1"}, {
                        "id": "94794",
                        "title": "GE2 - Gebäudelehre 1"
                    }, {"id": "94608", "title": "Integrierte Übung AB 2 (BKE2, TWL2, MBP2, GET2)"}, {
                        "id": "94105",
                        "title": "Pecha-Kucha Erasmus Architektur"
                    }, {"id": "94792", "title": "SB1 - Städtebau 1"}, {
                        "id": "94613",
                        "title": "TI1 - Gebäudetechnik 2"
                    }, {"id": "95149", "title": "TI1 - Materialkunde + Bauphysik 2"}, {
                        "id": "94802",
                        "title": "TI1 - Tragwerkslehre 2"
                    }]
                }, {
                    "id": "20",
                    "name": "AB3A",
                    "courses": [{"id": "96996", "title": "BI2 - Baukonstruktion 3"}, {
                        "id": "94606",
                        "title": "GE3 - Baugeschichte 3"
                    }, {"id": "94609", "title": "GE3 - Entwerfen 2"}, {
                        "id": "94453",
                        "title": "GE3 - Gebäudelehre 2"
                    }, {"id": "99033", "title": "Infoveranstaltung BPS"}, {
                        "id": "93895",
                        "title": "Integrierte Übung AB 3 (BKE3, TWL3)"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94303",
                        "title": "SB2 - Städtebau 2"
                    }, {"id": "94525", "title": "TI2 - Klimagerechtes Bauen"}, {
                        "id": "94222",
                        "title": "TI2 - Tragwerkslehre 3"
                    }, {"id": "99530", "title": "WF - Angewandte Psychologie"}, {
                        "id": "99364",
                        "title": "WF - Architecture and Place"
                    }, {"id": "99328", "title": "WF - Architekturfotografie"}, {
                        "id": "99342",
                        "title": "WF - Architekturkritik (Architekturqualität)"
                    }, {"id": "99334", "title": "WF - Architekturmodell, Grafik und Präsentation"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99337",
                        "title": "WF - Einführung Projektmanagement"
                    }, {"id": "99335", "title": "WF - Fassadenkonstruktionen"}, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "21",
                    "name": "AB3B",
                    "courses": [{"id": "96996", "title": "BI2 - Baukonstruktion 3"}, {
                        "id": "94606",
                        "title": "GE3 - Baugeschichte 3"
                    }, {"id": "94609", "title": "GE3 - Entwerfen 2"}, {
                        "id": "94453",
                        "title": "GE3 - Gebäudelehre 2"
                    }, {"id": "99033", "title": "Infoveranstaltung BPS"}, {
                        "id": "93895",
                        "title": "Integrierte Übung AB 3 (BKE3, TWL3)"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94303",
                        "title": "SB2 - Städtebau 2"
                    }, {"id": "94525", "title": "TI2 - Klimagerechtes Bauen"}, {
                        "id": "94222",
                        "title": "TI2 - Tragwerkslehre 3"
                    }, {"id": "99530", "title": "WF - Angewandte Psychologie"}, {
                        "id": "99364",
                        "title": "WF - Architecture and Place"
                    }, {"id": "99328", "title": "WF - Architekturfotografie"}, {
                        "id": "99342",
                        "title": "WF - Architekturkritik (Architekturqualität)"
                    }, {"id": "99334", "title": "WF - Architekturmodell, Grafik und Präsentation"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99337",
                        "title": "WF - Einführung Projektmanagement"
                    }, {"id": "99335", "title": "WF - Fassadenkonstruktionen"}, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "22",
                    "name": "AB3C",
                    "courses": [{"id": "96996", "title": "BI2 - Baukonstruktion 3"}, {
                        "id": "94606",
                        "title": "GE3 - Baugeschichte 3"
                    }, {"id": "94609", "title": "GE3 - Entwerfen 2"}, {
                        "id": "94453",
                        "title": "GE3 - Gebäudelehre 2"
                    }, {"id": "99033", "title": "Infoveranstaltung BPS"}, {
                        "id": "93895",
                        "title": "Integrierte Übung AB 3 (BKE3, TWL3)"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94303",
                        "title": "SB2 - Städtebau 2"
                    }, {"id": "94525", "title": "TI2 - Klimagerechtes Bauen"}, {
                        "id": "94222",
                        "title": "TI2 - Tragwerkslehre 3"
                    }, {"id": "99530", "title": "WF - Angewandte Psychologie"}, {
                        "id": "99364",
                        "title": "WF - Architecture and Place"
                    }, {"id": "99328", "title": "WF - Architekturfotografie"}, {
                        "id": "99342",
                        "title": "WF - Architekturkritik (Architekturqualität)"
                    }, {"id": "99334", "title": "WF - Architekturmodell, Grafik und Präsentation"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99337",
                        "title": "WF - Einführung Projektmanagement"
                    }, {"id": "99335", "title": "WF - Fassadenkonstruktionen"}, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "23",
                    "name": "AB4A",
                    "courses": [{"id": "94317", "title": "BI3 - Baukonstruktion 4"}, {
                        "id": "94595",
                        "title": "GD3 - Freihandzeichnen"
                    }, {"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94600",
                        "title": "GO1 - Bauorganisation 1"
                    }, {"id": "94602", "title": "GR1 - Bauleitplanung"}, {
                        "id": "94599",
                        "title": "GR1 - Planungs- + Bauordnungsrecht 1"
                    }, {"id": "94596", "title": "GR2 - Planungs- + Bauordnungsrecht 2"}, {
                        "id": "94594",
                        "title": "GR2 - Vorbeugender Brandschutz"
                    }, {"id": "99033", "title": "Infoveranstaltung BPS"}, {
                        "id": "95489",
                        "title": "Integrierte Übung AB 4 (BKE4, TWL4,SWZ, GET3)"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94603",
                        "title": "TI3 - Gebäudetechnik 3"
                    }, {"id": "94604", "title": "TI3 - Simulationswerkzeuge"}, {
                        "id": "94316",
                        "title": "TI3 - Tragwerkslehre 4"
                    }, {"id": "99530", "title": "WF - Angewandte Psychologie"}, {
                        "id": "99364",
                        "title": "WF - Architecture and Place"
                    }, {"id": "99328", "title": "WF - Architekturfotografie"}, {
                        "id": "99342",
                        "title": "WF - Architekturkritik (Architekturqualität)"
                    }, {"id": "99334", "title": "WF - Architekturmodell, Grafik und Präsentation"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99337",
                        "title": "WF - Einführung Projektmanagement"
                    }, {"id": "99335", "title": "WF - Fassadenkonstruktionen"}, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "24",
                    "name": "AB4B",
                    "courses": [{"id": "94317", "title": "BI3 - Baukonstruktion 4"}, {
                        "id": "94595",
                        "title": "GD3 - Freihandzeichnen"
                    }, {"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94600",
                        "title": "GO1 - Bauorganisation 1"
                    }, {"id": "94602", "title": "GR1 - Bauleitplanung"}, {
                        "id": "94599",
                        "title": "GR1 - Planungs- + Bauordnungsrecht 1"
                    }, {"id": "94596", "title": "GR2 - Planungs- + Bauordnungsrecht 2"}, {
                        "id": "94594",
                        "title": "GR2 - Vorbeugender Brandschutz"
                    }, {"id": "99033", "title": "Infoveranstaltung BPS"}, {
                        "id": "95489",
                        "title": "Integrierte Übung AB 4 (BKE4, TWL4,SWZ, GET3)"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94603",
                        "title": "TI3 - Gebäudetechnik 3"
                    }, {"id": "94604", "title": "TI3 - Simulationswerkzeuge"}, {
                        "id": "94316",
                        "title": "TI3 - Tragwerkslehre 4"
                    }, {"id": "99530", "title": "WF - Angewandte Psychologie"}, {
                        "id": "99364",
                        "title": "WF - Architecture and Place"
                    }, {"id": "99328", "title": "WF - Architekturfotografie"}, {
                        "id": "99342",
                        "title": "WF - Architekturkritik (Architekturqualität)"
                    }, {"id": "99334", "title": "WF - Architekturmodell, Grafik und Präsentation"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99337",
                        "title": "WF - Einführung Projektmanagement"
                    }, {"id": "99335", "title": "WF - Fassadenkonstruktionen"}, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "25",
                    "name": "AB4C",
                    "courses": [{"id": "94317", "title": "BI3 - Baukonstruktion 4"}, {
                        "id": "94595",
                        "title": "GD3 - Freihandzeichnen"
                    }, {"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94600",
                        "title": "GO1 - Bauorganisation 1"
                    }, {"id": "94602", "title": "GR1 - Bauleitplanung"}, {
                        "id": "94599",
                        "title": "GR1 - Planungs- + Bauordnungsrecht 1"
                    }, {"id": "94596", "title": "GR2 - Planungs- + Bauordnungsrecht 2"}, {
                        "id": "94594",
                        "title": "GR2 - Vorbeugender Brandschutz"
                    }, {"id": "99033", "title": "Infoveranstaltung BPS"}, {
                        "id": "95489",
                        "title": "Integrierte Übung AB 4 (BKE4, TWL4,SWZ, GET3)"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}, {
                        "id": "94603",
                        "title": "TI3 - Gebäudetechnik 3"
                    }, {"id": "94604", "title": "TI3 - Simulationswerkzeuge"}, {
                        "id": "94316",
                        "title": "TI3 - Tragwerkslehre 4"
                    }, {"id": "99530", "title": "WF - Angewandte Psychologie"}, {
                        "id": "99364",
                        "title": "WF - Architecture and Place"
                    }, {"id": "99328", "title": "WF - Architekturfotografie"}, {
                        "id": "99342",
                        "title": "WF - Architekturkritik (Architekturqualität)"
                    }, {"id": "99334", "title": "WF - Architekturmodell, Grafik und Präsentation"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99337",
                        "title": "WF - Einführung Projektmanagement"
                    }, {"id": "99335", "title": "WF - Fassadenkonstruktionen"}, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "26",
                    "name": "AB5A",
                    "courses": [{"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94105",
                        "title": "Pecha-Kucha Erasmus Architektur"
                    }]
                }, {
                    "id": "27",
                    "name": "AB5B",
                    "courses": [{"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94105",
                        "title": "Pecha-Kucha Erasmus Architektur"
                    }]
                }, {
                    "id": "28",
                    "name": "AB5C",
                    "courses": [{"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94105",
                        "title": "Pecha-Kucha Erasmus Architektur"
                    }]
                }, {
                    "id": "29",
                    "name": "AB6A",
                    "courses": [{"id": "94270", "title": "BA - Arbeit"}, {
                        "id": "94588",
                        "title": "BE4 - Baugeschichte 4"
                    }, {"id": "94591", "title": "GE4 - Entwerfen 3"}, {
                        "id": "94452",
                        "title": "GE4 - Gebäudelehre 3"
                    }, {"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94592",
                        "title": "GO2 - Bauorganisation 2"
                    }, {"id": "94593", "title": "GTH - Ringvorlesung Bestand"}, {
                        "id": "94945",
                        "title": "GTH - Wohnungsbau Theorie"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}]
                }, {
                    "id": "30",
                    "name": "AB6B",
                    "courses": [{"id": "94270", "title": "BA - Arbeit"}, {
                        "id": "94588",
                        "title": "BE4 - Baugeschichte 4"
                    }, {"id": "94591", "title": "GE4 - Entwerfen 3"}, {
                        "id": "94452",
                        "title": "GE4 - Gebäudelehre 3"
                    }, {"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94592",
                        "title": "GO2 - Bauorganisation 2"
                    }, {"id": "94593", "title": "GTH - Ringvorlesung Bestand"}, {
                        "id": "94945",
                        "title": "GTH - Wohnungsbau Theorie"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}]
                }, {
                    "id": "31",
                    "name": "AB6C",
                    "courses": [{"id": "94270", "title": "BA - Arbeit"}, {
                        "id": "94588",
                        "title": "BE4 - Baugeschichte 4"
                    }, {"id": "94591", "title": "GE4 - Entwerfen 3"}, {
                        "id": "94452",
                        "title": "GE4 - Gebäudelehre 3"
                    }, {"id": "94078", "title": "Gebäudelehre 2 + 3 Sondertermin"}, {
                        "id": "94592",
                        "title": "GO2 - Bauorganisation 2"
                    }, {"id": "94593", "title": "GTH - Ringvorlesung Bestand"}, {
                        "id": "94945",
                        "title": "GTH - Wohnungsbau Theorie"
                    }, {"id": "94105", "title": "Pecha-Kucha Erasmus Architektur"}]
                }, {
                    "id": "82",
                    "name": "BB1A",
                    "courses": [{"id": "94215", "title": "Bau- und Immobilienwirtschaft"}, {
                        "id": "93902",
                        "title": "Bauchemie"
                    }, {"id": "97025", "title": "Baukonstruktionszeichnen"}, {
                        "id": "98988",
                        "title": "Bauphysik"
                    }, {"id": "94318", "title": "Baustoffkunde I"}, {
                        "id": "93972",
                        "title": "Betriebswirtschaftslehre"
                    }, {"id": "97030", "title": "Computer Aided Design (CAD)"}, {
                        "id": "94867",
                        "title": "Höhere Mathematik 1"
                    }, {"id": "94314", "title": "Mathematik 1"}, {"id": "94756", "title": "Mechanik I"}, {
                        "id": "94761",
                        "title": "Thementutorium"
                    }, {"id": "94363", "title": "Tutorium Höhere Mathematik 1"}, {
                        "id": "94282",
                        "title": "Tutorium Mechanik I"
                    }, {"id": "94342", "title": "Vermessungskunde"}]
                }, {
                    "id": "83",
                    "name": "BB1B",
                    "courses": [{"id": "94215", "title": "Bau- und Immobilienwirtschaft"}, {
                        "id": "93902",
                        "title": "Bauchemie"
                    }, {"id": "97025", "title": "Baukonstruktionszeichnen"}, {
                        "id": "98988",
                        "title": "Bauphysik"
                    }, {"id": "94318", "title": "Baustoffkunde I"}, {
                        "id": "93972",
                        "title": "Betriebswirtschaftslehre"
                    }, {"id": "97030", "title": "Computer Aided Design (CAD)"}, {
                        "id": "94867",
                        "title": "Höhere Mathematik 1"
                    }, {"id": "94314", "title": "Mathematik 1"}, {"id": "94756", "title": "Mechanik I"}, {
                        "id": "94761",
                        "title": "Thementutorium"
                    }, {"id": "94363", "title": "Tutorium Höhere Mathematik 1"}, {
                        "id": "94282",
                        "title": "Tutorium Mechanik I"
                    }, {"id": "94342", "title": "Vermessungskunde"}]
                }, {
                    "id": "85",
                    "name": "BB2A",
                    "courses": [{"id": "94711", "title": "Baukonstruktion"}, {
                        "id": "93835",
                        "title": "Baustoffkunde II"
                    }, {"id": "95116", "title": "Bürgerliches und öffentliches Recht"}, {
                        "id": "94866",
                        "title": "Höhere Mathematik 2"
                    }, {"id": "93934", "title": "Ingenieurgeologie und Tunnelbau"}, {
                        "id": "94314",
                        "title": "Mathematik 1"
                    }, {"id": "94003", "title": "Mechanik II"}, {
                        "id": "94753",
                        "title": "Projektmanagement"
                    }, {"id": "94357", "title": "Tutorium Höhere Mathematik 2"}, {
                        "id": "94358",
                        "title": "Tutorium Mechanik II"
                    }, {"id": "94342", "title": "Vermessungskunde"}]
                }, {
                    "id": "86",
                    "name": "BB2B",
                    "courses": [{"id": "94711", "title": "Baukonstruktion"}, {
                        "id": "93835",
                        "title": "Baustoffkunde II"
                    }, {"id": "95116", "title": "Bürgerliches und öffentliches Recht"}, {
                        "id": "94866",
                        "title": "Höhere Mathematik 2"
                    }, {"id": "93934", "title": "Ingenieurgeologie und Tunnelbau"}, {
                        "id": "94314",
                        "title": "Mathematik 1"
                    }, {"id": "94003", "title": "Mechanik II"}, {
                        "id": "94753",
                        "title": "Projektmanagement"
                    }, {"id": "94357", "title": "Tutorium Höhere Mathematik 2"}, {
                        "id": "94358",
                        "title": "Tutorium Mechanik II"
                    }, {"id": "94342", "title": "Vermessungskunde"}]
                }, {
                    "id": "165",
                    "name": "BB2C",
                    "courses": [{"id": "94711", "title": "Baukonstruktion"}, {
                        "id": "93835",
                        "title": "Baustoffkunde II"
                    }, {"id": "95116", "title": "Bürgerliches und öffentliches Recht"}, {
                        "id": "94866",
                        "title": "Höhere Mathematik 2"
                    }, {"id": "93934", "title": "Ingenieurgeologie und Tunnelbau"}, {
                        "id": "94314",
                        "title": "Mathematik 1"
                    }, {"id": "94003", "title": "Mechanik II"}, {
                        "id": "94753",
                        "title": "Projektmanagement"
                    }, {"id": "94357", "title": "Tutorium Höhere Mathematik 2"}, {
                        "id": "94358",
                        "title": "Tutorium Mechanik II"
                    }, {"id": "94342", "title": "Vermessungskunde"}]
                }, {
                    "id": "87",
                    "name": "BB3A",
                    "courses": [{"id": "97733", "title": "Abwassertechnik I"}, {
                        "id": "99479",
                        "title": "Bauproduktionstechnik"
                    }, {"id": "94746", "title": "Baustatik I"}, {
                        "id": "94032",
                        "title": "Bodenmechanik"
                    }, {"id": "94881", "title": "EDV im Entwurf"}, {
                        "id": "94378",
                        "title": "EDV im Konstruktiven Ingenieurbau"
                    }, {"id": "98838", "title": "Entwurf von Verkehrsanlagen"}, {
                        "id": "94750",
                        "title": "Freiwillige Lehrveranstaltung - Schweisstechnik"
                    }, {"id": "97085", "title": "Hydromechanik I"}, {
                        "id": "95126",
                        "title": "Stahlbau I"
                    }, {"id": "93853", "title": "Vorbereitende Einführungsveranstaltung"}]
                }, {
                    "id": "88",
                    "name": "BB3B",
                    "courses": [{"id": "97733", "title": "Abwassertechnik I"}, {
                        "id": "99479",
                        "title": "Bauproduktionstechnik"
                    }, {"id": "94746", "title": "Baustatik I"}, {
                        "id": "94032",
                        "title": "Bodenmechanik"
                    }, {"id": "94881", "title": "EDV im Entwurf"}, {
                        "id": "94378",
                        "title": "EDV im Konstruktiven Ingenieurbau"
                    }, {"id": "98838", "title": "Entwurf von Verkehrsanlagen"}, {
                        "id": "94750",
                        "title": "Freiwillige Lehrveranstaltung - Schweisstechnik"
                    }, {"id": "97085", "title": "Hydromechanik I"}, {
                        "id": "95126",
                        "title": "Stahlbau I"
                    }, {"id": "93853", "title": "Vorbereitende Einführungsveranstaltung"}]
                }, {
                    "id": "89",
                    "name": "BB4A",
                    "courses": [{"id": "93876", "title": "Baubetriebsplanung"}, {
                        "id": "94378",
                        "title": "EDV im Konstruktiven Ingenieurbau"
                    }, {"id": "94748", "title": "EDV im Wasserwesen"}, {
                        "id": "95795",
                        "title": "Exchange Abend IB"
                    }, {"id": "94291", "title": "Grundbau I"}, {
                        "id": "95375",
                        "title": "Grundlagen des Arbeitsschutzes"
                    }, {"id": "99310", "title": "Hydrologie und Wasserwirtschaft I"}, {
                        "id": "94296",
                        "title": "Ingenieurholzbau I"
                    }, {"id": "94074", "title": "Stahlbetonbau I"}, {
                        "id": "98861",
                        "title": "Verkehrssysteme"
                    }, {"id": "93853", "title": "Vorbereitende Einführungsveranstaltung"}, {
                        "id": "94749",
                        "title": "Wasserbau I"
                    }, {"id": "94343", "title": "Wasserversorgung I"}]
                }, {
                    "id": "90",
                    "name": "BB6BM",
                    "courses": [{"id": "94838", "title": "Ausbau"}, {
                        "id": "95478",
                        "title": "Ausgewählte Konstruktionen"
                    }, {"id": "93900", "title": "Baubetriebsführung"}, {
                        "id": "94839",
                        "title": "Brandschutz"
                    }, {"id": "94830", "title": "EDV im Baubetrieb"}, {
                        "id": "94610",
                        "title": "Geotechnik-Seminar"
                    }, {"id": "94715", "title": "Geotechnikseminar (freiwilige Leistung)"}, {
                        "id": "95448",
                        "title": "Grundlagen der Kalkulation"
                    }, {"id": "94455", "title": "Kostenmanagement"}, {
                        "id": "95011",
                        "title": "Projekt I"
                    }, {"id": "94858", "title": "Projektmanagement"}, {
                        "id": "94837",
                        "title": "Schalung und Rüstung"
                    }, {"id": "95210", "title": "Sonderfragen der Kalkulation"}, {
                        "id": "99006",
                        "title": "Technische Gebäudeausrüstung"
                    }]
                }, {
                    "id": "91",
                    "name": "BB6KI",
                    "courses": [{"id": "94368", "title": "Baustatik II"}, {
                        "id": "94839",
                        "title": "Brandschutz"
                    }, {"id": "95150", "title": "Brückenbau"}, {
                        "id": "96725",
                        "title": "Finite Elemente I"
                    }, {"id": "94610", "title": "Geotechnik-Seminar"}, {
                        "id": "94715",
                        "title": "Geotechnikseminar (freiwilige Leistung)"
                    }, {"id": "95011", "title": "Projekt I"}, {"id": "96703", "title": "Spannbetonbau"}, {
                        "id": "94548",
                        "title": "Stahlbau II"
                    }, {"id": "95265", "title": "Stahlbetonbau II"}]
                }, {
                    "id": "92",
                    "name": "BB6WV",
                    "courses": [{"id": "93822", "title": "Abfallwirtschaft/-technik"}, {
                        "id": "95741",
                        "title": "Abwassertechnik II"
                    }, {"id": "94707", "title": "Betrieb von Verkehrsanlagen"}, {
                        "id": "94610",
                        "title": "Geotechnik-Seminar"
                    }, {"id": "94715", "title": "Geotechnikseminar (freiwilige Leistung)"}, {
                        "id": "95448",
                        "title": "Grundlagen der Kalkulation"
                    }, {"id": "97486", "title": "Hydrologie und Wasserwirtschaft II"}, {
                        "id": "96613",
                        "title": "Hydromechanik II"
                    }, {"id": "94101", "title": "Planungsrecht"}, {"id": "95011", "title": "Projekt I"}, {
                        "id": "93847",
                        "title": "Straßenbau"
                    }, {"id": "97555", "title": "Wasserbau II"}, {"id": "94186", "title": "Wasserversorgung II"}]
                }, {
                    "id": "93",
                    "name": "BB7BM",
                    "courses": [{
                        "id": "94857",
                        "title": "Ausgewählte Kapitel des Bauprozessmanagements"
                    }, {"id": "95478", "title": "Ausgewählte Konstruktionen"}, {
                        "id": "98406",
                        "title": "Baubetriebswirtschaft"
                    }, {"id": "96988", "title": "Bauen mit vorgefertigten Elementen"}, {
                        "id": "93924",
                        "title": "Betoninstandsetzung"
                    }, {"id": "94610", "title": "Geotechnik-Seminar"}, {
                        "id": "94715",
                        "title": "Geotechnikseminar (freiwilige Leistung)"
                    }, {"id": "95448", "title": "Grundlagen der Kalkulation"}, {
                        "id": "94101",
                        "title": "Planungsrecht"
                    }, {"id": "94859", "title": "Projekt 2"}, {"id": "95210", "title": "Sonderfragen der Kalkulation"}]
                }, {
                    "id": "94",
                    "name": "BB7KI",
                    "courses": [{"id": "94838", "title": "Ausbau"}, {
                        "id": "95478",
                        "title": "Ausgewählte Konstruktionen"
                    }, {"id": "96988", "title": "Bauen mit vorgefertigten Elementen"}, {
                        "id": "93924",
                        "title": "Betoninstandsetzung"
                    }, {"id": "94839", "title": "Brandschutz"}, {"id": "95150", "title": "Brückenbau"}, {
                        "id": "95175",
                        "title": "Building Information Modeling (BIM) in der Tragwerksplanung"
                    }, {"id": "94610", "title": "Geotechnik-Seminar"}, {
                        "id": "94715",
                        "title": "Geotechnikseminar (freiwilige Leistung)"
                    }, {"id": "94190", "title": "Grundbau II"}, {
                        "id": "95448",
                        "title": "Grundlagen der Kalkulation"
                    }, {"id": "93925", "title": "Ingenieurholzbau II"}, {
                        "id": "94101",
                        "title": "Planungsrecht"
                    }, {"id": "94859", "title": "Projekt 2"}, {
                        "id": "94837",
                        "title": "Schalung und Rüstung"
                    }, {"id": "96703", "title": "Spannbetonbau"}]
                }, {
                    "id": "95",
                    "name": "BB7WV",
                    "courses": [{"id": "93822", "title": "Abfallwirtschaft/-technik"}, {
                        "id": "93924",
                        "title": "Betoninstandsetzung"
                    }, {"id": "94655", "title": "EDV in der Verkehrsplanung"}, {
                        "id": "94610",
                        "title": "Geotechnik-Seminar"
                    }, {"id": "94715", "title": "Geotechnikseminar (freiwilige Leistung)"}, {
                        "id": "95448",
                        "title": "Grundlagen der Kalkulation"
                    }, {"id": "94101", "title": "Planungsrecht"}, {"id": "94859", "title": "Projekt 2"}, {
                        "id": "94858",
                        "title": "Projektmanagement"
                    }, {"id": "95210", "title": "Sonderfragen der Kalkulation"}, {
                        "id": "94656",
                        "title": "Verkehrsentwicklungsplanung"
                    }]
                }, {
                    "id": "51",
                    "name": "BW1",
                    "courses": [{"id": "98978", "title": "Betriebliches Rechnungswesen 1"}, {
                        "id": "94819",
                        "title": "Chinesisch für Betriebswirte - Stufe 1"
                    }, {"id": "99576", "title": "Einführungswoche"}, {
                        "id": "94630",
                        "title": "Finanzmathematik"
                    }, {"id": "99670", "title": "Info-Runde 2: Studienverlauf und Ausland"}, {
                        "id": "99580",
                        "title": "Infoveranstaltung - Verlauf Studium/SPO"
                    }, {"id": "99756", "title": "Logistik 1 SPO2013 Nur Wiederholer"}, {
                        "id": "99475",
                        "title": "Mathematik für Wirtschaftswissenschaften"
                    }, {"id": "93906", "title": "Produktionsmanagement"}, {
                        "id": "94780",
                        "title": "Projektmanagement"
                    }, {"id": "99633", "title": "Rechnungswesen I Tutorium"}, {
                        "id": "99634",
                        "title": "Rewe 1 - PVL - NUR FÜR WIEDERHOLER; alte SPO2013"
                    }, {"id": "94812", "title": "Softwareanwendung"}, {
                        "id": "94829",
                        "title": "Spanisch für Betriebswirte - Stufe 1 (Gruppe 1)"
                    }, {"id": "94813", "title": "Spanisch für Betriebswirte - Stufe 1 (Gruppe 2)"}, {
                        "id": "94646",
                        "title": "Statistik"
                    }, {"id": "99631", "title": "Statistik Tutorium"}, {
                        "id": "94284",
                        "title": "Technologiemanagement"
                    }, {"id": "95302", "title": "Tutorium Finanzmathematik"}, {
                        "id": "99690",
                        "title": "Tutorium Mathematik Wiwi"
                    }, {"id": "94814", "title": "Unternehmensführung"}, {
                        "id": "98987",
                        "title": "Volkswirtschaftslehre"
                    }, {"id": "94998", "title": "Vorbereitungswoche Betriebswirtschaft"}]
                }, {
                    "id": "52",
                    "name": "BW2",
                    "courses": [{"id": "94494", "title": "Arbeitsrecht"}, {
                        "id": "94706",
                        "title": "Betriebliches Rechnungswesen 2"
                    }, {"id": "94821", "title": "Chinesisch II"}, {
                        "id": "99646",
                        "title": "Chinesisch Tutorium"
                    }, {"id": "93945", "title": "DATEV-Tutorium"}, {
                        "id": "94628",
                        "title": "Einführung Marketing"
                    }, {"id": "99857", "title": "Einführung Marketing"}, {
                        "id": "98867",
                        "title": "Grundlagen der Logistik 2"
                    }, {"id": "99577", "title": "Infoveranstaltung - FIT und Bachelor Plus"}, {
                        "id": "99578",
                        "title": "Infoveranstaltung - WPF/Vertiefung"
                    }, {"id": "99677", "title": "Infoveranstaltung Auslandsaufenthalt"}, {
                        "id": "95195",
                        "title": "Kosten- und Leistungsrechnung"
                    }, {"id": "99756", "title": "Logistik 1 SPO2013 Nur Wiederholer"}, {
                        "id": "94773",
                        "title": "Personalmanagement"
                    }, {"id": "94780", "title": "Projektmanagement"}, {
                        "id": "93897",
                        "title": "Qualitätsmanagement 2"
                    }, {"id": "99634", "title": "Rewe 1 - PVL - NUR FÜR WIEDERHOLER; alte SPO2013"}, {
                        "id": "94812",
                        "title": "Softwareanwendung"
                    }, {"id": "94827", "title": "Spanisch für BW Stufe 2 - Gruppe 1"}, {
                        "id": "94811",
                        "title": "Spanisch für BW Stufe 2 - Gruppe 2"
                    }, {"id": "99631", "title": "Statistik Tutorium"}, {
                        "id": "96994",
                        "title": "Wirtschaftsprivatrecht"
                    }, {"id": "99638", "title": "Wissentschaftliches Lernen & Arbeiten _ SPO2013_Nachholer"}]
                }, {
                    "id": "53",
                    "name": "BW3GM",
                    "courses": [{"id": "94631", "title": "Beschaffung und Logistik"}, {
                        "id": "94682",
                        "title": "Betriebswirtschaftliche Steuerlehre"
                    }, {"id": "96764", "title": "Controlling"}, {
                        "id": "99687",
                        "title": "DATEV Tutorium BW3"
                    }, {"id": "99175", "title": "Dienstleistungsmanagement"}, {
                        "id": "94641",
                        "title": "FIT Praxisbegleitendes Kolloquium"
                    }, {"id": "94705", "title": "Gesellschaftsrecht"}, {
                        "id": "94028",
                        "title": "Informationsveranstaltung BPS"
                    }, {"id": "99577", "title": "Infoveranstaltung - FIT und Bachelor Plus"}, {
                        "id": "99581",
                        "title": "Infoveranstaltung - SQ"
                    }, {"id": "99677", "title": "Infoveranstaltung Auslandsaufenthalt"}, {
                        "id": "96569",
                        "title": "Internationale Rechnungslegung"
                    }, {"id": "93943", "title": "Investition, Finanzierung & Risikomanagement"}, {
                        "id": "99756",
                        "title": "Logistik 1 SPO2013 Nur Wiederholer"
                    }, {"id": "99590", "title": "Marktforschung und Marketingcontrolling"}, {
                        "id": "94666",
                        "title": "Nationale Rechnungslegung"
                    }, {"id": "94367", "title": "Qualitätsmanagement und Produktionswirtschaft"}, {
                        "id": "99614",
                        "title": "SPSS-Installation"
                    }, {"id": "94815", "title": "Wirtschaftschinesisch I (FIT)"}, {
                        "id": "94679",
                        "title": "Wirtschaftsenglisch I - Gruppe 1"
                    }, {"id": "94673", "title": "Wirtschaftsenglisch I - Gruppe 2"}, {
                        "id": "99617",
                        "title": "Wirtschaftsenglisch I - Gruppe 3"
                    }, {"id": "94828", "title": "Wirtschaftsspanisch ( FIT I ) - Espanol Comercial"}, {
                        "id": "94826",
                        "title": "Wirtschaftsspanisch ( FIT II ) - Espanol Comercial"
                    }, {"id": "99638", "title": "Wissentschaftliches Lernen & Arbeiten _ SPO2013_Nachholer"}]
                }, {
                    "id": "54",
                    "name": "BW4GM",
                    "courses": [{"id": "99638", "title": "Wissentschaftliches Lernen & Arbeiten _ SPO2013_Nachholer"}]
                }, {
                    "id": "55",
                    "name": "BW5GM",
                    "courses": [{"id": "94665", "title": "Absatzwirtschaft"}, {
                        "id": "94644",
                        "title": "Betriebsorganisation"
                    }, {"id": "94072", "title": "Bewerbertraining HAYS"}, {
                        "id": "95194",
                        "title": "Bilanzpolitik & Bilanzanalyse"
                    }, {"id": "94664", "title": "BW5GM Wirtschaftsenglisch II - Gruppe 1"}, {
                        "id": "94663",
                        "title": "BW5GM Wirtschaftsenglisch II - Gruppe 2"
                    }, {"id": "94641", "title": "FIT Praxisbegleitendes Kolloquium"}, {
                        "id": "94304",
                        "title": "Human Resources Management"
                    }, {"id": "99579", "title": "Infoveranstaltung - Bachelor Thesis"}, {
                        "id": "99577",
                        "title": "Infoveranstaltung - FIT und Bachelor Plus"
                    }, {"id": "99581", "title": "Infoveranstaltung - SQ"}, {
                        "id": "93942",
                        "title": "Kapitalmärkte & Banken"
                    }, {"id": "94144", "title": "Marketing und Vertrieb"}, {
                        "id": "95544",
                        "title": "Meeting"
                    }, {"id": "93871", "title": "Operations Research"}, {
                        "id": "94887",
                        "title": "Unternehmensführung und Controlling"
                    }, {"id": "94815", "title": "Wirtschaftschinesisch I (FIT)"}, {
                        "id": "94818",
                        "title": "Wirtschaftschinesisch II (FIT)"
                    }, {"id": "94673", "title": "Wirtschaftsenglisch I - Gruppe 2"}, {
                        "id": "94828",
                        "title": "Wirtschaftsspanisch ( FIT I ) - Espanol Comercial"
                    }, {"id": "94826", "title": "Wirtschaftsspanisch ( FIT II ) - Espanol Comercial"}]
                }, {
                    "id": "56",
                    "name": "BW6GM",
                    "courses": [{"id": "94642", "title": "BT-Kolloquium-BW"}, {
                        "id": "94640",
                        "title": "Business-Software"
                    }, {"id": "94638", "title": "Business English Presentations - Gruppe 1"}, {
                        "id": "98791",
                        "title": "Business English Presentations - Gruppe 2"
                    }, {"id": "98541", "title": "Business Software Abschlusspräsentationen"}, {
                        "id": "99554",
                        "title": "e Business"
                    }, {"id": "99315", "title": "Existenzgründung und Businessplan"}, {
                        "id": "94641",
                        "title": "FIT Praxisbegleitendes Kolloquium"
                    }, {"id": "95164", "title": "Gründungssimulation"}, {
                        "id": "99579",
                        "title": "Infoveranstaltung - Bachelor Thesis"
                    }, {"id": "99577", "title": "Infoveranstaltung - FIT und Bachelor Plus"}, {
                        "id": "99581",
                        "title": "Infoveranstaltung - SQ"
                    }, {"id": "94815", "title": "Wirtschaftschinesisch I (FIT)"}, {
                        "id": "94818",
                        "title": "Wirtschaftschinesisch II (FIT)"
                    }, {"id": "94828", "title": "Wirtschaftsspanisch ( FIT I ) - Espanol Comercial"}, {
                        "id": "94826",
                        "title": "Wirtschaftsspanisch ( FIT II ) - Espanol Comercial"
                    }]
                }, {
                    "id": "57",
                    "name": "GM1",
                    "courses": [{"id": "98875", "title": "Betriebsverfassung und Arbeitsrecht"}, {
                        "id": "98880",
                        "title": "Business English I"
                    }, {"id": "98883", "title": "Change Management"}, {
                        "id": "98872",
                        "title": "Corporate Finance"
                    }, {"id": "98879", "title": "Doing Business in Europe"}, {
                        "id": "98876",
                        "title": "Einführung GM1"
                    }, {"id": "95378", "title": "Eröffnungsfeier Master-Studiengänge"}, {
                        "id": "98881",
                        "title": "International Economics"
                    }, {
                        "id": "98877",
                        "title": "Internationales Handels- und Gesellschaftsrecht inkl. Europarecht"
                    }, {"id": "98878", "title": "Management Accounting"}, {
                        "id": "97304",
                        "title": "Nachholklausur International Economics"
                    }, {"id": "98882", "title": "Purchasing & Logistics Management"}, {
                        "id": "98873",
                        "title": "Research Methods Seminar"
                    }, {"id": "98886", "title": "Wirtschaftschinesisch I"}, {
                        "id": "94828",
                        "title": "Wirtschaftsspanisch ( FIT I ) - Espanol Comercial"
                    }]
                }, {"id": "60", "name": "GM4", "courses": [{"id": "94735", "title": "Kolloquium"}]}, {
                    "id": "199",
                    "name": "GP1",
                    "courses": [{"id": "98203", "title": "Akustik"}, {
                        "id": "98204",
                        "title": "Akustische Messtechnik"
                    }, {"id": "95378", "title": "Eröffnungsfeier Master-Studiengänge"}, {
                        "id": "97163",
                        "title": "Heizung, Klima, Lüftung 1"
                    }, {"id": "99115", "title": "Körperschall (innovativer Lärmsschutz)"}, {
                        "id": "98202",
                        "title": "Lineare und statistische Optimierung"
                    }, {"id": "93977", "title": "Schallimmissionsschutz 1"}, {
                        "id": "99034",
                        "title": "Schallschutz 1"
                    }, {"id": "98205", "title": "Simulationswerkzeuge"}, {
                        "id": "99043",
                        "title": "Theoretische Bauphysik Schall"
                    }, {"id": "99281", "title": "Thermische Gebäudesimulation"}, {
                        "id": "98201",
                        "title": "Transportvorgänge"
                    }]
                }, {
                    "id": "153",
                    "name": "GT_VZ1",
                    "courses": [{
                        "id": "97017",
                        "title": "Baumasch. u. Baubetrieb im konvent. Tunnelbau"
                    }, {"id": "99258", "title": "Bodenmechanik 1"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {"id": "98732", "title": "Felsmechanik"}, {
                        "id": "98733",
                        "title": "Geohydraulik"
                    }, {"id": "94610", "title": "Geotechnik-Seminar"}, {
                        "id": "99269",
                        "title": "Grundbau mit Spezialtiefbau"
                    }, {"id": "95411", "title": "GT-Blockveranstaltungen"}, {
                        "id": "94612",
                        "title": "Ingenieurgeologie 1"
                    }, {
                        "id": "97764",
                        "title": "Mess- und Beobachtungsmethoden Grundbau und Tunnelbau"
                    }, {"id": "96568", "title": "Öffentliches Baurecht"}, {
                        "id": "96567",
                        "title": "Privates Baurecht, Unternehmens- u. Vertragsrecht"
                    }, {"id": "94611", "title": "Projektarbeit"}, {
                        "id": "98844",
                        "title": "Projektmanagement"
                    }, {"id": "98871", "title": "Sonderbauverfahren im Tunnelbau"}, {
                        "id": "99270",
                        "title": "Tunnelvortriebsmaschinen"
                    }, {"id": "94320", "title": "Unternehmensführung"}, {
                        "id": "99273",
                        "title": "Verformungs- und Tragfähigkeitsanalysen"
                    }]
                }, {
                    "id": "172",
                    "name": "IB1A",
                    "courses": [{"id": "99225", "title": "1_Analoge Darstellung"}, {
                        "id": "98814",
                        "title": "1_Architekturgeschichte"
                    }, {"id": "98812", "title": "1_Digitale Darstellung"}, {
                        "id": "97833",
                        "title": "1_Exkursion"
                    }, {"id": "98813", "title": "1_Grundlagen Gestaltung"}, {
                        "id": "98818",
                        "title": "1_Konstruktion"
                    }, {"id": "98817", "title": "1_Möbeltheorie"}, {
                        "id": "98951",
                        "title": "1_Raumentwurf"
                    }, {"id": "98949", "title": "1_Tragwerk"}, {
                        "id": "95795",
                        "title": "Exchange Abend IB"
                    }, {"id": "96444", "title": "Innenarchitektur"}, {
                        "id": "99587",
                        "title": "KUP Richtig hässlich."
                    }, {"id": "98802", "title": "KUP`s / Innenarchitektur"}, {
                        "id": "98797",
                        "title": "Projektarbeit 3D"
                    }, {"id": "94425", "title": "Semestereröffnung / Innenarchitektur"}, {
                        "id": "98950",
                        "title": "Studioarbeit"
                    }, {"id": "98985", "title": "Vectorworks Schulung Freiraum"}]
                }, {
                    "id": "173",
                    "name": "IB1B",
                    "courses": [{"id": "99225", "title": "1_Analoge Darstellung"}, {
                        "id": "98814",
                        "title": "1_Architekturgeschichte"
                    }, {"id": "98812", "title": "1_Digitale Darstellung"}, {
                        "id": "97833",
                        "title": "1_Exkursion"
                    }, {"id": "98813", "title": "1_Grundlagen Gestaltung"}, {
                        "id": "98818",
                        "title": "1_Konstruktion"
                    }, {"id": "98817", "title": "1_Möbeltheorie"}, {
                        "id": "98951",
                        "title": "1_Raumentwurf"
                    }, {"id": "98949", "title": "1_Tragwerk"}, {
                        "id": "95795",
                        "title": "Exchange Abend IB"
                    }, {"id": "96444", "title": "Innenarchitektur"}, {
                        "id": "99587",
                        "title": "KUP Richtig hässlich."
                    }, {"id": "98802", "title": "KUP`s / Innenarchitektur"}, {
                        "id": "98797",
                        "title": "Projektarbeit 3D"
                    }, {"id": "94425", "title": "Semestereröffnung / Innenarchitektur"}, {
                        "id": "98950",
                        "title": "Studioarbeit"
                    }, {"id": "98985", "title": "Vectorworks Schulung Freiraum"}]
                }, {
                    "id": "169",
                    "name": "IB3A",
                    "courses": [{"id": "99561", "title": "3_Analoge Darstellung"}, {
                        "id": "99642",
                        "title": "3_Designgeschichte"
                    }, {"id": "99562", "title": "3_Digitale Darstellung"}, {
                        "id": "99557",
                        "title": "3_Farbe/Material"
                    }, {"id": "99559", "title": "3_Gebäudelehre"}, {
                        "id": "99563",
                        "title": "3_Konstruktion"
                    }, {"id": "99560", "title": "3_Möbelentwurf"}, {
                        "id": "99558",
                        "title": "3_Möbeltheorie"
                    }, {"id": "99556", "title": "3_Raumentwurf"}, {
                        "id": "99564",
                        "title": "3_Technischer Ausbau"
                    }, {"id": "94701", "title": "Baukonstruktion+Technisches Zeichnen Übung 2"}, {
                        "id": "95795",
                        "title": "Exchange Abend IB"
                    }, {"id": "96444", "title": "Innenarchitektur"}, {
                        "id": "99587",
                        "title": "KUP Richtig hässlich."
                    }, {"id": "98802", "title": "KUP`s / Innenarchitektur"}, {
                        "id": "99653",
                        "title": "Portfolio / Layout"
                    }, {"id": "94425", "title": "Semestereröffnung / Innenarchitektur"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99491",
                        "title": "WF - Kommunikationsfeld Raum"
                    }, {"id": "99534", "title": "WF - Kommunikationsmethoden"}, {
                        "id": "99524",
                        "title": "WF - Kulturgeschichte und Zeitgeist"
                    }]
                }, {
                    "id": "170",
                    "name": "IB3B",
                    "courses": [{"id": "99561", "title": "3_Analoge Darstellung"}, {
                        "id": "99642",
                        "title": "3_Designgeschichte"
                    }, {"id": "99562", "title": "3_Digitale Darstellung"}, {
                        "id": "99557",
                        "title": "3_Farbe/Material"
                    }, {"id": "99559", "title": "3_Gebäudelehre"}, {
                        "id": "99563",
                        "title": "3_Konstruktion"
                    }, {"id": "99560", "title": "3_Möbelentwurf"}, {
                        "id": "99558",
                        "title": "3_Möbeltheorie"
                    }, {"id": "99556", "title": "3_Raumentwurf"}, {
                        "id": "99564",
                        "title": "3_Technischer Ausbau"
                    }, {"id": "94701", "title": "Baukonstruktion+Technisches Zeichnen Übung 2"}, {
                        "id": "95795",
                        "title": "Exchange Abend IB"
                    }, {"id": "96444", "title": "Innenarchitektur"}, {
                        "id": "99587",
                        "title": "KUP Richtig hässlich."
                    }, {"id": "98802", "title": "KUP`s / Innenarchitektur"}, {
                        "id": "99653",
                        "title": "Portfolio / Layout"
                    }, {"id": "94425", "title": "Semestereröffnung / Innenarchitektur"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99491",
                        "title": "WF - Kommunikationsfeld Raum"
                    }, {"id": "99534", "title": "WF - Kommunikationsmethoden"}, {
                        "id": "99524",
                        "title": "WF - Kulturgeschichte und Zeitgeist"
                    }]
                }, {
                    "id": "171",
                    "name": "IB5",
                    "courses": [{"id": "94688", "title": "Angewandte Geometrie + Computer Übung 4"}, {
                        "id": "94678",
                        "title": "Architekturgeschichte und -theorie 4"
                    }, {"id": "94681", "title": "Baukonstruktion 4"}, {
                        "id": "94680",
                        "title": "Baukonstruktion+Technisches Zeichnen Übung 4"
                    }, {"id": "94689", "title": "Bauwirtschaftslehre 2"}, {
                        "id": "98972",
                        "title": "Entwurf Raum 4"
                    }, {"id": "95795", "title": "Exchange Abend IB"}, {
                        "id": "94691",
                        "title": "Humanwissenschaften 2"
                    }, {"id": "99587", "title": "KUP Richtig hässlich."}, {
                        "id": "98802",
                        "title": "KUP`s / Innenarchitektur"
                    }, {"id": "94690", "title": "Licht, Farbe, Material Übung 4"}, {
                        "id": "94687",
                        "title": "Möbel+Bauteilkonstruktion 4"
                    }, {"id": "94425", "title": "Semestereröffnung / Innenarchitektur"}, {
                        "id": "94686",
                        "title": "Technischer Ausbau 2"
                    }, {"id": "94685", "title": "Technischer Ausbau Übung 2"}]
                }, {
                    "id": "96",
                    "name": "IF1",
                    "courses": [{"id": "94895", "title": "Arbeitstechniken im Studium"}, {
                        "id": "94880",
                        "title": "Betriebswirtschaftslehre"
                    }, {"id": "94790", "title": "Diskrete Mathematik"}, {
                        "id": "94054",
                        "title": "Einführung i. d. Informatik - Grundlagen der Informatik"
                    }, {"id": "94006", "title": "Einführung i. d. Informatik - Rechnerpraxis"}, {
                        "id": "94394",
                        "title": "Einführungsveranstaltung Semester 1 Plus"
                    }, {"id": "94899", "title": "Fremdsprachen - B2"}, {
                        "id": "95184",
                        "title": "Fremdsprachen 1 - B1"
                    }, {"id": "94896", "title": "Fremdsprachen 1 - C1"}, {
                        "id": "94314",
                        "title": "Mathematik 1"
                    }, {"id": "94894", "title": "Mathematik 1"}, {
                        "id": "94075",
                        "title": "Programmieren 1"
                    }, {"id": "94339", "title": "Tutorium Diskrete Mathematik IF"}, {
                        "id": "94336",
                        "title": "Tutorium Mathematik 1"
                    }, {"id": "94370", "title": "Tutorium Programmieren 1"}]
                }, {
                    "id": "97",
                    "name": "IF1Plus",
                    "courses": [{"id": "94892", "title": "Algebra"}, {
                        "id": "95188",
                        "title": "Analysis"
                    }, {"id": "95187", "title": "Arbeitstechnik"}, {
                        "id": "94895",
                        "title": "Arbeitstechniken im Studium"
                    }, {"id": "95189", "title": "Geometrie"}, {
                        "id": "99788",
                        "title": "Informationsveranstaltung PVL Programmieren 1 (1Plus)"
                    }, {"id": "94893", "title": "Programmieren"}, {
                        "id": "97732",
                        "title": "Wahrscheinlichkeitsrechnung"
                    }]
                }, {
                    "id": "98",
                    "name": "IF2",
                    "courses": [{"id": "94300", "title": "Informatik Projekt 1 - Software-Projekt 1"}, {
                        "id": "93926",
                        "title": "Informatik Projekt 1 - Software-Projektmanagement"
                    }, {"id": "95712", "title": "Internet-Programmierung"}, {
                        "id": "94133",
                        "title": "Lineare Algebra"
                    }, {"id": "94279", "title": "Mathematik 2"}, {
                        "id": "93868",
                        "title": "Programmieren 2"
                    }, {"id": "95221", "title": "PVL Mathematik 2"}, {
                        "id": "94334",
                        "title": "Tutorium Mathematik 2"
                    }, {"id": "94434", "title": "Tutorium Programmieren 2"}]
                }, {
                    "id": "99",
                    "name": "IF3_4",
                    "courses": [{
                        "id": "96678",
                        "title": "Datenstrukturen und Algorithmen",
                        "checked": true
                    }, {
                        "id": "94010",
                        "title": "Infoveranstaltung Informatik Bachelor-Thesis und Ausland"
                    }, {"id": "93921", "title": "Kommunikationssysteme-Netzwerke", "checked": true}, {
                        "id": "96660",
                        "title": "Kommunikationssysteme-Verteilte Systeme",
                        "checked": true
                    }, {"id": "98981", "title": "Numerik"}, {
                        "id": "96565",
                        "title": "Software-Technik - Software-Engineering",
                        "checked": true
                    }, {
                        "id": "99146",
                        "title": "Software-Technik - Software-Modellierung",
                        "checked": true
                    }, {
                        "id": "97678",
                        "title": "Sondermodul 1 - Mathematische Grundlagen der geometrischen Modellierung"
                    }, {"id": "97581", "title": "Statistik", "checked": true}, {
                        "id": "96570",
                        "title": "Theoretische Informatik",
                        "checked": true
                    }, {"id": "99280", "title": "Tutorium Numerik"}, {
                        "id": "96902",
                        "title": "Tutorium Statistik",
                        "checked": true
                    }]
                }, {
                    "id": "100",
                    "name": "IF5_6",
                    "courses": [{"id": "99210", "title": "Algorithmische Geometrie"}, {
                        "id": "98660",
                        "title": "Enterprise Architecture Management"
                    }, {"id": "99099", "title": "Geo-Visualisierung"}, {
                        "id": "93852",
                        "title": "Geschäftsprozessmanagement"
                    }, {"id": "94321", "title": "Informatik-Projekt 2"}, {
                        "id": "94010",
                        "title": "Infoveranstaltung Informatik Bachelor-Thesis und Ausland"
                    }, {"id": "96650", "title": "IT-Sicherheit 2"}, {
                        "id": "99478",
                        "title": "Künstliche Intelligenz"
                    }, {"id": "95358", "title": "Mensch-Maschine-Kommunikation"}, {
                        "id": "95027",
                        "title": "Präsentationstraining"
                    }, {"id": "95026", "title": "Seminar"}, {"id": "99098", "title": "Unternehmens-Software 1"}]
                }, {
                    "id": "101",
                    "name": "IF7",
                    "courses": [{"id": "95007", "title": "Bachelor-Seminar"}, {
                        "id": "95185",
                        "title": "Betriebspsychologie"
                    }, {"id": "98651", "title": "Content Management"}, {
                        "id": "98660",
                        "title": "Enterprise Architecture Management"
                    }, {
                        "id": "94010",
                        "title": "Infoveranstaltung Informatik Bachelor-Thesis und Ausland"
                    }, {"id": "96650", "title": "IT-Sicherheit 2"}, {
                        "id": "99478",
                        "title": "Künstliche Intelligenz"
                    }, {"id": "95405", "title": "Recht"}]
                }, {
                    "id": "123",
                    "name": "IL1",
                    "courses": [{
                        "id": "99263",
                        "title": "Einführung i.d. Logistik und Betriebswirtschaftslehre"
                    }, {"id": "98859", "title": "Fremdsprachen 1"}, {
                        "id": "99124",
                        "title": "Grundlagen der Informationslogistik"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "97032",
                        "title": "Mathematik 1"
                    }, {"id": "98434", "title": "Programmieren 1"}, {
                        "id": "98860",
                        "title": "Rhetorik"
                    }, {"id": "99284", "title": "Tutorium Mathematik 1"}, {
                        "id": "98984",
                        "title": "Tutorium Programmieren 1"
                    }]
                }, {
                    "id": "125",
                    "name": "IL2",
                    "courses": [{"id": "94314", "title": "Mathematik 1"}, {"id": "94462", "title": "Mathematik 2"}]
                }, {
                    "id": "127",
                    "name": "IL3",
                    "courses": [{"id": "96678", "title": "Datenstrukturen und Algorithmen"}, {
                        "id": "99428",
                        "title": "Datenstrukturen und Algorithmen"
                    }, {"id": "99099", "title": "Geo-Visualisierung"}, {
                        "id": "98870",
                        "title": "Grundlagen Informatik 2"
                    }, {"id": "99190", "title": "IT in der Logistik"}, {
                        "id": "94462",
                        "title": "Mathematik 2"
                    }, {"id": "98865", "title": "Modellierung raumbezogener Daten"}, {
                        "id": "98433",
                        "title": "Operations Research"
                    }, {"id": "96045", "title": "Workflow Management"}]
                }, {
                    "id": "130",
                    "name": "IL5",
                    "courses": [{"id": "96989", "title": "Projektdokumentation und Präsentation"}]
                }, {"id": "131", "name": "IL6", "courses": []}, {
                    "id": "132",
                    "name": "IL7",
                    "courses": [{
                        "id": "98854",
                        "title": "Ausgewählte Kapitel der Informationslogistik"
                    }, {"id": "98651", "title": "Content Management"}, {
                        "id": "98750",
                        "title": "Interdisziplinäres Projekt"
                    }, {"id": "98751", "title": "Software-Projektmanagement"}]
                }, {
                    "id": "73",
                    "name": "IM1",
                    "courses": [{"id": "93923", "title": "Baustoffe"}, {
                        "id": "94956",
                        "title": "Betriebswirtschaftslehre"
                    }, {"id": "94087", "title": "Computer Aided Design (CAD)"}, {
                        "id": "94800",
                        "title": "Einführung in die Informatik"
                    }, {"id": "95201", "title": "Finanzmathematik"}, {
                        "id": "94849",
                        "title": "Geographische Informationssysteme (GIS)"
                    }, {"id": "97333", "title": "Geologie und Felshohlraumbau"}, {
                        "id": "94955",
                        "title": "Infrastrukturmanagement"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "94601",
                        "title": "Mathematische Grundlagen 1"
                    }, {"id": "94850", "title": "Physik für Ingenieure"}, {
                        "id": "94099",
                        "title": "Schlüsselqualifikation A"
                    }, {"id": "94332", "title": "Tutorium Mathematische Grundlagen 1"}, {
                        "id": "94163",
                        "title": "Volkswirtschaftslehre"
                    }]
                }, {
                    "id": "197",
                    "name": "IM2",
                    "courses": [{"id": "93890", "title": "Bau- und Immobilienwirtschaft"}, {
                        "id": "95497",
                        "title": "Bauorganisation"
                    }, {"id": "94848", "title": "Bodenmechanik und Erdbau"}, {
                        "id": "94313",
                        "title": "Entwurf von Verkehrsanlagen"
                    }, {"id": "94849", "title": "Geographische Informationssysteme (GIS)"}, {
                        "id": "94936",
                        "title": "IT-Anwendungen im Verkehrswesen"
                    }, {"id": "99234", "title": "Konventionelle Energien"}, {
                        "id": "95012",
                        "title": "Mathematische Grundlagen 2"
                    }, {"id": "93931", "title": "Projektmanagement A"}, {
                        "id": "99238",
                        "title": "Regenerative Energien"
                    }, {"id": "94847", "title": "Stadtverkehrsplanung"}, {
                        "id": "95496",
                        "title": "Statistik"
                    }, {"id": "94844", "title": "Technisches Englisch"}, {
                        "id": "94331",
                        "title": "Tutorium Mathematische Grundlagen 2"
                    }]
                }, {
                    "id": "174",
                    "name": "IM3",
                    "courses": [{"id": "94653", "title": "Betrieb und Erhaltung"}, {
                        "id": "99283",
                        "title": "Controlling"
                    }, {"id": "94960", "title": "Elektrizitätsversorgung"}, {
                        "id": "94285",
                        "title": "Gasversorgung"
                    }, {"id": "94962", "title": "Grundlagen Arbeitsschutz"}, {
                        "id": "95414",
                        "title": "Grundlagen der Wasserwirtschaft und Hydromechanik"
                    }, {"id": "94961", "title": "Informations-und Kommunikationstechnik"}, {
                        "id": "99207",
                        "title": "Kostenmanagement"
                    }, {"id": "95415", "title": "Öffentliches und bürgerliches Recht"}, {
                        "id": "99208",
                        "title": "Projektmanagement B"
                    }, {"id": "94954", "title": "Schlüsselqualifikation B"}, {
                        "id": "99181",
                        "title": "Straßenbautechnik"
                    }, {"id": "94845", "title": "Wirtschaftsenglisch"}]
                }, {
                    "id": "78",
                    "name": "IM4",
                    "courses": [{"id": "94803", "title": "BPS Kolloquium ISM"}]
                }, {
                    "id": "79",
                    "name": "IM5",
                    "courses": [{"id": "94345", "title": "Arbeitsschutzmanagement"}, {
                        "id": "94266",
                        "title": "Energiemanagement"
                    }, {"id": "94094", "title": "Facility Management"}, {
                        "id": "94500",
                        "title": "Fern- und Nahwärmeversorgung"
                    }, {"id": "94499", "title": "Gebäudeenergietechnik"}, {
                        "id": "94777",
                        "title": "Grundlagen von Stadtplanung und Städtebau"
                    }, {"id": "94046", "title": "Infrastructure Finance"}, {
                        "id": "94843",
                        "title": "Interdisziplinäres Projekt A/B"
                    }, {"id": "94257", "title": "Netzwerkökonomie und Regulierung"}, {
                        "id": "95535",
                        "title": "Öffentliche Verwaltung"
                    }, {"id": "94498", "title": "Organisations- und Dienstleistungsmanagement"}, {
                        "id": "99103",
                        "title": "Personalmanagement"
                    }, {"id": "94869", "title": "Personalwesen"}, {
                        "id": "93932",
                        "title": "Projektentwicklung"
                    }, {"id": "94366", "title": "Vectorworks ISM"}]
                }, {
                    "id": "80",
                    "name": "IM6",
                    "courses": [{"id": "94497", "title": "Abfallwirtschaft/-technik"}, {
                        "id": "94840",
                        "title": "Abwasserentsorgung und -behandlung"
                    }, {"id": "94491", "title": "Bahntechnik"}, {
                        "id": "94542",
                        "title": "Infoveranstaltung wissenschaftliches Arbeiten & weiterführende Masterstudiengänge ISM"
                    }, {"id": "94843", "title": "Interdisziplinäres Projekt A/B"}, {
                        "id": "94846",
                        "title": "Mobilitätskonzepte"
                    }, {"id": "99038", "title": "Öffentlicher Verkehr"}, {
                        "id": "94842",
                        "title": "Städtebauliches Entwerfen"
                    }, {"id": "94841", "title": "Stadtgestaltung und öffentlicher Raum"}, {
                        "id": "94225",
                        "title": "Verkehrsplanung"
                    }, {"id": "94444", "title": "Wasserversorgung"}]
                }, {
                    "id": "81",
                    "name": "IM7",
                    "courses": [{"id": "94497", "title": "Abfallwirtschaft/-technik"}, {
                        "id": "93916",
                        "title": "Bachelorkolloquium ISM"
                    }, {"id": "94491", "title": "Bahntechnik"}, {
                        "id": "94762",
                        "title": "Energieeffizienz (Prof. Schröter/Prof. Mollenkopf)"
                    }, {"id": "94266", "title": "Energiemanagement"}, {
                        "id": "99038",
                        "title": "Öffentlicher Verkehr"
                    }, {"id": "94112", "title": "Öffentliches und privates Baurecht"}, {
                        "id": "94024",
                        "title": "Umweltmanagement"
                    }]
                }, {
                    "id": "41",
                    "name": "KE2",
                    "courses": [{"id": "98729", "title": "Angewandte Mathematik 2"}, {
                        "id": "98768",
                        "title": "Baukonstruktion & Entwerfen 2"
                    }, {"id": "99154", "title": "Bauphysik 2"}, {
                        "id": "98748",
                        "title": "Case Studies 1"
                    }, {"id": "98767", "title": "Gebäudetechnik und Regenerative Energien 2"}, {
                        "id": "98282",
                        "title": "Materialkunde 2"
                    }, {"id": "98780", "title": "Simulationswerkzeuge 1"}, {
                        "id": "98736",
                        "title": "Strömungsdynamik"
                    }, {"id": "98737", "title": "Thermodynamik"}, {
                        "id": "98980",
                        "title": "Tragwerkslehre 1"
                    }, {"id": "99121", "title": "Tutorium Angewandte Mathematik 2"}, {
                        "id": "96520",
                        "title": "Tutorium SIM 1"
                    }]
                }, {
                    "id": "43",
                    "name": "KE4",
                    "courses": [{"id": "98747", "title": "Case Studies 2"}, {
                        "id": "98777",
                        "title": "Fassadenplanung"
                    }, {"id": "94453", "title": "GE3 - Gebäudelehre 2"}, {
                        "id": "99025",
                        "title": "Gebäudelehre 2"
                    }, {"id": "99157", "title": "Gebäudesanierung und Denkmalpflege 1"}, {
                        "id": "94175",
                        "title": "Integriertes Planen 2"
                    }, {"id": "98853", "title": "Labor 2"}, {"id": "97768", "title": "Lichtplanung 2"}, {
                        "id": "99114",
                        "title": "Simulationswerkzeuge 3"
                    }, {"id": "97146", "title": "Tutorium Simulationswerkzeuge"}]
                }, {"id": "44", "name": "KE5", "courses": []}, {
                    "id": "45",
                    "name": "KE6",
                    "courses": [{"id": "98783", "title": "Case Studies 3"}, {
                        "id": "98792",
                        "title": "Energetische Stadtplanung"
                    }, {"id": "98778", "title": "Gebäudegesamtenergieeffizienz"}, {
                        "id": "98799",
                        "title": "Gebäudesanierung & Denkmalpflege 2"
                    }, {"id": "99246", "title": "Infrastruktur, Verkehr, Abfall, Wasser"}, {
                        "id": "99259",
                        "title": "Mess- und Regeltechnik"
                    }, {"id": "98749", "title": "Philosophie und Ethik"}, {
                        "id": "99142",
                        "title": "Projekt Status Seminar 2"
                    }, {"id": "98444", "title": "Simulationswerkzeuge 4"}, {
                        "id": "95236",
                        "title": "Wissenschaftliches Arbeiten"
                    }, {"id": "98774", "title": "Zertifizierungssysteme"}]
                }, {
                    "id": "156",
                    "name": "KI_VZ1",
                    "courses": [{"id": "94983", "title": "Bauen im Bestand"}, {
                        "id": "99486",
                        "title": "BIM im Lebenszyklus"
                    }, {"id": "95150", "title": "Brückenbau"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {
                        "id": "98731",
                        "title": "Erweiterte Stabilitätsprobleme und nichtlineare Effekte"
                    }, {"id": "98741", "title": "Flächentragwerke"}, {
                        "id": "94610",
                        "title": "Geotechnik-Seminar"
                    }, {"id": "97666", "title": "Ingenieurholzbau"}, {
                        "id": "98959",
                        "title": "Konstruktiver Glasbau"
                    }, {"id": "98740", "title": "Konstruktives Entwerfen im Hochbau"}, {
                        "id": "96568",
                        "title": "Öffentliches Baurecht"
                    }, {"id": "96567", "title": "Privates Baurecht, Unternehmens- u. Vertragsrecht"}, {
                        "id": "94385",
                        "title": "Projekt"
                    }, {"id": "98844", "title": "Projektmanagement"}, {
                        "id": "98960",
                        "title": "Spannbetonbau"
                    }, {"id": "95582", "title": "Stahlbetonbau"}, {"id": "94320", "title": "Unternehmensführung"}]
                }, {
                    "id": "36",
                    "name": "MA1",
                    "courses": [{"id": "94374", "title": "ER - Entwurf Vertiefung Raum"}, {
                        "id": "99327",
                        "title": "ER - Integration Vertiefung Raum"
                    }, {"id": "95378", "title": "Eröffnungsfeier Master-Studiengänge"}, {
                        "id": "94557",
                        "title": "ES - Entwurf Vertiefung Städtebau"
                    }, {"id": "94577", "title": "ET - Entwurf Vertiefung Technik"}, {
                        "id": "94581",
                        "title": "GD1 - Raumgestaltung"
                    }, {"id": "99530", "title": "WF - Angewandte Psychologie"}, {
                        "id": "99364",
                        "title": "WF - Architecture and Place"
                    }, {"id": "99328", "title": "WF - Architekturfotografie"}, {
                        "id": "99342",
                        "title": "WF - Architekturkritik (Architekturqualität)"
                    }, {"id": "99334", "title": "WF - Architekturmodell, Grafik und Präsentation"}, {
                        "id": "99332",
                        "title": "WF - BIM+"
                    }, {"id": "99513", "title": "WF - BWL - Basiswissen Büchführung"}, {
                        "id": "99337",
                        "title": "WF - Einführung Projektmanagement"
                    }, {"id": "99335", "title": "WF - Fassadenkonstruktionen"}, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "37",
                    "name": "MA2",
                    "courses": [{"id": "94374", "title": "ER - Entwurf Vertiefung Raum"}, {
                        "id": "99327",
                        "title": "ER - Integration Vertiefung Raum"
                    }, {"id": "94557", "title": "ES - Entwurf Vertiefung Städtebau"}, {
                        "id": "94577",
                        "title": "ET - Entwurf Vertiefung Technik"
                    }, {"id": "94574", "title": "ST - Studio Stadt"}, {
                        "id": "99530",
                        "title": "WF - Angewandte Psychologie"
                    }, {"id": "99364", "title": "WF - Architecture and Place"}, {
                        "id": "99328",
                        "title": "WF - Architekturfotografie"
                    }, {"id": "99342", "title": "WF - Architekturkritik (Architekturqualität)"}, {
                        "id": "99334",
                        "title": "WF - Architekturmodell, Grafik und Präsentation"
                    }, {"id": "99332", "title": "WF - BIM+"}, {
                        "id": "99513",
                        "title": "WF - BWL - Basiswissen Büchführung"
                    }, {"id": "99337", "title": "WF - Einführung Projektmanagement"}, {
                        "id": "99335",
                        "title": "WF - Fassadenkonstruktionen"
                    }, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "38",
                    "name": "MA3",
                    "courses": [{"id": "94374", "title": "ER - Entwurf Vertiefung Raum"}, {
                        "id": "99327",
                        "title": "ER - Integration Vertiefung Raum"
                    }, {"id": "94557", "title": "ES - Entwurf Vertiefung Städtebau"}, {
                        "id": "94577",
                        "title": "ET - Entwurf Vertiefung Technik"
                    }, {"id": "98952", "title": "KM - Kostenmanagement"}, {
                        "id": "99530",
                        "title": "WF - Angewandte Psychologie"
                    }, {"id": "99364", "title": "WF - Architecture and Place"}, {
                        "id": "99328",
                        "title": "WF - Architekturfotografie"
                    }, {"id": "99342", "title": "WF - Architekturkritik (Architekturqualität)"}, {
                        "id": "99334",
                        "title": "WF - Architekturmodell, Grafik und Präsentation"
                    }, {"id": "99332", "title": "WF - BIM+"}, {
                        "id": "99513",
                        "title": "WF - BWL - Basiswissen Büchführung"
                    }, {"id": "99337", "title": "WF - Einführung Projektmanagement"}, {
                        "id": "99335",
                        "title": "WF - Fassadenkonstruktionen"
                    }, {
                        "id": "99594",
                        "title": "WF - Fotographie und Videographie als methodische Analyseinstrumente"
                    }, {"id": "99330", "title": "WF - Freihandzeichnen"}, {
                        "id": "99329",
                        "title": "WF - Freiraum- und Grünplanung"
                    }, {"id": "99490", "title": "WF - Grafik und Layout"}, {
                        "id": "99340",
                        "title": "WF - Honorarrecht"
                    }, {"id": "99491", "title": "WF - Kommunikationsfeld Raum"}, {
                        "id": "99534",
                        "title": "WF - Kommunikationsmethoden"
                    }, {"id": "99524", "title": "WF - Kulturgeschichte und Zeitgeist"}, {
                        "id": "99343",
                        "title": "WF - Kunstgeschichte"
                    }, {"id": "99493", "title": "WF - Lichtplanung"}, {
                        "id": "99494",
                        "title": "WF - Lichtworkshop"
                    }, {"id": "99336", "title": "WF - Nachhaltiges und kreislaufgerechtes Bauen"}, {
                        "id": "99333",
                        "title": "WF - Parametrischer Modellbau Architektur"
                    }, {"id": "99338", "title": "WF - Projektentwicklung"}, {
                        "id": "99496",
                        "title": "WF - Städtebau im Bestand"
                    }, {"id": "99331", "title": "WF - Stegreifentwurf 1"}, {
                        "id": "99662",
                        "title": "WF - Studentenwettbewerb Lörrach"
                    }, {"id": "99506", "title": "WF - Technische Infrastruktur"}, {
                        "id": "99341",
                        "title": "WF - Terminplanung"
                    }, {"id": "99499", "title": "WF - Vertiefung Städtebau"}, {
                        "id": "99339",
                        "title": "WF - Vertragsrecht"
                    }]
                }, {
                    "id": "109",
                    "name": "MB1A",
                    "courses": [{"id": "94023", "title": "Analysis A"}, {
                        "id": "95187",
                        "title": "Arbeitstechnik"
                    }, {"id": "94885", "title": "Einführung in die Finanzmathematik"}, {
                        "id": "94883",
                        "title": "Ergänzungen zur Analysis A"
                    }, {"id": "94520", "title": "Geometrie"}, {
                        "id": "94391",
                        "title": "Grundlagen Informatik 1"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "94173",
                        "title": "Lineare Algebra 1"
                    }, {"id": "94768", "title": "Tutorium Analysis A"}, {
                        "id": "94767",
                        "title": "Tutorium Grundlagen Informatik 1"
                    }, {"id": "94769", "title": "Tutorium LIA 1"}]
                }, {
                    "id": "110",
                    "name": "MB1B",
                    "courses": [{"id": "94023", "title": "Analysis A"}, {
                        "id": "95187",
                        "title": "Arbeitstechnik"
                    }, {"id": "94885", "title": "Einführung in die Finanzmathematik"}, {
                        "id": "94883",
                        "title": "Ergänzungen zur Analysis A"
                    }, {"id": "94520", "title": "Geometrie"}, {
                        "id": "94391",
                        "title": "Grundlagen Informatik 1"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "94173",
                        "title": "Lineare Algebra 1"
                    }, {"id": "94768", "title": "Tutorium Analysis A"}, {
                        "id": "94767",
                        "title": "Tutorium Grundlagen Informatik 1"
                    }, {"id": "94769", "title": "Tutorium LIA 1"}]
                }, {
                    "id": "122",
                    "name": "MB1Plus",
                    "courses": [{"id": "94892", "title": "Algebra"}, {
                        "id": "95188",
                        "title": "Analysis"
                    }, {"id": "95187", "title": "Arbeitstechnik"}, {
                        "id": "94895",
                        "title": "Arbeitstechniken im Studium"
                    }, {"id": "95189", "title": "Geometrie"}, {"id": "94893", "title": "Programmieren"}, {
                        "id": "97732",
                        "title": "Wahrscheinlichkeitsrechnung"
                    }]
                }, {
                    "id": "111",
                    "name": "MB2",
                    "courses": [{"id": "94778", "title": "Analysis B"}, {
                        "id": "94885",
                        "title": "Einführung in die Finanzmathematik"
                    }, {"id": "94779", "title": "Ergänzungen zur Analysis B"}, {
                        "id": "98432",
                        "title": "Fremdsprache"
                    }, {"id": "94520", "title": "Geometrie"}, {
                        "id": "98870",
                        "title": "Grundlagen Informatik 2"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93920",
                        "title": "Lineare Algebra 2"
                    }, {"id": "94390", "title": "Lineare Optimierung"}, {
                        "id": "95327",
                        "title": "Präsentationstraining Mathematik"
                    }, {"id": "94765", "title": "Tutorium Analysis B"}, {
                        "id": "94764",
                        "title": "Tutorium Grundlagen Informatik 2"
                    }, {"id": "94766", "title": "Tutorium LIA 2"}]
                }, {
                    "id": "112",
                    "name": "MB3FV",
                    "courses": [{"id": "93968", "title": "Algebra"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {"id": "93960", "title": "Finanzmathematik 1"}, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "93961", "title": "Signal- und Bildverarbeitung"}, {
                        "id": "98862",
                        "title": "Software Engineering"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}, {
                        "id": "94183",
                        "title": "Stochastik"
                    }, {"id": "99686", "title": "Tutorium Differentialgleichungen"}, {
                        "id": "99747",
                        "title": "Tutorium Software Engineering"
                    }, {"id": "99282", "title": "Tutorium Stochastik"}, {
                        "id": "99126",
                        "title": "Versicherungsmathematik 1"
                    }]
                }, {
                    "id": "113",
                    "name": "MB3IM",
                    "courses": [{"id": "93968", "title": "Algebra"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {"id": "93960", "title": "Finanzmathematik 1"}, {
                        "id": "95642",
                        "title": "Graphische Datenverarbeitung"
                    }, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "93961", "title": "Signal- und Bildverarbeitung"}, {
                        "id": "98862",
                        "title": "Software Engineering"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}, {
                        "id": "94183",
                        "title": "Stochastik"
                    }, {"id": "99686", "title": "Tutorium Differentialgleichungen"}, {
                        "id": "99747",
                        "title": "Tutorium Software Engineering"
                    }, {"id": "99282", "title": "Tutorium Stochastik"}]
                }, {
                    "id": "115",
                    "name": "MB4FV",
                    "courses": [{"id": "93968", "title": "Algebra"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {"id": "93960", "title": "Finanzmathematik 1"}, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "93961", "title": "Signal- und Bildverarbeitung"}, {
                        "id": "98862",
                        "title": "Software Engineering"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}, {
                        "id": "94183",
                        "title": "Stochastik"
                    }, {"id": "99686", "title": "Tutorium Differentialgleichungen"}, {
                        "id": "99747",
                        "title": "Tutorium Software Engineering"
                    }, {"id": "99282", "title": "Tutorium Stochastik"}, {
                        "id": "99126",
                        "title": "Versicherungsmathematik 1"
                    }]
                }, {
                    "id": "114",
                    "name": "MB4IM",
                    "courses": [{"id": "93968", "title": "Algebra"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {"id": "93960", "title": "Finanzmathematik 1"}, {
                        "id": "95642",
                        "title": "Graphische Datenverarbeitung"
                    }, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "93961", "title": "Signal- und Bildverarbeitung"}, {
                        "id": "98862",
                        "title": "Software Engineering"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}, {
                        "id": "94183",
                        "title": "Stochastik"
                    }, {"id": "99686", "title": "Tutorium Differentialgleichungen"}, {
                        "id": "99747",
                        "title": "Tutorium Software Engineering"
                    }, {"id": "99282", "title": "Tutorium Stochastik"}]
                }, {
                    "id": "117",
                    "name": "MB5FV",
                    "courses": [{"id": "97436", "title": "Datenbanken"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}]
                }, {
                    "id": "116",
                    "name": "MB5IM",
                    "courses": [{"id": "97436", "title": "Datenbanken"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}]
                }, {
                    "id": "118",
                    "name": "MB6FV",
                    "courses": [{"id": "97436", "title": "Datenbanken"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}]
                }, {
                    "id": "119",
                    "name": "MB6IM",
                    "courses": [{"id": "97436", "title": "Datenbanken"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}]
                }, {
                    "id": "120",
                    "name": "MB7FV",
                    "courses": [{"id": "93968", "title": "Algebra"}, {
                        "id": "99232",
                        "title": "Bachelor-Seminar"
                    }, {"id": "97436", "title": "Datenbanken"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "93961", "title": "Signal- und Bildverarbeitung"}, {
                        "id": "95503",
                        "title": "Sonderfach - Applicable Mathematical Science"
                    }, {"id": "96570", "title": "Theoretische Informatik"}, {
                        "id": "99686",
                        "title": "Tutorium Differentialgleichungen"
                    }]
                }, {
                    "id": "121",
                    "name": "MB7IM",
                    "courses": [{"id": "93968", "title": "Algebra"}, {
                        "id": "99232",
                        "title": "Bachelor-Seminar"
                    }, {"id": "97436", "title": "Datenbanken"}, {
                        "id": "93964",
                        "title": "Differentialgleichungen"
                    }, {"id": "93960", "title": "Finanzmathematik 1"}, {
                        "id": "94272",
                        "title": "Informationsveranstaltung Auslandssemester für Mathematik"
                    }, {"id": "94884", "title": "Internes Studienprojekt - Tutorenschulung"}, {
                        "id": "93963",
                        "title": "Operations Research"
                    }, {"id": "95503", "title": "Sonderfach - Applicable Mathematical Science"}, {
                        "id": "96570",
                        "title": "Theoretische Informatik"
                    }, {"id": "99686", "title": "Tutorium Differentialgleichungen"}]
                }, {
                    "id": "203",
                    "name": "MH1",
                    "courses": [{"id": "94023", "title": "Analysis A"}, {
                        "id": "95187",
                        "title": "Arbeitstechnik"
                    }, {"id": "94883", "title": "Ergänzungen zur Analysis A"}, {
                        "id": "94173",
                        "title": "Lineare Algebra 1"
                    }, {"id": "94768", "title": "Tutorium Analysis A"}, {"id": "94769", "title": "Tutorium LIA 1"}]
                }, {
                    "id": "204",
                    "name": "MH2",
                    "courses": [{"id": "94778", "title": "Analysis B"}, {
                        "id": "94885",
                        "title": "Einführung in die Finanzmathematik"
                    }, {"id": "94779", "title": "Ergänzungen zur Analysis B"}, {
                        "id": "98432",
                        "title": "Fremdsprache"
                    }, {"id": "94520", "title": "Geometrie"}, {
                        "id": "94391",
                        "title": "Grundlagen Informatik 1"
                    }, {"id": "94765", "title": "Tutorium Analysis B"}, {
                        "id": "94767",
                        "title": "Tutorium Grundlagen Informatik 1"
                    }]
                }, {
                    "id": "205",
                    "name": "MH3",
                    "courses": [{"id": "98870", "title": "Grundlagen Informatik 2"}, {
                        "id": "93920",
                        "title": "Lineare Algebra 2"
                    }, {"id": "94390", "title": "Lineare Optimierung"}, {
                        "id": "94764",
                        "title": "Tutorium Grundlagen Informatik 2"
                    }, {"id": "94766", "title": "Tutorium LIA 2"}]
                }, {
                    "id": "152",
                    "name": "MM FV",
                    "courses": [{"id": "99021", "title": "Analytische Zahlentheorie"}, {
                        "id": "98388",
                        "title": "Business Intelligence"
                    }, {"id": "95378", "title": "Eröffnungsfeier Master-Studiengänge"}, {
                        "id": "96564",
                        "title": "Finance - Teil 1"
                    }, {"id": "98417", "title": "Kryptographie"}, {
                        "id": "99217",
                        "title": "Projekt Finanz- und Versicherungsmathematik"
                    }, {"id": "99287", "title": "Seminar"}, {
                        "id": "94431",
                        "title": "Sicherheitsunterweisung Fakultät C"
                    }, {"id": "99206", "title": "System Design"}]
                }, {
                    "id": "151",
                    "name": "MM IG",
                    "courses": [{"id": "99021", "title": "Analytische Zahlentheorie"}, {
                        "id": "98388",
                        "title": "Business Intelligence"
                    }, {"id": "97034", "title": "CAG - Geometrisches Modellieren"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {"id": "98417", "title": "Kryptographie"}, {
                        "id": "98982",
                        "title": "Projekt Industrielle Geometrie"
                    }, {"id": "99287", "title": "Seminar"}, {
                        "id": "94431",
                        "title": "Sicherheitsunterweisung Fakultät C"
                    }, {"id": "99206", "title": "System Design"}]
                }, {
                    "id": "66",
                    "name": "PB1",
                    "courses": [{"id": "98684", "title": "Betriebswirtschaftslehre"}, {
                        "id": "93986",
                        "title": "Elektrotechnik"
                    }, {"id": "93988", "title": "Grundlagen Schallschutz 1"}, {
                        "id": "93987",
                        "title": "Grundlagen Wärmeschutz 1"
                    }, {"id": "99107", "title": "Materialkunde 1"}, {
                        "id": "94314",
                        "title": "Mathematik 1"
                    }, {"id": "98974", "title": "Mathematik 1"}, {"id": "93985", "title": "Mechanik 1"}, {
                        "id": "96347",
                        "title": "Statistik, Fehlerrechnung"
                    }, {"id": "93984", "title": "Tragwerkslehre"}, {"id": "93983", "title": "Tutorium Mathematik 1"}]
                }, {
                    "id": "68",
                    "name": "PB3",
                    "courses": [{"id": "99111", "title": "Bauphysiklabor 1"}, {
                        "id": "95603",
                        "title": "Brandschutz"
                    }, {"id": "93976", "title": "Gebäudekonstruktion 1"}, {
                        "id": "97163",
                        "title": "Heizung, Klima, Lüftung 1"
                    }, {"id": "99110", "title": "Integrale Planung"}, {
                        "id": "99109",
                        "title": "Mathematik 3"
                    }, {"id": "97160", "title": "Reg. Energietechnik 1"}, {
                        "id": "93977",
                        "title": "Schallimmissionsschutz 1"
                    }, {"id": "99034", "title": "Schallschutz 1"}, {
                        "id": "96901",
                        "title": "Thermodynamik 2"
                    }, {"id": "97449", "title": "Wärmeschutz 1"}]
                }, {
                    "id": "72",
                    "name": "PB7",
                    "courses": [{"id": "94171", "title": "Bachelor-Seminar"}, {
                        "id": "99113",
                        "title": "Bauschadensanalyse 2"
                    }, {"id": "93973", "title": "Betriebspsychologie"}, {
                        "id": "99115",
                        "title": "Körperschall (innovativer Lärmsschutz)"
                    }, {"id": "99043", "title": "Theoretische Bauphysik Schall"}, {
                        "id": "99281",
                        "title": "Thermische Gebäudesimulation"
                    }]
                }, {
                    "id": "33",
                    "name": "PG1",
                    "courses": [{"id": "95378", "title": "Eröffnungsfeier Master-Studiengänge"}, {
                        "id": "97583",
                        "title": "Geostatistics and Surface Modelling"
                    }, {"id": "96542", "title": "GIS"}, {
                        "id": "98436",
                        "title": "Photogrammetry and Remote Sensing"
                    }, {"id": "99155", "title": "Scientific Skills and Media Competence"}]
                }, {"id": "35", "name": "PG3", "courses": [{"id": "98757", "title": "Research Seminar"}]}, {
                    "id": "144",
                    "name": "ST_TZ",
                    "courses": [{"id": "98388", "title": "Business Intelligence"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {"id": "94754", "title": "Introduction Software Technology"}, {
                        "id": "99170",
                        "title": "Middleware Technology"
                    }, {"id": "98809", "title": "Software Project"}, {
                        "id": "99130",
                        "title": "Software Verification and Validation"
                    }, {"id": "99206", "title": "System Design"}]
                }, {
                    "id": "143",
                    "name": "ST_VZ",
                    "courses": [{"id": "98388", "title": "Business Intelligence"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {"id": "94754", "title": "Introduction Software Technology"}, {
                        "id": "99170",
                        "title": "Middleware Technology"
                    }, {"id": "98809", "title": "Software Project"}, {
                        "id": "99130",
                        "title": "Software Verification and Validation"
                    }, {"id": "99206", "title": "System Design"}]
                }, {
                    "id": "193",
                    "name": "UL1",
                    "courses": [{"id": "99106", "title": "Corporate Social Responsibility"}, {
                        "id": "99551",
                        "title": "Einführungsveranstaltung für Studienanfänger/innen"
                    }, {"id": "96065", "title": "Energiesysteme"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {"id": "98206", "title": "Logistik- und Dienstleistungsmanagement"}, {
                        "id": "99188",
                        "title": "Logistik- und Informationssysteme"
                    }, {"id": "96067", "title": "Logistik- und Transportmanagement"}, {
                        "id": "99105",
                        "title": "Supply Chain Management"
                    }, {"id": "99102", "title": "Transport- und Tourenplanung"}, {
                        "id": "99851",
                        "title": "UL1 - Logistics Lunch"
                    }, {"id": "99220", "title": "Umweltorientierte Logistikabwicklung"}, {
                        "id": "98649",
                        "title": "Umweltorientierte Logistikstrategie"
                    }, {"id": "96066", "title": "Umweltorientierte Unternehmensführung"}]
                }, {
                    "id": "196",
                    "name": "UL4",
                    "courses": [{"id": "105618", "title": "Master-Thesis Kolloquium"}, {
                        "id": "99714",
                        "title": "Umlog MT Studierendeninterviews/-testungen"
                    }]
                }, {
                    "id": "191",
                    "name": "UW1",
                    "courses": [{"id": "94372", "title": "Immissionsschutz I - Lärmschutz (LS)"}, {
                        "id": "94371",
                        "title": "Ökologische Zusammenhänge - Gewässerschutz (GWS)"
                    }]
                }, {
                    "id": "192",
                    "name": "UW2_3",
                    "courses": [{"id": "98845", "title": "Abfallwirtschaft"}, {
                        "id": "98847",
                        "title": "Projekt Umweltmanagement/ QSHE-Systeme (Projekt UM)"
                    }, {"id": "98846", "title": "Umweltmanagement und QSHE-Systeme (QSHE)"}]
                }, {
                    "id": "133",
                    "name": "VB1A",
                    "courses": [{"id": "98659", "title": "CAD und Visualisierung"}, {
                        "id": "94625",
                        "title": "Fremdsprachen 1"
                    }, {
                        "id": "96805",
                        "title": "Geodätische Mess- und Auswertetechnik (Polarverfahren)"
                    }, {"id": "98788", "title": "Grundlagen Geographischer Informationssysteme (GIS)"}, {
                        "id": "94198",
                        "title": "Mathematik 1"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "105629",
                        "title": "Schriftliche Modulprüfung CAD"
                    }, {"id": "94330", "title": "Tutorium Mathematik 1"}]
                }, {
                    "id": "134",
                    "name": "VB1B",
                    "courses": [{"id": "98659", "title": "CAD und Visualisierung"}, {
                        "id": "94625",
                        "title": "Fremdsprachen 1"
                    }, {
                        "id": "96805",
                        "title": "Geodätische Mess- und Auswertetechnik (Polarverfahren)"
                    }, {"id": "98788", "title": "Grundlagen Geographischer Informationssysteme (GIS)"}, {
                        "id": "94198",
                        "title": "Mathematik 1"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "105629",
                        "title": "Schriftliche Modulprüfung CAD"
                    }, {"id": "94330", "title": "Tutorium Mathematik 1"}]
                }, {
                    "id": "135",
                    "name": "VB2A",
                    "courses": [{"id": "98659", "title": "CAD und Visualisierung"}, {
                        "id": "94823",
                        "title": "Fremdsprachen 2"
                    }, {
                        "id": "96805",
                        "title": "Geodätische Mess- und Auswertetechnik (Polarverfahren)"
                    }, {"id": "98788", "title": "Grundlagen Geographischer Informationssysteme (GIS)"}, {
                        "id": "94314",
                        "title": "Mathematik 1"
                    }, {"id": "94462", "title": "Mathematik 2"}, {
                        "id": "105629",
                        "title": "Schriftliche Modulprüfung CAD"
                    }, {"id": "94329", "title": "Tutorium Mathematik 2"}, {
                        "id": "105610",
                        "title": "Vorbesprechung IVP SoSe 2020 (Prof. Rawiel)"
                    }]
                }, {
                    "id": "136",
                    "name": "VB2B",
                    "courses": [{"id": "98659", "title": "CAD und Visualisierung"}, {
                        "id": "94823",
                        "title": "Fremdsprachen 2"
                    }, {
                        "id": "96805",
                        "title": "Geodätische Mess- und Auswertetechnik (Polarverfahren)"
                    }, {"id": "98788", "title": "Grundlagen Geographischer Informationssysteme (GIS)"}, {
                        "id": "94314",
                        "title": "Mathematik 1"
                    }, {"id": "94462", "title": "Mathematik 2"}, {
                        "id": "105629",
                        "title": "Schriftliche Modulprüfung CAD"
                    }, {"id": "94329", "title": "Tutorium Mathematik 2"}, {
                        "id": "105610",
                        "title": "Vorbesprechung IVP SoSe 2020 (Prof. Rawiel)"
                    }]
                }, {
                    "id": "137",
                    "name": "VB3_4",
                    "courses": [{"id": "99425", "title": "Ausgleichungsrechnung und Statistik"}, {
                        "id": "97810",
                        "title": "Einführungsveranstaltung Praxisprojekt"
                    }, {"id": "99191", "title": "Geodaten"}, {
                        "id": "94456",
                        "title": "Ingenieurbau und Ingenieurvermessung"
                    }, {"id": "99427", "title": "Interdisziplinäres GIS-Projekt"}, {
                        "id": "99426",
                        "title": "Räumliche Datenbanken und Datenmodellierung"
                    }, {"id": "98192", "title": "Tutorium IUI"}, {
                        "id": "105610",
                        "title": "Vorbesprechung IVP SoSe 2020 (Prof. Rawiel)"
                    }]
                }, {"id": "138", "name": "VB5", "courses": []}, {
                    "id": "139",
                    "name": "VB6_7",
                    "courses": [{"id": "99471", "title": "AKG-STE"}, {
                        "id": "98725",
                        "title": "AKG ALS/MMS - Gülch/Petrini"
                    }, {"id": "98723", "title": "AKG DAF (Prof.Lehmkühler) Raum 2/162"}, {
                        "id": "98888",
                        "title": "AKG DIB"
                    }, {"id": "98724", "title": "AKG IMA - Gülch im Raum 2/222"}, {
                        "id": "99117",
                        "title": "AKG Laserscanning (Rawiel)"
                    }, {"id": "95062", "title": "PUP Rückkehrer VG 6"}, {
                        "id": "98658",
                        "title": "PWA Einführung VG 6/7"
                    }, {"id": "98657", "title": "PWA Vorträge VG 6/7"}]
                }, {
                    "id": "177",
                    "name": "VIS1",
                    "courses": [{"id": "99754", "title": "Besuch der IVLZ in Bad Cannstatt"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {"id": "95836", "title": "Gütertransportlogistik"}, {
                        "id": "94561",
                        "title": "Integrierte Projekte"
                    }, {"id": "97031", "title": "Integrierte Verkehrsplanung"}, {
                        "id": "98947",
                        "title": "Modelle in der Verkehrsplanung"
                    }, {"id": "99271", "title": "ÖV - Grundlagen"}, {
                        "id": "99272",
                        "title": "ÖV - Infrastruktur"
                    }, {"id": "98842", "title": "ÖV - Planung und Betrieb"}, {
                        "id": "98841",
                        "title": "Projektmanagement für Verkehrsprojekte"
                    }, {"id": "96566", "title": "Raum- und Entwicklungsplanung"}, {
                        "id": "98840",
                        "title": "Straßenbetriebsdienst"
                    }, {"id": "97033", "title": "Straßenverkehrssicherheit"}, {
                        "id": "96571",
                        "title": "Transport- und Tourenplanung"
                    }, {"id": "96219", "title": "Tunnelbetrieb-/sicherheit/-aussstattung"}]
                }, {
                    "id": "178",
                    "name": "VIS2",
                    "courses": [{"id": "99754", "title": "Besuch der IVLZ in Bad Cannstatt"}, {
                        "id": "95836",
                        "title": "Gütertransportlogistik"
                    }, {"id": "94561", "title": "Integrierte Projekte"}, {
                        "id": "97031",
                        "title": "Integrierte Verkehrsplanung"
                    }, {"id": "98947", "title": "Modelle in der Verkehrsplanung"}, {
                        "id": "99271",
                        "title": "ÖV - Grundlagen"
                    }, {"id": "99272", "title": "ÖV - Infrastruktur"}, {
                        "id": "98842",
                        "title": "ÖV - Planung und Betrieb"
                    }, {"id": "98841", "title": "Projektmanagement für Verkehrsprojekte"}, {
                        "id": "96566",
                        "title": "Raum- und Entwicklungsplanung"
                    }, {"id": "98840", "title": "Straßenbetriebsdienst"}, {
                        "id": "97033",
                        "title": "Straßenverkehrssicherheit"
                    }, {"id": "96571", "title": "Transport- und Tourenplanung"}, {
                        "id": "96219",
                        "title": "Tunnelbetrieb-/sicherheit/-aussstattung"
                    }]
                }, {
                    "id": "179",
                    "name": "VIS3",
                    "courses": [{"id": "98841", "title": "Projektmanagement für Verkehrsprojekte"}, {
                        "id": "95014",
                        "title": "Wissenschaftliches Kolloquium VISM"
                    }]
                }, {
                    "id": "108",
                    "name": "VM1_2",
                    "courses": [{"id": "95378", "title": "Eröffnungsfeier Master-Studiengänge"}, {
                        "id": "99295",
                        "title": "Fernerkundung"
                    }, {"id": "98020", "title": "Geodatenmanagement"}, {
                        "id": "99296",
                        "title": "Liegenschaftskataster, Planung und Bodenordnung, Flurneuordnung"
                    }, {"id": "98435", "title": "Projekt Landmanagement"}, {
                        "id": "99297",
                        "title": "Projektorganisation und Projektsteuerung"
                    }, {"id": "94431", "title": "Sicherheitsunterweisung Fakultät C"}]
                }, {
                    "id": "61",
                    "name": "WBI1",
                    "courses": [{"id": "94406", "title": "Bauphysik"}, {
                        "id": "94407",
                        "title": "Baustoffe und Bauprodukte"
                    }, {"id": "94403", "title": "Einführung Betriebswirtschaftslehre"}, {
                        "id": "94865",
                        "title": "Englisch A - Gruppe 1"
                    }, {"id": "94864", "title": "Englisch A - Gruppe 2"}, {
                        "id": "94440",
                        "title": "Grundlagen der Bau- und Immobilienwirtschaft"
                    }, {"id": "94441", "title": "Grundlagen der Physik"}, {
                        "id": "94863",
                        "title": "Höhere Mathematik 1"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "94409",
                        "title": "Statik und Festigkeitslehre 1"
                    }, {"id": "94402", "title": "Tutorium Höhere Mathematik 1"}, {
                        "id": "94408",
                        "title": "Übungen Statik und Festigkeitslehre I"
                    }, {"id": "94405", "title": "Volkswirtschaftslehre"}, {
                        "id": "94404",
                        "title": "Wirtschaftsprivatrecht"
                    }]
                }, {
                    "id": "62",
                    "name": "WBI2",
                    "courses": [{"id": "99017", "title": "Baubetriebslehre 1"}, {
                        "id": "94870",
                        "title": "Betriebliches Rechnungswesen"
                    }, {"id": "94045", "title": "Englisch B (Baubezogen) - Gruppe 1"}, {
                        "id": "94044",
                        "title": "Englisch B (Baubezogen) - Gruppe 2"
                    }, {"id": "99180", "title": "Fertigungstechnik"}, {
                        "id": "94009",
                        "title": "Geotechnik"
                    }, {"id": "94862", "title": "Höhere Mathematik 2"}, {
                        "id": "94861",
                        "title": "Kosten- und Leistungsrechnung"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "94417",
                        "title": "Statik und Festigkeitslehre 2"
                    }, {"id": "94324", "title": "Tutorium Höhere Mathematik 2"}, {
                        "id": "97738",
                        "title": "Übungen Statik und Festigkeitslehre II"
                    }, {"id": "94544", "title": "Vermessung"}]
                }, {
                    "id": "63",
                    "name": "WBI3",
                    "courses": [{"id": "94806", "title": "Baubetriebslehre 2"}, {
                        "id": "94239",
                        "title": "Baukonstruktion"
                    }, {"id": "94082", "title": "Baustatik"}, {
                        "id": "94356",
                        "title": "Betriebswirtschaftliche Steuerlehre"
                    }, {"id": "94478", "title": "Bilanzierung"}, {
                        "id": "94480",
                        "title": "Brandschutz"
                    }, {"id": "94479", "title": "Digitale Werkzeuge der Baubetriebslehre"}, {
                        "id": "93910",
                        "title": "Grundlagen der Architektur"
                    }, {
                        "id": "94048",
                        "title": "Kaufmännisches und infrastrukturelles Facility Management"
                    }, {
                        "id": "94475",
                        "title": "Kaufmännisches und infrastrukturelles Facility Management"
                    }, {"id": "94860", "title": "Projektmanagement"}, {
                        "id": "94335",
                        "title": "Risiko- und Nachhaltigkeitsmanagement"
                    }, {"id": "94476", "title": "Risiko- und Nachhaltigkeitsmanagement"}, {
                        "id": "99185",
                        "title": "Stadtplanung"
                    }, {"id": "94049", "title": "Technisches FM und Brandschutz"}]
                }, {
                    "id": "64",
                    "name": "WBI4",
                    "courses": [{"id": "94918", "title": "Arbeitsschutz"}, {
                        "id": "94467",
                        "title": "Ausbau"
                    }, {"id": "94474", "title": "Ausgewählte Kapitel im Massiv-, Stahl- und Holzbau"}, {
                        "id": "94469",
                        "title": "Bauprozessmanagement"
                    }, {"id": "94369", "title": "Finanzmathematik und Statistik"}, {
                        "id": "94468",
                        "title": "Gebäudehülle"
                    }, {"id": "94470", "title": "Grundlagen des Bauvertragsrechts"}, {
                        "id": "94472",
                        "title": "Heizung, Klima, Lüftung 1"
                    }, {"id": "94871", "title": "Investition und Finanzierung für KMU"}, {
                        "id": "99153",
                        "title": "Marketing und Vertrieb im Bauwesen"
                    }, {"id": "94471", "title": "Regenerative Energietechnik"}, {
                        "id": "94473",
                        "title": "Wärmeschutz"
                    }, {"id": "94466", "title": "Wissenschaftliches Arbeiten"}]
                }, {
                    "id": "162",
                    "name": "WBI6 BE",
                    "courses": [{"id": "94107", "title": "Arbeitsschutzmanagement"}, {
                        "id": "93944",
                        "title": "Ausbau und Brandschutz"
                    }, {"id": "93856", "title": "Gebäudehülle"}, {
                        "id": "97055",
                        "title": "Grundlagen der Immobilienökonomie"
                    }, {"id": "93893", "title": "Heizung, Klima, Lüftung 1"}, {
                        "id": "94822",
                        "title": "Honorarberechnung für Ingenieure"
                    }, {"id": "94305", "title": "Immobilienbewertung"}, {
                        "id": "94517",
                        "title": "Öffentliches Bau- und Verwaltungsrecht"
                    }, {"id": "98790", "title": "Privates Baurecht"}, {
                        "id": "94189",
                        "title": "Projektentwicklung im Hochbau"
                    }, {"id": "94856", "title": "Projektstudie"}, {
                        "id": "99264",
                        "title": "Regenerative Energietechnik"
                    }, {"id": "94335", "title": "Risiko- und Nachhaltigkeitsmanagement"}, {
                        "id": "94280",
                        "title": "Wärmeschutz"
                    }]
                }, {
                    "id": "175",
                    "name": "WBI6 IW",
                    "courses": [{"id": "94107", "title": "Arbeitsschutzmanagement"}, {
                        "id": "97055",
                        "title": "Grundlagen der Immobilienökonomie"
                    }, {"id": "97029", "title": "Grundstücks- und Grundbuchrecht"}, {
                        "id": "94822",
                        "title": "Honorarberechnung für Ingenieure"
                    }, {"id": "94305", "title": "Immobilienbewertung"}, {
                        "id": "94312",
                        "title": "Kauf- und Mietvertragsrecht"
                    }, {
                        "id": "94048",
                        "title": "Kaufmännisches und infrastrukturelles Facility Management"
                    }, {"id": "94517", "title": "Öffentliches Bau- und Verwaltungsrecht"}, {
                        "id": "98790",
                        "title": "Privates Baurecht"
                    }, {"id": "94189", "title": "Projektentwicklung im Hochbau"}, {
                        "id": "94856",
                        "title": "Projektstudie"
                    }, {"id": "94335", "title": "Risiko- und Nachhaltigkeitsmanagement"}, {
                        "id": "94049",
                        "title": "Technisches FM und Brandschutz"
                    }]
                }, {
                    "id": "182",
                    "name": "WBI7 BE",
                    "courses": [{"id": "94853", "title": "Arbeitsrecht"}, {
                        "id": "94854",
                        "title": "Bauwerkserhaltung, Sanierung, Umnutzung"
                    }, {"id": "98856", "title": "Energieanlagensimulation"}, {
                        "id": "96724",
                        "title": "Energiekonzepte"
                    }, {"id": "95425", "title": "Heizung, Klima, Lüftung 2"}, {
                        "id": "94306",
                        "title": "Materialinstandsetzung"
                    }, {"id": "94869", "title": "Personalwesen"}, {"id": "94852", "title": "Tarifvertragsrecht"}]
                }, {
                    "id": "183",
                    "name": "WBI7 IW",
                    "courses": [{"id": "94853", "title": "Arbeitsrecht"}, {
                        "id": "94854",
                        "title": "Bauwerkserhaltung, Sanierung, Umnutzung"
                    }, {"id": "98858", "title": "Betriebliches Immobilienmanagement"}, {
                        "id": "95206",
                        "title": "Immobilienfinanzierung und -investition"
                    }, {"id": "97018", "title": "Immobilienmarketing"}, {
                        "id": "94306",
                        "title": "Materialinstandsetzung"
                    }, {"id": "94869", "title": "Personalwesen"}, {"id": "94852", "title": "Tarifvertragsrecht"}]
                }, {
                    "id": "102",
                    "name": "WI1",
                    "courses": [{"id": "99100", "title": "Diskrete Mathematik"}, {
                        "id": "95184",
                        "title": "Fremdsprachen 1 - B1"
                    }, {"id": "94896", "title": "Fremdsprachen 1 - C1"}, {
                        "id": "94774",
                        "title": "Grundlagen der BWL"
                    }, {"id": "99037", "title": "Grundlagen der Informatik"}, {
                        "id": "93816",
                        "title": "Grundlagen der Wirtschaftsinformatik"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "94553",
                        "title": "Mathematik 1"
                    }, {"id": "94788", "title": "Programmieren 1"}, {
                        "id": "94327",
                        "title": "Tutorium Diskrete Mathematik WI"
                    }, {"id": "94328", "title": "Tutorium Mathematik 1"}, {
                        "id": "94370",
                        "title": "Tutorium Programmieren 1"
                    }]
                }, {
                    "id": "104",
                    "name": "WI2",
                    "courses": [{"id": "94891", "title": "Betriebliches ReWe"}, {
                        "id": "99618",
                        "title": "Betriebliches ReWe"
                    }, {"id": "99619", "title": "Betriebliches ReWe"}, {
                        "id": "93945",
                        "title": "DATEV-Tutorium"
                    }, {"id": "99311", "title": "DATEV-Tutorium WI2"}, {
                        "id": "97582",
                        "title": "Fremdsprache 2"
                    }, {"id": "94314", "title": "Mathematik 1"}, {
                        "id": "93889",
                        "title": "Mathematik 2"
                    }, {"id": "94274", "title": "Programmieren 2"}, {
                        "id": "99640",
                        "title": "Rewe 1 - PVL"
                    }, {"id": "99643", "title": "Rewe 1 Tutorium"}, {
                        "id": "94326",
                        "title": "Tutorium Mathematik 2"
                    }, {"id": "94434", "title": "Tutorium Programmieren 2"}, {
                        "id": "97708",
                        "title": "Volkswirtschaftslehre"
                    }, {"id": "95447", "title": "Wi-Inf-Projekt 1"}]
                }, {
                    "id": "105",
                    "name": "WI3_4",
                    "courses": [{"id": "99040", "title": "Auslandsinfo Bachelor Wirtschaftsinformatik"}, {
                        "id": "94061",
                        "title": "BPS Informationsveranstaltung WiInf"
                    }, {"id": "99101", "title": "Datenbanksysteme"}, {
                        "id": "99151",
                        "title": "IT-Sicherheit"
                    }, {"id": "96546", "title": "Kosten- und Leistungsrechnung"}, {
                        "id": "97272",
                        "title": "Operations Research"
                    }, {"id": "98769", "title": "Qualitätsmanagement 1"}, {
                        "id": "97581",
                        "title": "Statistik"
                    }, {"id": "99098", "title": "Unternehmens-Software 1"}]
                }, {
                    "id": "190",
                    "name": "WI5",
                    "courses": [{"id": "99040", "title": "Auslandsinfo Bachelor Wirtschaftsinformatik"}, {
                        "id": "94061",
                        "title": "BPS Informationsveranstaltung WiInf"
                    }, {"id": "95358", "title": "Mensch-Maschine-Kommunikation"}, {
                        "id": "95027",
                        "title": "Präsentationstraining"
                    }]
                }, {
                    "id": "188",
                    "name": "WI6",
                    "courses": [{"id": "99040", "title": "Auslandsinfo Bachelor Wirtschaftsinformatik"}, {
                        "id": "96391",
                        "title": "Beschaffung und Logistik"
                    }, {"id": "96678", "title": "Datenstrukturen und Algorithmen"}, {
                        "id": "93852",
                        "title": "Geschäftsprozessmanagement"
                    }, {
                        "id": "94782",
                        "title": "Informationsveranstaltung Thesis Wirtschaftsinformatik"
                    }, {"id": "96650", "title": "IT-Sicherheit 2"}, {
                        "id": "96660",
                        "title": "Kommunikationssysteme-Verteilte Systeme"
                    }, {"id": "99097", "title": "Mobilitätsdienstleistungen"}, {
                        "id": "95001",
                        "title": "Seminar"
                    }, {"id": "95825", "title": "Sondermodul Informatik-IT-Sicherheit 2"}, {
                        "id": "94887",
                        "title": "Unternehmensführung und Controlling"
                    }, {"id": "94411", "title": "Wi-Inf-Projekt 2"}]
                }, {
                    "id": "107",
                    "name": "WI7",
                    "courses": [{"id": "96053", "title": "Aktuelles Thema der Informatik"}, {
                        "id": "95008",
                        "title": "Bachelor-Seminar"
                    }, {"id": "95185", "title": "Betriebspsychologie"}, {
                        "id": "98660",
                        "title": "Enterprise Architecture Management"
                    }, {
                        "id": "94782",
                        "title": "Informationsveranstaltung Thesis Wirtschaftsinformatik"
                    }, {"id": "95405", "title": "Recht"}]
                }, {
                    "id": "46",
                    "name": "WP1",
                    "courses": [{"id": "94789", "title": "Allgemeine und Biologische Psychologie"}, {
                        "id": "95021",
                        "title": "Buchführung und Bilanzierung"
                    }, {"id": "94361", "title": "Finanzmathematik"}, {
                        "id": "98734",
                        "title": "Grundlagen der Psychologie"
                    }, {
                        "id": "94097",
                        "title": "Informationsveranstaltung \"Auslandsaufenthalte während dem Studium\" für WP"
                    }, {"id": "94208", "title": "Infoveranstaltung SQ"}, {
                        "id": "95124",
                        "title": "Lean Production"
                    }, {"id": "93861", "title": "Logistikmanagement"}, {
                        "id": "94637",
                        "title": "Mensch und Organisation"
                    }, {"id": "94353", "title": "SPSS-Installation WP1"}, {
                        "id": "94659",
                        "title": "Statistik 1"
                    }, {"id": "94424", "title": "Statistik I Tutorium für WP1"}, {
                        "id": "94073",
                        "title": "Testung WP1"
                    }, {"id": "94414", "title": "Tutorium Finanzmathe"}, {
                        "id": "94660",
                        "title": "Volkswirtschaftslehre"
                    }, {"id": "94969", "title": "Wissenschaftliches Arbeiten"}]
                }, {
                    "id": "47",
                    "name": "WP2",
                    "courses": [{"id": "98996", "title": "Arbeitsrecht"}, {
                        "id": "94097",
                        "title": "Informationsveranstaltung \"Auslandsaufenthalte während dem Studium\" für WP"
                    }, {"id": "94145", "title": "Informationsveranstaltung Schwerpunktwahl WP2"}, {
                        "id": "94421",
                        "title": "Investition und Finanzierung"
                    }, {"id": "94415", "title": "KLR Tutorium Prof. Erben"}, {
                        "id": "94422",
                        "title": "Kosten- und Leistungsrechnung"
                    }, {"id": "95310", "title": "Lange Nacht der Statistik für WP2"}, {
                        "id": "94387",
                        "title": "Marketing und Vertrieb"
                    }, {"id": "99196", "title": "Personal und Organisation"}, {
                        "id": "94420",
                        "title": "Statistik 2"
                    }, {"id": "94423", "title": "Tutorium Statistik 2 - WP 2"}, {
                        "id": "94386",
                        "title": "Versuchsplanung"
                    }, {"id": "94805", "title": "Wirtschaftsrecht"}]
                }, {
                    "id": "48",
                    "name": "WP3",
                    "courses": [{"id": "94072", "title": "Bewerbertraining HAYS"}, {
                        "id": "94076",
                        "title": "Controlling"
                    }, {"id": "94224", "title": "Differentielle Psychologie"}, {
                        "id": "94419",
                        "title": "Empirische Forschung"
                    }, {"id": "94210", "title": "Informationen zum BPS"}, {
                        "id": "94097",
                        "title": "Informationsveranstaltung \"Auslandsaufenthalte während dem Studium\" für WP"
                    }, {"id": "94208", "title": "Infoveranstaltung SQ"}, {
                        "id": "95020",
                        "title": "Marktforschung Grundlagen"
                    }, {"id": "94077", "title": "Personalauswahl"}, {
                        "id": "94968",
                        "title": "Projektmanagement"
                    }, {"id": "95017", "title": "Psychologische Diagnostik"}, {
                        "id": "95018",
                        "title": "Sozialpsychologie"
                    }, {"id": "94786", "title": "Team- u. Organisationsentwicklung"}]
                }, {
                    "id": "49",
                    "name": "WP4",
                    "courses": [{"id": "94011", "title": "Arbeits- und Organisationspsychologie"}, {
                        "id": "94195",
                        "title": "Betriebswirtschaftlich orientiertes Consulting"
                    }, {"id": "94072", "title": "Bewerbertraining HAYS"}, {
                        "id": "105608",
                        "title": "BPS-Kolloquium"
                    }, {"id": "98760", "title": "Evaluation"}, {
                        "id": "94418",
                        "title": "Fragebogen-und Testkonstruktion"
                    }, {
                        "id": "94097",
                        "title": "Informationsveranstaltung \"Auslandsaufenthalte während dem Studium\" für WP"
                    }, {"id": "99197", "title": "Marktforschung Anwendung"}, {
                        "id": "95015",
                        "title": "Personalentwicklung"
                    }, {"id": "93939", "title": "WIP Prof. Roland Erben"}, {
                        "id": "95016",
                        "title": "Wirtschaftspsychologisches Projekt"
                    }]
                }, {
                    "id": "166",
                    "name": "WP6",
                    "courses": [{"id": "94162", "title": "Kolloquium"}, {
                        "id": "97777",
                        "title": "Leistungsmanagement"
                    }, {"id": "93812", "title": "Markt- u. Konsumentenpsychologie"}, {
                        "id": "95009",
                        "title": "Psychologisches Consulting"
                    }, {"id": "95010", "title": "Unternehmensführung"}]
                }, {
                    "id": "184",
                    "name": "WPM1",
                    "courses": [{"id": "94072", "title": "Bewerbertraining HAYS"}, {
                        "id": "95378",
                        "title": "Eröffnungsfeier Master-Studiengänge"
                    }, {"id": "99597", "title": "Infoveranstaltung Qualitätsmanagement"}, {
                        "id": "98762",
                        "title": "Internationales Projektmanagement"
                    }, {"id": "98764", "title": "Markt- und Kundenverständnis"}, {
                        "id": "98763",
                        "title": "Psychologische Beratungskonzepte & Interventionen"
                    }, {"id": "98843", "title": "Quantitative Datenerhebung & -analyseverfahren"}, {
                        "id": "98975",
                        "title": "SPSS-Installation WPM"
                    }, {"id": "99178", "title": "SQ \"Business Coaching\""}, {
                        "id": "95598",
                        "title": "SQ \"Gesprächsdynamiken erkenne und steuern\""
                    }, {"id": "95632", "title": "Strategisches HRM & Führung"}, {
                        "id": "99432",
                        "title": "Tutorium Quantitative Datenerhebung & -analyseverfahren"
                    }, {"id": "95633", "title": "Unternehmensbewertung & Finanzmodelle"}, {
                        "id": "98761",
                        "title": "Wirtschaftsethik"
                    }, {"id": "98839", "title": "Wirtschaftspsychologischer Literaturkurs"}]
                }, {
                    "id": "185",
                    "name": "WPM2",
                    "courses": [{"id": "94072", "title": "Bewerbertraining HAYS"}, {
                        "id": "95595",
                        "title": "PSP-Kolloquium (Wirtschaftspsychologisches Forschungsprojekt)"
                    }]
                }, {
                    "id": "186",
                    "name": "WPM3",
                    "courses": [{"id": "94072", "title": "Bewerbertraining HAYS"}, {
                        "id": "94039",
                        "title": "Wirtschaftspsychologisches Forschungsprojekt"
                    }]
                }],
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../colors";

    .subjects {
        border-width: 1px 0;
        border-style: solid;
        border-color: $border;
        background-color: #FFF;

        .item {
            padding: 8px 6px;

            &.active {
                .courses {
                    display: block;
                }

                .header .arrow {
                }
            }

            & + .item {
                border-top: 1px solid #F1F2F3;
            }
        }

        .checkbox {
            display: flex;
            align-items: center;

            &::before {
                font-size: 20px;
                flex-shrink: 0;
            }
        }

        .header {
            display: flex;

            label {
                padding: 8px 0;
            }

            span.name {
                font-weight: 500;
            }

            span.amount {
                font-weight: 300;
                color: $secondary;
                padding-left: 6px;
            }

            .arrow {
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: $icon;
                font-size: 26px;

            }
        }

        .courses {
            display: none;
            padding-left: 34px;

            label {
                display: block;
                padding: 8px 0;
            }
        }

    }

</style>
