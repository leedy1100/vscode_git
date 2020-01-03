
// const iconFeature = new ol.Feature({
//     geometry: new ol.geom.Point([0, 0]),
//     name: '보이지 않는 꿈의 섬',
//     population: 4000,
//     rainfall: 500
// });

// const iconStyle = new ol.style.Style({
//     image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
//         anchor: [0.5, 46],
//         anchorXUnits: 'fraction',
//         anchorYUnits: 'pixels',
//         src: 'https://openlayers.org/en/v3.19.1/examples/data/icon.png'
//     }))
// });

// const vectorSource = new ol.source.Vector();
 
// const vectorLayer = new ol.layer.Vector({
//     source: vectorSource
// });

// const rasterLayer = new ol.layer.Tile({
//     source: new ol.source.TileJSON({
//         url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
//         crossOrigin: ''
//     })
// });

const geoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          127.10159620100,
          37.51128041410
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          127.10159620100,
          37.51117041410
        ]
      }
    }
  ]
};
console.log('geojson type : '+typeof geoJson);

const coord = [127.10159620100, 37.51118041410];
const out = ol.coordinate.toStringXY(coord,8); // 소수점 8자리
console.log('out : '+out);
console.log('out type : ' + typeof out);

const pnt = new ol.geom.Point(coord).transform('EPSG:4326', 'EPSG:3857');  //위경도를 오픈레이어스에서 사용중인 값으로 변환
const changePoints = pnt.getCoordinates();

const layer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

// const vectorSource = new ol.source.Vector({projection: 'EPSG:4326'});  //새로운 벡터 생성
// const circle = new ol.geom.Circle(changePoints, 2);  //좌표, 반경 넓이
// const CircleFeature = new ol.Feature(circle); //구조체로 형성
// vectorSource.addFeatures([CircleFeature]); // 벡터소스에 추가


// const vectorLayer =new ol.layer.Vector({  //추가할 벡터레이어
//   source: vectorSource,
//   style: [
//   new ol.style.Style({
//       stroke: new ol.style.Stroke({   //두께
//           color: 'rgba(255, 000, 051, 0.7)',
//           width: 0.1
//       }),
//       fill: new ol.style.Fill({  //채우기
//           color: 'rgba(255, 000, 051, 0.7)'
//       }),
//       text : new ol.style.Text({  //텍스트
//         text: 'circle!',
//         textAlign: 'center',
//         font: '15px roboto,sans-serif'            
//       })
//   })]
// });
/**
 * 
 * @param {layer list color} color 
 */
const circleStyle = color =>{
  return new ol.style.Style({
    image: new ol.style.Circle({
      stroke: new ol.style.Stroke({   //두께
        color: color,
        width: 0.1
      }),
      fill: new ol.style.Fill({  //채우기
        color: color
      }),
      radius:5
    }),
    text: new ol.style.Text({  //텍스트
      text: 'circle',
      textAlign: 'center',
      font: '15px roboto,sans-serif'
    })
  })
}

const map = new ol.Map({
  target: 'map',
  layers:[layer],
  view: new ol.View({
    center:changePoints,
    zoom: 18,
    maxZoom:20
  })
});

// 필요x
const formatCoordinate = coordinate => {
  return ("\n    <table>\n      <tbody>\n        <tr><th>lon</th><td>" 
  + (coordinate[0].toFixed(2)) + "</td></tr>\n        <tr><th>lat</th><td>" 
  + (coordinate[1].toFixed(2)) + "</td></tr>\n      </tbody>\n    </table>");
}
/**
 * 
 * @param {geoJson api} url 
 */
const source = url => {
  return new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: url
  });
}
/**
 * 
 * @param {geoJson api} url 
 * @param {layer list} color 
 */
const vector = (url,color) => {
  return new ol.layer.Vector({
    source: source(url),
    style: [
      circleStyle(color)
    ]
  });
} 

//  map.addLayer(vector());


 /**
  * popup layer
  */
const element = document.getElementById('popup');

const popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10]
});



// 좌표 대신 데이터값이 들어감
const dataInsert = data => {
  return "<div>"+(data)+"</div>";
}

const info = document.getElementById('info');

// const tiledMap = new ol.layer.Tile({
// 	//visible : false,
// 	source : new ol.source.TileWMS({
// 		url : 'http://61.74.201.220:8090/geoserver/HBL/wms',
// 		params : {
// 			'FORMAT' : "image/jpeg",
// 			'VERSION' : '1.1.1',
// 			tiled : true,
// 			LAYERS : 'HBL:lwt_1f',
// 			STYLES : '',
// 		},
// 		crossOrigin : 'anonymous' // cors 방어 코드
// 	}),
// 	opacity: 0.7
// });