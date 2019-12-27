
const iconFeature = new ol.Feature({
    geometry: new ol.geom.Point([0, 0]),
    name: '보이지 않는 꿈의 섬',
    population: 4000,
    rainfall: 500
});

const iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v3.19.1/examples/data/icon.png'
    }))
});

const vectorSource = new ol.source.Vector({
    features: [iconFeature]
});
 
const vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

// const rasterLayer = new ol.layer.Tile({
//     source: new ol.source.TileJSON({
//         url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
//         crossOrigin: ''
//     })
// });

const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

// const map = new ol.Map({
//     layers: [rasterLayer, vectorLayer],
//     target: document.getElementById('map'),
//     view: new ol.View({
//         center: [0, 0],
//         zoom: 3
//     })
// });