import { type MapInitialViewState } from '../BaseMap/BaseMap'
import { $searchParams } from '../BaseMap/store'
import { useStore } from '@nanostores/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useRef } from 'react'
import { NavigationControl } from 'react-map-gl/maplibre'
import { MapInspector } from './MapInspector'
import { MapSourceCqi } from './MapSourceCqi'
import { Overlay } from './Overlay'
import { interactiveLayerIdsByGroup, legendByGroups } from './layers/layers'
import {
    filterParamsKey,
    filterParamsStringify,
    validAnzeigeValues,
    type CqiMapSearchparams,
} from './storeCqi'
import {MapInfo} from "./MapInfo.tsx";
import { Suspense, lazy } from 'react'

const BaseMap = lazy(()=>
import("../BaseMap/BaseMap").then(mod=>({default:mod.BaseMap})))

type Props = {
    maxBounds: MapInitialViewState['maxBounds']
    minZoom: MapInitialViewState['minZoom']
    maxZoom?: MapInitialViewState['maxZoom']
}

export const CqiMap = ({ maxBounds, minZoom, maxZoom }: Props) => {
    const params = useStore($searchParams) as CqiMapSearchparams

    // Guard against invalid "anzeige" param values
    if (!validAnzeigeValues.includes(params.mode)) {
        $searchParams.open({ ...params, ...{ mode: 'cqi' } })
    }

    // Initialize default filter
    const initialFilterApplied = useRef(false)
    useEffect(() => {
        if (initialFilterApplied.current) return
        if (!legendByGroups[params.mode]) return

        legendByGroups[params.mode].forEach((group) => {
            group.legends.forEach((legend) => {
                if (legend?.defaultOn === true && legend.filterConfig) {
                    const key = filterParamsKey({ groupKey: group.key, legendKey: legend.key })
                    const keyAlreadyFiltered = params?.filters?.includes(key)
                    if (!keyAlreadyFiltered) {
                        const newFilters = filterParamsStringify([params?.filters, key])
                        const newParams = newFilters ? { ...params, ...{ filters: newFilters } } : params
                        $searchParams.open(newParams)
                    }
                }
            })
        })

        initialFilterApplied.current = true
    }, [params, legendByGroups])

    return (
        <><Suspense fallback={<div>Loading the map…</div>}>
            <BaseMap
                initialViewState={{
                    longitude: 16.37027,
                    latitude: 48.20974,
                    zoom: 11,
                    // Only pass the props if they are implicitly present
                    // Needed to get rid of Astro's strict TS settings https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes
                    ...(maxBounds ? {maxBounds} : {}),
                    ...(minZoom ? {minZoom} : {}),
                    ...(maxZoom ? {maxZoom} : {}),
                }}
                interactiveLayerIds={interactiveLayerIdsByGroup[params?.mode] || []}
            >
                <MapSourceCqi/>
                <NavigationControl showCompass={false} position="top-right"/>
                <MapInspector/>
                <Overlay/>
            </BaseMap>
        </Suspense><MapInfo/></>

)
}
