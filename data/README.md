# Data-Analysis

This is using the original script from https://github.com/SupaplexOSM/OSM-Cycling-Quality-Index

I slightly adapted the overpass query so that it is not using a bounding box, but the actual city borders. 
In overpass turbo we can use
```overpass
{{geocodeArea:Vienna}}->.searchArea;
```
for this and 
```overpass
area(id:3600109166)->.searchArea;
```
in the API. 

As the geoJSON export in the browser was stuck for me, I removed the `[out:json]` to get the API response as OSM XML, [download this](https://overpass-api.de/api/interpreter?data=%5Btimeout%3A25%5D%3B%0Aarea%28id%3A3600109166%29-%3E.searchArea%3B%0A%28%0A%20%20way%5B%22highway%22%3D%22cycleway%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22path%22%5D%5B%22bicycle%22%21%3D%22no%22%5D%5B%22bicycle%22%21%3D%22dismount%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22footway%22%5D%5B%22bicycle%22%3D%22yes%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22footway%22%5D%5B%22bicycle%22%3D%22designated%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22footway%22%5D%5B%22bicycle%22%3D%22permissive%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22bridleway%22%5D%5B%22bicycle%22%3D%22yes%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22bridleway%22%5D%5B%22bicycle%22%3D%22designated%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22bridleway%22%5D%5B%22bicycle%22%3D%22permissive%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22steps%22%5D%5B%22bicycle%22%3D%22yes%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22steps%22%5D%5B%22bicycle%22%3D%22designated%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22steps%22%5D%5B%22bicycle%22%3D%22permissive%22%5D%28area.searchArea%29%3B%0A%0A%20%20way%5B%22highway%22%3D%22motorway%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22motorway_link%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22trunk%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22trunk_link%22%5D%28area.searchArea%29%3B%0A%0A%20%20way%5B%22highway%22%3D%22primary%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22primary_link%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22secondary%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22secondary_link%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22tertiary%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22tertiary_link%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22unclassified%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22residential%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22living_street%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22pedestrian%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22road%22%5D%28area.searchArea%29%3B%0A%0A%20%20way%5B%22highway%22%3D%22service%22%5D%5B%21%22service%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22service%22%5D%5B%22service%22%3D%22alley%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22service%22%5D%5B%22bicycle%22%3D%22yes%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22service%22%5D%5B%22bicycle%22%3D%22designated%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22service%22%5D%5B%22bicycle%22%3D%22permissive%22%5D%28area.searchArea%29%3B%0A%20%20way%5B%22highway%22%3D%22track%22%5D%28area.searchArea%29%3B%0A%29%3B%0A%2F%2F%20print%20results%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B) and then use [osmtogeojson](https://github.com/tyrasd/osmtogeojson) directly from the commandline.
```bash
mv interpreter out.xml
osmtogeojson out.xml > out.geojson
mv out.geojson data/way_import.geojson
```

To make the script work in Qgis 3.40.6, I applied this change (see [here](https://github.com/SupaplexOSM/OSM-Cycling-Quality-Index/issues/15):

```diff
diff --git a/cycling_quality_index.py b/cycling_quality_index.py
index bc730db..4a92d9f 100644
--- a/cycling_quality_index.py
+++ b/cycling_quality_index.py
@@ -13,7 +13,7 @@ from os.path import exists
 
 #project directory
 from console.console import _console
-project_dir = os.path.dirname(_console.console.tabEditorWidget.currentWidget().path) + '/'
+project_dir = os.path.dirname(_console.console.tabEditorWidget.currentWidget().file_path()) + '/'
 dir_input = project_dir + 'data/way_import'
 dir_output = project_dir + 'data/cycling_quality_index'
 file_format = '.geojson'
```

In Qgis I exported the layer as a EPSG:4326 geojson file and then used
```bash
tippecanoe --output out.pmtiles --smallest-maximum-zoom-guess=18 -rg --drop-densest-as-needed --extend-zooms-if-still-dropping --force --layer=default output.geojson
```
to create the pmtiles for the website.
