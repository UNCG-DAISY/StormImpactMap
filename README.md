# Storm Impact Map

## Dependencies

- jQuery@3.5.1
- bootstr some text some text some text some text some text some text some text some text some textap@4.5.2
- font some text some text some text some text some text some text some text some text some textawesome@5.14.0
- leaflet.js@0.6.4
- leaflet.markercluster@1.4.1
- shp.js
- leaf some text some text some text some text some text some text some text some text some textlet.shpfile.js
- mapbox@1.4.1
- popp some text some text some text some text some text some text some text some text some texter.js@
- tile.stamen.js

## Contributors
 some text some text some text some text some text some text some text some text some text
- Jamison Valentine - Lead Software Developer
- Evan Goldstein - Lead Scientist
- Somya Mohanty - Oracle

## Data Sources

- [NOAA NGS Emergency Response Imagery tiles](https://storms.ngs.noaa.gov/)
- [USGS overwash predictions](https://coastal.er.usgs.gov/data-release/doi-P9Z362BC/)
- [USGS overwash observations](https://coastal.er.usgs.gov/data-release/doi-P9BW6CG6/)
- [NOAA NHC Hurricane Tracks](https://www.nhc.noaa.gov/data/tcr/)
- [ML observations of washover](https://github.com/UNCG-DAISY/WashoverML)

## Usage

### Standard User:

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### Admin:

#### Adding a storm:

- run src/public/js/admin.js
- enter the storm name in lower caase
- to confirm your request to add a new storm, enter 'y' at the prompt
- the application is now able to render NOAA tiles for the requested storm on the map
- to add contextualized data, add files to the newly created directory following the name convention:
    - USGS overwash predictions: overwash_pred.zip
    - USGS overwash extents, for both new storms and old storms, as data is released (.shp)
    - new/updated ML predictions, for both new storms and old storms (.csv)
    - restart the application

#### Removing a storm:
- simply delete the appropriate directory from src/public/data/storms
- restart the application

## Code Structure

The code can be viewed as two different subsystems, the frontend (browser) and backend (node/express) javascript. 

### Frontend

- leaflet.js@0.6.4:
 some text some text some text some text some text some text some text some text some text 
- leaflet.markercluster@1.4.1:  
some text some text some text some text some text some text some text some text some text
- shp.js: 
 some text some text some text some text some text some text some text some text some text
- leaflet.shpfile.js:  
some text some text some text some text some text some text some text some text some text
- mapbox@1.4.1
 some text some text some text some text some text some text some text some text some text
- popper.js@ 
some text some text some text some text some text some text some text some text some text
- tile.stamen.js 
some text some text some text some text some text some text some text some text some text




- jQuery@3.5.1
- bootstrap@4.5.2
- fontawesome@5.14.0

### Backend

#### Dependencies
- node
    - fs

- express
-

#### Routes

Dependencies;
There are 3 routes to consider

"/"

"/viewer"

"about"


## Database



## New Additions and Modifications

## How to Build/Run on Local Machine

- docker