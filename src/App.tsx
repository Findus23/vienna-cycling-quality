import type {LngLatBoundsLike} from 'react-map-gl/maplibre'
import {CqiMap} from "./page_map/CqiMap.tsx";
import "./base.css"

function App() {

    let viennabbox = [16.18278, 48.11833, 16.58, 48.32306]
    // const maxBounds = bbox(
    //     buffer(bboxPolygon(berlinInnenstadtBbox), 250, {
    //         units: 'meters',
    //     }),
    // ) as LngLatBoundsLike
    // console.log(maxBounds)
    viennabbox[0]*=0.99
    viennabbox[1]*=0.999
    viennabbox[2]*=1.01
    viennabbox[3]*=1.001

    const minZoom = 10

    return (
        <>
            <CqiMap maxBounds={viennabbox as LngLatBoundsLike} minZoom={minZoom}/>
            <div className="absolute bottom-3 left-3 rounded bg-white/80 px-1 py-0.5 text-xs">
                Datenstand: 15.04.2024
            </div>

        </>
    )
}

export default App
