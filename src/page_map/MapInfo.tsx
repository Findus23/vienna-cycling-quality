import {useState} from "react";
import {default as dataTiles2024}  from "../assets/2024-04-15.pmtiles";
import {default as dataTiles202503}  from "../assets/2025-03-11.pmtiles";
import {default as dataTiles2025}  from "../assets/2025-07-23.pmtiles";
import {default as dataTiles2025json}  from "../assets/2025-07-23.json?url";

export const MapInfo = () => {
    // const clickedMapData = useStore($clickedMapData)
    //
    // if (!clickedMapData || !clickedMapData.length) return null
    const [displayed, setDisplayed] = useState(true);
    return (
        <div id="overlay" style={{
            top: 0,
            bottom: 0,
            width: "100%",
            position: "absolute",
            display: displayed ? "flex" : "none",
            justifyContent: "center",
            // pointerEvents: "none",
            alignItems: "center",
            zIndex: 2000
        }} onClick={() => setDisplayed(false)}>
            <section
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="text-base z-50 overflow-y-auto rounded-lg bg-white border border-emerald-200 p-4 shadow-xl sm:inset-x-auto sm:inset-y-10 sm:right-5 sm:w-1/2">
                <h1 className="text-center">Cycling Quality Index<br/>Wien</h1>
                <p>
                    Ein Radverkehrs-Qualitätsindex für Wien basierend auf
                    <a href="https://www.openstreetmap.org/" target="_blank"> OSM</a>-Daten.
                </p>
                <p>Der Code für die Analyse und Visualisierung stammt vom
                    <a href="https://www.osm-verkehrswende.org/cqi/" target="_blank"> www.osm-verkehrswende.org</a>-Team
                    und wurde von
                    mir nur
                    <a href="https://github.com/Findus23/vienna-cycling-quality" target="_blank"> für Wien adaptiert</a>.
                    Weitere Informationen zur Methodik findet man auch auf der
                    <a href="https://www.osm-verkehrswende.org/cqi/" target="_blank"> osm-verkehrswende-Webseite </a>
                    oder im <a
                        href="https://www.osm-verkehrswende.org/cqi/posts/2024-01-01-cqi-fossgis-2024/"> FOSSGIS-Vortrag </a>
                    von Alex Seidel.
                </p>
                <p>
                    Alle Ergebnisse sind nur so gut wie die Rohdaten und fehlende Attribute (z.B. über Fahrbahnbreiten)
                    können die Ergebnisse verfälschen.
                    <a href="https://www.osm-verkehrswende.org/cqi/improve-data/"> Hier </a>
                    gibt es Informationen, wie man zu den Daten beitragen kann.
                </p>
                <p>
                    Über mich: <a href="https://lw1.at">lw1.at</a>
                </p>
                <p>Downloads (<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>):</p>
                <ul className="list-inside list-disc mb-4">
                    <li><a href={dataTiles2024}>2024-04-15.pmtiles</a></li>
                    <li><a href={dataTiles202503}>2025-03-11.pmtiles</a></li>
                    <li><a href={dataTiles2025}>2025-07-23.pmtiles</a></li>
                    <li><a href={dataTiles2025json}>2025-07-23.json</a></li>
                </ul>
                <p>
                    Impressum: <a href="https://lw1.at/de/impressum/">lw1.at/de/impressum</a>
                </p>
            </section>
        </div>
    )
}
