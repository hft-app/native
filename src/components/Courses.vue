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
              <div v-for="subject in subjects" :key="subject.name" class="item">
                <div class="header">
                  <label>
                    <div class="icon icon-fw icon-prepend checkbox">
                      <input type="checkbox" :indeterminate="true">
                      <span class="name">{{ subject.name }}</span>
                      <span class="amount">({{ subject.courses.length }})</span>
                    </div>
                  </label>
                  <a class="arrow icon" @click="log(subject.active = !subject.active)">
                    <fa-icon icon="chevron-down" />
                  </a>
                </div>
                <div :class="'courses ' + (subject.active ? 'active':'')">
                  <label v-for="course in subject.courses" :key="course.title">
                    <input type="checkbox" value="on">
                    <span class="icon icon-fw icon-prepend checkbox">
                      {{ course.title }}
                    </span>
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
          <p>
            © <a href="http://www.hft-stuttgart.de/" target="_blank">
              Hochschule für Technik Stuttgart</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selected: '',
        subjects: [{
          'id': '14',
          'name': 'AB1A',
          'courses': [{'id': '94605', 'title': 'GB - Grundlagen Baukonstruktion'}, {
            'id': '94621',
            'title': 'GD1 - Darstellende Geometrie'
          }, {'id': '99326', 'title': 'GD1 - Freihandzeichnen 1'}, {
            'id': '94617',
            'title': 'GD1 - Technisches Zeichnen'
          }, {'id': '94623', 'title': 'GE1 - Baugeschichte Überblick'}, {
            'id': '99324',
            'title': 'GE1 - Entwerfen 1'
          }, {'id': '99325', 'title': 'GE1 - Gebäudelehre 1'}, {
            'id': '94622',
            'title': 'GT - Bauphysik'
          }, {'id': '94620', 'title': 'GT - Gebäudetechnik'}, {
            'id': '94801',
            'title': 'GT - Materialkunde'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94540',
            'title': 'SPO2Go - Studienberatung'
          }, {'id': '99041', 'title': 'Tutorium Baukonstruktion und Entwerfen AB1'}, {
            'id': '99490',
            'title': 'WF - Grafik und Layout'
          }]
        }, {
          'id': '15',
          'name': 'AB1B',
          'courses': [{'id': '94605', 'title': 'GB - Grundlagen Baukonstruktion'}, {
            'id': '94621',
            'title': 'GD1 - Darstellende Geometrie'
          }, {'id': '99326', 'title': 'GD1 - Freihandzeichnen 1'}, {
            'id': '94617',
            'title': 'GD1 - Technisches Zeichnen'
          }, {'id': '94623', 'title': 'GE1 - Baugeschichte Überblick'}, {
            'id': '99324',
            'title': 'GE1 - Entwerfen 1'
          }, {'id': '99325', 'title': 'GE1 - Gebäudelehre 1'}, {
            'id': '94622',
            'title': 'GT - Bauphysik'
          }, {'id': '94620', 'title': 'GT - Gebäudetechnik'}, {
            'id': '94801',
            'title': 'GT - Materialkunde'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94540',
            'title': 'SPO2Go - Studienberatung'
          }, {'id': '99041', 'title': 'Tutorium Baukonstruktion und Entwerfen AB1'}]
        }, {
          'id': '16',
          'name': 'AB1C',
          'courses': [{'id': '94605', 'title': 'GB - Grundlagen Baukonstruktion'}, {
            'id': '94621',
            'title': 'GD1 - Darstellende Geometrie'
          }, {'id': '99326', 'title': 'GD1 - Freihandzeichnen 1'}, {
            'id': '94617',
            'title': 'GD1 - Technisches Zeichnen'
          }, {'id': '94623', 'title': 'GE1 - Baugeschichte Überblick'}, {
            'id': '99324',
            'title': 'GE1 - Entwerfen 1'
          }, {'id': '99325', 'title': 'GE1 - Gebäudelehre 1'}, {
            'id': '94622',
            'title': 'GT - Bauphysik'
          }, {'id': '94620', 'title': 'GT - Gebäudetechnik'}, {
            'id': '94801',
            'title': 'GT - Materialkunde'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94540',
            'title': 'SPO2Go - Studienberatung'
          }, {'id': '99041', 'title': 'Tutorium Baukonstruktion und Entwerfen AB1'}]
        }, {
          'id': '17',
          'name': 'AB2A',
          'courses': [{'id': '94607', 'title': 'BI1 - Baukonstruktion 2'}, {
            'id': '94979',
            'title': 'GD2 - CAAD'
          }, {'id': '99325', 'title': 'GE1 - Gebäudelehre 1'}, {
            'id': '94614',
            'title': 'GE2 - Baugeschichte 2'
          }, {'id': '94616', 'title': 'GE2 - Entwerfen 1'}, {
            'id': '94794',
            'title': 'GE2 - Gebäudelehre 1'
          }, {'id': '94608', 'title': 'Integrierte Übung AB 2 (BKE2, TWL2, MBP2, GET2)'}, {
            'id': '94105',
            'title': 'Pecha-Kucha Erasmus Architektur'
          }, {'id': '94792', 'title': 'SB1 - Städtebau 1'}, {
            'id': '94613',
            'title': 'TI1 - Gebäudetechnik 2'
          }, {'id': '95149', 'title': 'TI1 - Materialkunde + Bauphysik 2'}, {
            'id': '94802',
            'title': 'TI1 - Tragwerkslehre 2'
          }]
        }, {
          'id': '18',
          'name': 'AB2B',
          'courses': [{'id': '94607', 'title': 'BI1 - Baukonstruktion 2'}, {
            'id': '94979',
            'title': 'GD2 - CAAD'
          }, {'id': '99325', 'title': 'GE1 - Gebäudelehre 1'}, {
            'id': '94614',
            'title': 'GE2 - Baugeschichte 2'
          }, {'id': '94616', 'title': 'GE2 - Entwerfen 1'}, {
            'id': '94794',
            'title': 'GE2 - Gebäudelehre 1'
          }, {'id': '94608', 'title': 'Integrierte Übung AB 2 (BKE2, TWL2, MBP2, GET2)'}, {
            'id': '94105',
            'title': 'Pecha-Kucha Erasmus Architektur'
          }, {'id': '94792', 'title': 'SB1 - Städtebau 1'}, {
            'id': '94613',
            'title': 'TI1 - Gebäudetechnik 2'
          }, {'id': '95149', 'title': 'TI1 - Materialkunde + Bauphysik 2'}, {
            'id': '94802',
            'title': 'TI1 - Tragwerkslehre 2'
          }]
        }, {
          'id': '19',
          'name': 'AB2C',
          'courses': [{'id': '94607', 'title': 'BI1 - Baukonstruktion 2'}, {
            'id': '94979',
            'title': 'GD2 - CAAD'
          }, {'id': '99325', 'title': 'GE1 - Gebäudelehre 1'}, {
            'id': '94614',
            'title': 'GE2 - Baugeschichte 2'
          }, {'id': '94616', 'title': 'GE2 - Entwerfen 1'}, {
            'id': '94794',
            'title': 'GE2 - Gebäudelehre 1'
          }, {'id': '94608', 'title': 'Integrierte Übung AB 2 (BKE2, TWL2, MBP2, GET2)'}, {
            'id': '94105',
            'title': 'Pecha-Kucha Erasmus Architektur'
          }, {'id': '94792', 'title': 'SB1 - Städtebau 1'}, {
            'id': '94613',
            'title': 'TI1 - Gebäudetechnik 2'
          }, {'id': '95149', 'title': 'TI1 - Materialkunde + Bauphysik 2'}, {
            'id': '94802',
            'title': 'TI1 - Tragwerkslehre 2'
          }]
        }, {
          'id': '20',
          'name': 'AB3A',
          'courses': [{'id': '96996', 'title': 'BI2 - Baukonstruktion 3'}, {
            'id': '94606',
            'title': 'GE3 - Baugeschichte 3'
          }, {'id': '94609', 'title': 'GE3 - Entwerfen 2'}, {
            'id': '94453',
            'title': 'GE3 - Gebäudelehre 2'
          }, {'id': '99033', 'title': 'Infoveranstaltung BPS'}, {
            'id': '93895',
            'title': 'Integrierte Übung AB 3 (BKE3, TWL3)'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94303',
            'title': 'SB2 - Städtebau 2'
          }, {'id': '94525', 'title': 'TI2 - Klimagerechtes Bauen'}, {
            'id': '94222',
            'title': 'TI2 - Tragwerkslehre 3'
          }, {'id': '99530', 'title': 'WF - Angewandte Psychologie'}, {
            'id': '99364',
            'title': 'WF - Architecture and Place'
          }, {'id': '99328', 'title': 'WF - Architekturfotografie'}, {
            'id': '99342',
            'title': 'WF - Architekturkritik (Architekturqualität)'
          }, {'id': '99334', 'title': 'WF - Architekturmodell, Grafik und Präsentation'}, {
            'id': '99332',
            'title': 'WF - BIM+'
          }, {'id': '99513', 'title': 'WF - BWL - Basiswissen Büchführung'}, {
            'id': '99337',
            'title': 'WF - Einführung Projektmanagement'
          }, {'id': '99335', 'title': 'WF - Fassadenkonstruktionen'}, {
            'id': '99594',
            'title': 'WF - Fotographie und Videographie als methodische Analyseinstrumente'
          }, {'id': '99330', 'title': 'WF - Freihandzeichnen'}, {
            'id': '99329',
            'title': 'WF - Freiraum- und Grünplanung'
          }, {'id': '99490', 'title': 'WF - Grafik und Layout'}, {
            'id': '99340',
            'title': 'WF - Honorarrecht'
          }, {'id': '99491', 'title': 'WF - Kommunikationsfeld Raum'}, {
            'id': '99534',
            'title': 'WF - Kommunikationsmethoden'
          }, {'id': '99524', 'title': 'WF - Kulturgeschichte und Zeitgeist'}, {
            'id': '99343',
            'title': 'WF - Kunstgeschichte'
          }, {'id': '99493', 'title': 'WF - Lichtplanung'}, {
            'id': '99494',
            'title': 'WF - Lichtworkshop'
          }, {'id': '99336', 'title': 'WF - Nachhaltiges und kreislaufgerechtes Bauen'}, {
            'id': '99333',
            'title': 'WF - Parametrischer Modellbau Architektur'
          }, {'id': '99338', 'title': 'WF - Projektentwicklung'}, {
            'id': '99496',
            'title': 'WF - Städtebau im Bestand'
          }, {'id': '99331', 'title': 'WF - Stegreifentwurf 1'}, {
            'id': '99662',
            'title': 'WF - Studentenwettbewerb Lörrach'
          }, {'id': '99506', 'title': 'WF - Technische Infrastruktur'}, {
            'id': '99341',
            'title': 'WF - Terminplanung'
          }, {'id': '99499', 'title': 'WF - Vertiefung Städtebau'}, {
            'id': '99339',
            'title': 'WF - Vertragsrecht'
          }]
        }, {
          'id': '21',
          'name': 'AB3B',
          'courses': [{'id': '96996', 'title': 'BI2 - Baukonstruktion 3'}, {
            'id': '94606',
            'title': 'GE3 - Baugeschichte 3'
          }, {'id': '94609', 'title': 'GE3 - Entwerfen 2'}, {
            'id': '94453',
            'title': 'GE3 - Gebäudelehre 2'
          }, {'id': '99033', 'title': 'Infoveranstaltung BPS'}, {
            'id': '93895',
            'title': 'Integrierte Übung AB 3 (BKE3, TWL3)'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94303',
            'title': 'SB2 - Städtebau 2'
          }, {'id': '94525', 'title': 'TI2 - Klimagerechtes Bauen'}, {
            'id': '94222',
            'title': 'TI2 - Tragwerkslehre 3'
          }, {'id': '99530', 'title': 'WF - Angewandte Psychologie'}, {
            'id': '99364',
            'title': 'WF - Architecture and Place'
          }, {'id': '99328', 'title': 'WF - Architekturfotografie'}, {
            'id': '99342',
            'title': 'WF - Architekturkritik (Architekturqualität)'
          }, {'id': '99334', 'title': 'WF - Architekturmodell, Grafik und Präsentation'}, {
            'id': '99332',
            'title': 'WF - BIM+'
          }, {'id': '99513', 'title': 'WF - BWL - Basiswissen Büchführung'}, {
            'id': '99337',
            'title': 'WF - Einführung Projektmanagement'
          }, {'id': '99335', 'title': 'WF - Fassadenkonstruktionen'}, {
            'id': '99594',
            'title': 'WF - Fotographie und Videographie als methodische Analyseinstrumente'
          }, {'id': '99330', 'title': 'WF - Freihandzeichnen'}, {
            'id': '99329',
            'title': 'WF - Freiraum- und Grünplanung'
          }, {'id': '99490', 'title': 'WF - Grafik und Layout'}, {
            'id': '99340',
            'title': 'WF - Honorarrecht'
          }, {'id': '99491', 'title': 'WF - Kommunikationsfeld Raum'}, {
            'id': '99534',
            'title': 'WF - Kommunikationsmethoden'
          }, {'id': '99524', 'title': 'WF - Kulturgeschichte und Zeitgeist'}, {
            'id': '99343',
            'title': 'WF - Kunstgeschichte'
          }, {'id': '99493', 'title': 'WF - Lichtplanung'}, {
            'id': '99494',
            'title': 'WF - Lichtworkshop'
          }, {'id': '99336', 'title': 'WF - Nachhaltiges und kreislaufgerechtes Bauen'}, {
            'id': '99333',
            'title': 'WF - Parametrischer Modellbau Architektur'
          }, {'id': '99338', 'title': 'WF - Projektentwicklung'}, {
            'id': '99496',
            'title': 'WF - Städtebau im Bestand'
          }, {'id': '99331', 'title': 'WF - Stegreifentwurf 1'}, {
            'id': '99662',
            'title': 'WF - Studentenwettbewerb Lörrach'
          }, {'id': '99506', 'title': 'WF - Technische Infrastruktur'}, {
            'id': '99341',
            'title': 'WF - Terminplanung'
          }, {'id': '99499', 'title': 'WF - Vertiefung Städtebau'}, {
            'id': '99339',
            'title': 'WF - Vertragsrecht'
          }]
        }, {
          'id': '22',
          'name': 'AB3C',
          'courses': [{'id': '96996', 'title': 'BI2 - Baukonstruktion 3'}, {
            'id': '94606',
            'title': 'GE3 - Baugeschichte 3'
          }, {'id': '94609', 'title': 'GE3 - Entwerfen 2'}, {
            'id': '94453',
            'title': 'GE3 - Gebäudelehre 2'
          }, {'id': '99033', 'title': 'Infoveranstaltung BPS'}, {
            'id': '93895',
            'title': 'Integrierte Übung AB 3 (BKE3, TWL3)'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94303',
            'title': 'SB2 - Städtebau 2'
          }, {'id': '94525', 'title': 'TI2 - Klimagerechtes Bauen'}, {
            'id': '94222',
            'title': 'TI2 - Tragwerkslehre 3'
          }, {'id': '99530', 'title': 'WF - Angewandte Psychologie'}, {
            'id': '99364',
            'title': 'WF - Architecture and Place'
          }, {'id': '99328', 'title': 'WF - Architekturfotografie'}, {
            'id': '99342',
            'title': 'WF - Architekturkritik (Architekturqualität)'
          }, {'id': '99334', 'title': 'WF - Architekturmodell, Grafik und Präsentation'}, {
            'id': '99332',
            'title': 'WF - BIM+'
          }, {'id': '99513', 'title': 'WF - BWL - Basiswissen Büchführung'}, {
            'id': '99337',
            'title': 'WF - Einführung Projektmanagement'
          }, {'id': '99335', 'title': 'WF - Fassadenkonstruktionen'}, {
            'id': '99594',
            'title': 'WF - Fotographie und Videographie als methodische Analyseinstrumente'
          }, {'id': '99330', 'title': 'WF - Freihandzeichnen'}, {
            'id': '99329',
            'title': 'WF - Freiraum- und Grünplanung'
          }, {'id': '99490', 'title': 'WF - Grafik und Layout'}, {
            'id': '99340',
            'title': 'WF - Honorarrecht'
          }, {'id': '99491', 'title': 'WF - Kommunikationsfeld Raum'}, {
            'id': '99534',
            'title': 'WF - Kommunikationsmethoden'
          }, {'id': '99524', 'title': 'WF - Kulturgeschichte und Zeitgeist'}, {
            'id': '99343',
            'title': 'WF - Kunstgeschichte'
          }, {'id': '99493', 'title': 'WF - Lichtplanung'}, {
            'id': '99494',
            'title': 'WF - Lichtworkshop'
          }, {'id': '99336', 'title': 'WF - Nachhaltiges und kreislaufgerechtes Bauen'}, {
            'id': '99333',
            'title': 'WF - Parametrischer Modellbau Architektur'
          }, {'id': '99338', 'title': 'WF - Projektentwicklung'}, {
            'id': '99496',
            'title': 'WF - Städtebau im Bestand'
          }, {'id': '99331', 'title': 'WF - Stegreifentwurf 1'}, {
            'id': '99662',
            'title': 'WF - Studentenwettbewerb Lörrach'
          }, {'id': '99506', 'title': 'WF - Technische Infrastruktur'}, {
            'id': '99341',
            'title': 'WF - Terminplanung'
          }, {'id': '99499', 'title': 'WF - Vertiefung Städtebau'}, {
            'id': '99339',
            'title': 'WF - Vertragsrecht'
          }]
        }, {
          'id': '23',
          'name': 'AB4A',
          'courses': [{'id': '94317', 'title': 'BI3 - Baukonstruktion 4'}, {
            'id': '94595',
            'title': 'GD3 - Freihandzeichnen'
          }, {'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94600',
            'title': 'GO1 - Bauorganisation 1'
          }, {'id': '94602', 'title': 'GR1 - Bauleitplanung'}, {
            'id': '94599',
            'title': 'GR1 - Planungs- + Bauordnungsrecht 1'
          }, {'id': '94596', 'title': 'GR2 - Planungs- + Bauordnungsrecht 2'}, {
            'id': '94594',
            'title': 'GR2 - Vorbeugender Brandschutz'
          }, {'id': '99033', 'title': 'Infoveranstaltung BPS'}, {
            'id': '95489',
            'title': 'Integrierte Übung AB 4 (BKE4, TWL4,SWZ, GET3)'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94603',
            'title': 'TI3 - Gebäudetechnik 3'
          }, {'id': '94604', 'title': 'TI3 - Simulationswerkzeuge'}, {
            'id': '94316',
            'title': 'TI3 - Tragwerkslehre 4'
          }, {'id': '99530', 'title': 'WF - Angewandte Psychologie'}, {
            'id': '99364',
            'title': 'WF - Architecture and Place'
          }, {'id': '99328', 'title': 'WF - Architekturfotografie'}, {
            'id': '99342',
            'title': 'WF - Architekturkritik (Architekturqualität)'
          }, {'id': '99334', 'title': 'WF - Architekturmodell, Grafik und Präsentation'}, {
            'id': '99332',
            'title': 'WF - BIM+'
          }, {'id': '99513', 'title': 'WF - BWL - Basiswissen Büchführung'}, {
            'id': '99337',
            'title': 'WF - Einführung Projektmanagement'
          }, {'id': '99335', 'title': 'WF - Fassadenkonstruktionen'}, {
            'id': '99594',
            'title': 'WF - Fotographie und Videographie als methodische Analyseinstrumente'
          }, {'id': '99330', 'title': 'WF - Freihandzeichnen'}, {
            'id': '99329',
            'title': 'WF - Freiraum- und Grünplanung'
          }, {'id': '99490', 'title': 'WF - Grafik und Layout'}, {
            'id': '99340',
            'title': 'WF - Honorarrecht'
          }, {'id': '99491', 'title': 'WF - Kommunikationsfeld Raum'}, {
            'id': '99534',
            'title': 'WF - Kommunikationsmethoden'
          }, {'id': '99524', 'title': 'WF - Kulturgeschichte und Zeitgeist'}, {
            'id': '99343',
            'title': 'WF - Kunstgeschichte'
          }, {'id': '99493', 'title': 'WF - Lichtplanung'}, {
            'id': '99494',
            'title': 'WF - Lichtworkshop'
          }, {'id': '99336', 'title': 'WF - Nachhaltiges und kreislaufgerechtes Bauen'}, {
            'id': '99333',
            'title': 'WF - Parametrischer Modellbau Architektur'
          }, {'id': '99338', 'title': 'WF - Projektentwicklung'}, {
            'id': '99496',
            'title': 'WF - Städtebau im Bestand'
          }, {'id': '99331', 'title': 'WF - Stegreifentwurf 1'}, {
            'id': '99662',
            'title': 'WF - Studentenwettbewerb Lörrach'
          }, {'id': '99506', 'title': 'WF - Technische Infrastruktur'}, {
            'id': '99341',
            'title': 'WF - Terminplanung'
          }, {'id': '99499', 'title': 'WF - Vertiefung Städtebau'}, {
            'id': '99339',
            'title': 'WF - Vertragsrecht'
          }]
        }, {
          'id': '24',
          'name': 'AB4B',
          'courses': [{'id': '94317', 'title': 'BI3 - Baukonstruktion 4'}, {
            'id': '94595',
            'title': 'GD3 - Freihandzeichnen'
          }, {'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94600',
            'title': 'GO1 - Bauorganisation 1'
          }, {'id': '94602', 'title': 'GR1 - Bauleitplanung'}, {
            'id': '94599',
            'title': 'GR1 - Planungs- + Bauordnungsrecht 1'
          }, {'id': '94596', 'title': 'GR2 - Planungs- + Bauordnungsrecht 2'}, {
            'id': '94594',
            'title': 'GR2 - Vorbeugender Brandschutz'
          }, {'id': '99033', 'title': 'Infoveranstaltung BPS'}, {
            'id': '95489',
            'title': 'Integrierte Übung AB 4 (BKE4, TWL4,SWZ, GET3)'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94603',
            'title': 'TI3 - Gebäudetechnik 3'
          }, {'id': '94604', 'title': 'TI3 - Simulationswerkzeuge'}, {
            'id': '94316',
            'title': 'TI3 - Tragwerkslehre 4'
          }, {'id': '99530', 'title': 'WF - Angewandte Psychologie'}, {
            'id': '99364',
            'title': 'WF - Architecture and Place'
          }, {'id': '99328', 'title': 'WF - Architekturfotografie'}, {
            'id': '99342',
            'title': 'WF - Architekturkritik (Architekturqualität)'
          }, {'id': '99334', 'title': 'WF - Architekturmodell, Grafik und Präsentation'}, {
            'id': '99332',
            'title': 'WF - BIM+'
          }, {'id': '99513', 'title': 'WF - BWL - Basiswissen Büchführung'}, {
            'id': '99337',
            'title': 'WF - Einführung Projektmanagement'
          }, {'id': '99335', 'title': 'WF - Fassadenkonstruktionen'}, {
            'id': '99594',
            'title': 'WF - Fotographie und Videographie als methodische Analyseinstrumente'
          }, {'id': '99330', 'title': 'WF - Freihandzeichnen'}, {
            'id': '99329',
            'title': 'WF - Freiraum- und Grünplanung'
          }, {'id': '99490', 'title': 'WF - Grafik und Layout'}, {
            'id': '99340',
            'title': 'WF - Honorarrecht'
          }, {'id': '99491', 'title': 'WF - Kommunikationsfeld Raum'}, {
            'id': '99534',
            'title': 'WF - Kommunikationsmethoden'
          }, {'id': '99524', 'title': 'WF - Kulturgeschichte und Zeitgeist'}, {
            'id': '99343',
            'title': 'WF - Kunstgeschichte'
          }, {'id': '99493', 'title': 'WF - Lichtplanung'}, {
            'id': '99494',
            'title': 'WF - Lichtworkshop'
          }, {'id': '99336', 'title': 'WF - Nachhaltiges und kreislaufgerechtes Bauen'}, {
            'id': '99333',
            'title': 'WF - Parametrischer Modellbau Architektur'
          }, {'id': '99338', 'title': 'WF - Projektentwicklung'}, {
            'id': '99496',
            'title': 'WF - Städtebau im Bestand'
          }, {'id': '99331', 'title': 'WF - Stegreifentwurf 1'}, {
            'id': '99662',
            'title': 'WF - Studentenwettbewerb Lörrach'
          }, {'id': '99506', 'title': 'WF - Technische Infrastruktur'}, {
            'id': '99341',
            'title': 'WF - Terminplanung'
          }, {'id': '99499', 'title': 'WF - Vertiefung Städtebau'}, {
            'id': '99339',
            'title': 'WF - Vertragsrecht'
          }]
        }, {
          'id': '25',
          'name': 'AB4C',
          'courses': [{'id': '94317', 'title': 'BI3 - Baukonstruktion 4'}, {
            'id': '94595',
            'title': 'GD3 - Freihandzeichnen'
          }, {'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94600',
            'title': 'GO1 - Bauorganisation 1'
          }, {'id': '94602', 'title': 'GR1 - Bauleitplanung'}, {
            'id': '94599',
            'title': 'GR1 - Planungs- + Bauordnungsrecht 1'
          }, {'id': '94596', 'title': 'GR2 - Planungs- + Bauordnungsrecht 2'}, {
            'id': '94594',
            'title': 'GR2 - Vorbeugender Brandschutz'
          }, {'id': '99033', 'title': 'Infoveranstaltung BPS'}, {
            'id': '95489',
            'title': 'Integrierte Übung AB 4 (BKE4, TWL4,SWZ, GET3)'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}, {
            'id': '94603',
            'title': 'TI3 - Gebäudetechnik 3'
          }, {'id': '94604', 'title': 'TI3 - Simulationswerkzeuge'}, {
            'id': '94316',
            'title': 'TI3 - Tragwerkslehre 4'
          }, {'id': '99530', 'title': 'WF - Angewandte Psychologie'}, {
            'id': '99364',
            'title': 'WF - Architecture and Place'
          }, {'id': '99328', 'title': 'WF - Architekturfotografie'}, {
            'id': '99342',
            'title': 'WF - Architekturkritik (Architekturqualität)'
          }, {'id': '99334', 'title': 'WF - Architekturmodell, Grafik und Präsentation'}, {
            'id': '99332',
            'title': 'WF - BIM+'
          }, {'id': '99513', 'title': 'WF - BWL - Basiswissen Büchführung'}, {
            'id': '99337',
            'title': 'WF - Einführung Projektmanagement'
          }, {'id': '99335', 'title': 'WF - Fassadenkonstruktionen'}, {
            'id': '99594',
            'title': 'WF - Fotographie und Videographie als methodische Analyseinstrumente'
          }, {'id': '99330', 'title': 'WF - Freihandzeichnen'}, {
            'id': '99329',
            'title': 'WF - Freiraum- und Grünplanung'
          }, {'id': '99490', 'title': 'WF - Grafik und Layout'}, {
            'id': '99340',
            'title': 'WF - Honorarrecht'
          }, {'id': '99491', 'title': 'WF - Kommunikationsfeld Raum'}, {
            'id': '99534',
            'title': 'WF - Kommunikationsmethoden'
          }, {'id': '99524', 'title': 'WF - Kulturgeschichte und Zeitgeist'}, {
            'id': '99343',
            'title': 'WF - Kunstgeschichte'
          }, {'id': '99493', 'title': 'WF - Lichtplanung'}, {
            'id': '99494',
            'title': 'WF - Lichtworkshop'
          }, {'id': '99336', 'title': 'WF - Nachhaltiges und kreislaufgerechtes Bauen'}, {
            'id': '99333',
            'title': 'WF - Parametrischer Modellbau Architektur'
          }, {'id': '99338', 'title': 'WF - Projektentwicklung'}, {
            'id': '99496',
            'title': 'WF - Städtebau im Bestand'
          }, {'id': '99331', 'title': 'WF - Stegreifentwurf 1'}, {
            'id': '99662',
            'title': 'WF - Studentenwettbewerb Lörrach'
          }, {'id': '99506', 'title': 'WF - Technische Infrastruktur'}, {
            'id': '99341',
            'title': 'WF - Terminplanung'
          }, {'id': '99499', 'title': 'WF - Vertiefung Städtebau'}, {
            'id': '99339',
            'title': 'WF - Vertragsrecht'
          }]
        }, {
          'id': '26',
          'name': 'AB5A',
          'courses': [{'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94105',
            'title': 'Pecha-Kucha Erasmus Architektur'
          }]
        }, {
          'id': '27',
          'name': 'AB5B',
          'courses': [{'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94105',
            'title': 'Pecha-Kucha Erasmus Architektur'
          }]
        }, {
          'id': '28',
          'name': 'AB5C',
          'courses': [{'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94105',
            'title': 'Pecha-Kucha Erasmus Architektur'
          }]
        }, {
          'id': '29',
          'name': 'AB6A',
          'courses': [{'id': '94270', 'title': 'BA - Arbeit'}, {
            'id': '94588',
            'title': 'BE4 - Baugeschichte 4'
          }, {'id': '94591', 'title': 'GE4 - Entwerfen 3'}, {
            'id': '94452',
            'title': 'GE4 - Gebäudelehre 3'
          }, {'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94592',
            'title': 'GO2 - Bauorganisation 2'
          }, {'id': '94593', 'title': 'GTH - Ringvorlesung Bestand'}, {
            'id': '94945',
            'title': 'GTH - Wohnungsbau Theorie'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}]
        }, {
          'id': '30',
          'name': 'AB6B',
          'courses': [{'id': '94270', 'title': 'BA - Arbeit'}, {
            'id': '94588',
            'title': 'BE4 - Baugeschichte 4'
          }, {'id': '94591', 'title': 'GE4 - Entwerfen 3'}, {
            'id': '94452',
            'title': 'GE4 - Gebäudelehre 3'
          }, {'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94592',
            'title': 'GO2 - Bauorganisation 2'
          }, {'id': '94593', 'title': 'GTH - Ringvorlesung Bestand'}, {
            'id': '94945',
            'title': 'GTH - Wohnungsbau Theorie'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}]
        }, {
          'id': '31',
          'name': 'AB6C',
          'courses': [{'id': '94270', 'title': 'BA - Arbeit'}, {
            'id': '94588',
            'title': 'BE4 - Baugeschichte 4'
          }, {'id': '94591', 'title': 'GE4 - Entwerfen 3'}, {
            'id': '94452',
            'title': 'GE4 - Gebäudelehre 3'
          }, {'id': '94078', 'title': 'Gebäudelehre 2 + 3 Sondertermin'}, {
            'id': '94592',
            'title': 'GO2 - Bauorganisation 2'
          }, {'id': '94593', 'title': 'GTH - Ringvorlesung Bestand'}, {
            'id': '94945',
            'title': 'GTH - Wohnungsbau Theorie'
          }, {'id': '94105', 'title': 'Pecha-Kucha Erasmus Architektur'}]
        }],
      }
    },
    methods: {
      log: console.log
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
