const test = result => {
    return new Promise((resolve, reject) => {
        resolve(result)
    })
}

const c = async () => {
    try {
        console.log('log:', await test('test1'))
        console.log('log:', await test('test2'))
        console.log('log:', await test('test3'))
        console.log('log:', await test('test4'))
        console.log('log:', await test('test5'))
        return '비동기 종료'
    } catch (e) {
        console.log(e)
    }
}

const popup = () => {
    let url = 'popup.html';
    let name = 'popup test';
    let option = 'width=500, height=500, top=100, left=200'
    window.open( url, name, option )
}

$('#myModal').on('shown.bs.modal', () => {
    $('#myInput').trigger('focus')
})

$('#click').click(() => {
    // c().then(res=>{
    //     console.log('end log : ',res)
    // })
    popup();
})

// iconFeature.setStyle(iconStyle);

// map.on('click', evt => {
//     let feature = map.forEachFeatureAtPixel(evt.pixel,
//         feature => {
//             return feature;
//         });

//     if (feature) {
//         alert(feature.get('name'));
//     }
// });

// map.on('pointermove', e => {
//     if (!e.dragging) {
//         let pixel = map.getEventPixel(e.originalEvent);
//         let hit = map.hasFeatureAtPixel(pixel);
//         map.getTarget().style.cursor = hit ? 'pointer' : '';
//     }
// });

// setTimeout(() => {
//     window.location.reload(1)
// }, 10000);
