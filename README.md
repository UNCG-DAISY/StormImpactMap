# Storm Impact Map

## Project Structure

### Important Directories:

- bin: for locally hosted external dependencies
- data: holds storm resources
- src: project-specific css and js files

### Important Files:

- admin.js: for adding storms (gathering noaa tiles and creating new storm directory) and updating map contents to reflect root storm directory changes)
- index.html
- src/js/map.js: The main script which contains code for initializing the map
- src/js/Storm.js: Object used for loading storm layers
- src/js/Util.js: all other custom functions used 
- storm_config.json: File used to specify/configure map storm contents (order in which they appear in the storm selector and which resources to enable for each storm)

## Adding a Storm
- Clone project on local machine
- Install dependencies (npm install)
- Run "node admin.js" at command line
- Enter "add" at prompt to gather NOAA tile images and create new storm directory
- Add other resources to new storm directory according to file naming convention below
- Run "node admin.js"
- Enter "update" to add new resource layers to the map

## Removing a storm

- To remove from map only (temporary), delete storm entry from storms_config.json and update storm contents using admin script
delete storm directory
- To remove from the project entirely, delete given storm directory and update contents using admin script


## Dependencies

- jQuery@3.5.1
- bootstrap@4.5.2
- fontawesome@5.14.0
- leaflet.js@0.6.4
- leaflet.markercluster@1.4.1
- shp.js
- leaflet.shpfile.js
- popper.js@
- tile.stamen.js

## Contributors

- Jamison Valentine - Lead Software Developer
- Evan Goldstein - Lead Scientist
- Somya Mohanty - Oracle

## Data Sources

- [NOAA NGS Emergency Response Imagery tiles](https://storms.ngs.noaa.gov/)
- [USGS overwash predictions](https://coastal.er.usgs.gov/data-release/doi-P9Z362BC/)
- [USGS overwash observations](https://coastal.er.usgs.gov/data-release/doi-P9BW6CG6/)
- [NOAA NHC Hurricane Tracks](https://www.nhc.noaa.gov/data/tcr/)
- [ML observations of washover](https://github.com/UNCG-DAISY/WashoverML)
