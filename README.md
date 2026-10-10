# Kerner bioClean

Statische Website für GitHub Pages. Das bestehende Design und die Reihenfolge der Abschnitte bleiben erhalten.

## Änderungen vom 10. Oktober 2026

- Canonical-, Open-Graph- und Twitter-Metadaten sowie LocalBusiness-JSON-LD mit bereits veröffentlichten Unternehmensdaten.
- Sitemap enthält nur die indexierbare Startseite; die vorhandenen Rechtsseiten bleiben auf `noindex`. Alte Verzeichnisadressen führen auf die `.html`-Seiten.
- Vorhandene Bilder als kleinere WebP-Dateien mit festen Abmessungen. Hintergrundbild und zwei vorhandene lokale Schriften werden früh geladen. Identische Schriftdateien werden unter einer gemeinsamen URL verwendet.
- Alle Inhalte sind auch ohne JavaScript sichtbar. Das mobile Menü unterstützt Tab und Escape; verborgene Links sind nicht fokussierbar.
- Native Datumsauswahl mit Mindestdatum, verständliche Fehlermeldung bei fehlender Kontaktmöglichkeit, Autovervollständigung und Schutz vor versehentlichem Doppelversand.
- Formular leitet nach erfolgreicher Verarbeitung durch FormSubmit auf `danke.html` zurück. Empfänger und Dienst bleiben unverändert.
- Kurze Konkretisierung vorhandener Leistungstexte, Standort Seekirchen sichtbarer und Hinweise zur individuellen Angebotskalkulation. Keine FAQs, neuen Arbeitsfotos oder neuen Abschnitte.

## CSS und JavaScript bearbeiten

`style.css` und `script.js` sind die lesbaren Quelldateien. Nach Änderungen mit Python 3 aus dem Repository ausführen:

```sh
python tools/build.py
```

Die HTML-Seiten laden die eingecheckten `style.min.css` und `script.min.js`. Bei Änderungen auch die Versionsnummer in den HTML-Verweisen erhöhen. Die JavaScript-Komprimierung ist bewusst konservativ: Kommentare und Einrückungen werden entfernt, Zeilenumbrüche und Token-Abstände bleiben erhalten.

## Prüfung

Lokal geprüft: Desktop- und Smartphone-Darstellung, Menü mit Tab/Escape, fehlende Kontaktangaben, native Datumseingabe, Danke-Seite, sichtbare Inhalte ohne JavaScript, JSON-LD, interne Dateien und Bildabmessungen sowie JavaScript-Syntax. Keine echte Anfrage versendet. Kein neuer Lighthouse-Score gemessen.

## Angaben, die die Betreiberin bestätigen muss

- Ist die bestehende Formular-Empfängeradresse weiterhin beabsichtigt und bei FormSubmit aktiviert?
- Tatsächliche Produkte/Zertifizierungen, Anfahrtskosten, Mindestbuchungsdauer und weitere Einsatzorte.
- Verifizierte Google-Profiladresse sowie freigegebene Bewertungsdaten; keine externen Bewertungen oder Daten ergänzt.
- Gewerbeberechtigung für Spezialleistungen und konkrete GISA-Zahl; keine rechtlichen Unternehmensangaben erfunden oder Berechtigungen zugesichert.

Pauschale Audit-Warnungen wie fehlende Meta-Keywords, fehlende separate mobile URL, fehlende KI-/Commerce-Schnittstellen, starre Überschriftenlimits oder fehlende reale Nutzerdaten sind keine Gründe, diese Website umzubauen. Cache-Header werden vom GitHub-Pages-Hosting vorgegeben.
