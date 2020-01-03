const year = "";
const month = "";
const date = "";
const hour = "";
const min = "";

$(function(){
  // initSearchDates('#fromDate', '#toDate', '');
   // layer 항목 별 컬러 선택, layer1,2...에 대한 param 추가
  colorStyle(url,'red');
  colorStyle(url2,'blue');
  map.addOverlay(popup);
});

const test = result => {
    return new Promise((resolve, reject) => {
        resolve(result)
    })
}

const c = async () => {
    try {
        console.log('log:', await test('test1'))
        console.log('log:', await test('test2'))
        return '비동기 종료'
    } catch (e) {
        console.log(e)
    }
}

const popup2 = () => {
    let url = 'popup.html';
    let name = 'popup test';
    let option = 'width=500, height=500, top=500, left=500'
    window.open( url, name, option )
}

$('#myModal').on('shown.bs.modal', () => {
    $('#myInput').trigger('focus')
})

$('#click').click(() => {
    // c().then(res=>{
    //     console.log('end log : ',res)
    // })
    popup2();
})

const time = time => {
    setTimeout(() => {
        window.location.reload(1)
    }, time)
}

const url = 'json/geojson.json';
const url2 = 'json/geojson2.json';
// const color = 'rgba(255, 000, 051, 0.7)';

const layerContent = (url, color) => {
  map.addLayer(vector(url,color));
}

/**
 * layer list를 불러온다면 list 별 color 선택
 * @param {layers list} content 
 * @param {geojson api} url
 * 
 */
const colorStyle = (url,content) =>{
  let color = 'rgba(0, 0, 0, 0.3)';
  if(content==='blue'){
    color = 'rgba(000, 000, 255, 0.7)';
  }else if(content==='red'){
    color = 'rgba(255, 000, 051, 0.7)';
  }
  layerContent(url,color);
}



// map 중앙 좌표 동적 딱히 필요는...
map.on('moveend', ()=> {
    let view = map.getView();
    let center = view.getCenter();
    info.innerHTML = formatCoordinate(center);
  });

/**
 * popup 기능
 */
map.on('click', event => {
  let feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (feature) {
    let coordinate = feature.getGeometry().getCoordinates();
    // coordinate에 원하는 데이터 입력
    let data = c().then(res=>{
      return res;
    });
    popup.setPosition(coordinate);
    $(element).popover({
      placement: 'top',
      html: true,
      content: dataInsert(data)
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

map.on('pointermove', event => {
  if (map.hasFeatureAtPixel(event.pixel)) {
    map.getViewport().style.cursor = 'pointer';
  } else {
    map.getViewport().style.cursor = 'inherit';
  }
});
