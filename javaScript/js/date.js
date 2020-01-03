
const dayAdd = (today, type, value) =>{
    
    let sDate;

    if(type==='date'){
        sDate = today.getDate() + value;
        today.setDate(sDate);
    }else if(type==='month'){
        sDate = today.getMonth() + value;
        today.setMonth(sDate);
    }else if(type==='year'){
        sDate = today.getYear() + value;
        today.setYear(sDate);
    }else{
        sDate = today.getDate() + value;
        today.setDate(sDate);
    }
    
    return today;
}


const setSearchDates = (startDate, endDate, type, value) => {
    const today = new Date();
    dayAdd(today, type, value);
    console.log('day:'+dayAdd(today, type, value));
    const fromDate = $('#fromDate').val(dayAdd(today, type, value));
    console.log('fromDate : ' + fromDate);
    // $(endDate).val(today);
    
    
};

/**
 * minDate config
 * @param {날짜 속성} type 
 * @param {minValue} value 
 */
const minDateConf = (type,value)=>{

    let minDate = new Date();
    console.log(minDate);
    let minDate2;

    if (type === 'month') {
        minDate2 = minDate.getMonth() + value;
        minDate.setMonth(minDate2);
    }else if(type==='date'){
        minDate2 = minDate.getDate() + value;
        minDate.setDate(minDate2);
    }

    return minDate;
}

const initSearchDates = (startDate, endDate, type, value) => {

    let minDate = new Date();
    let minDate2 = minDate.getMonth()-1;
    minDate.setMonth(minDate2);

	const options = { 
        useCurrent: true,
		format: "YYYY-MM-DD HH:mm",
		locale: moment.locale('ko'),
		defaultDate : new Date(), // 기본값으로 오늘 날짜를 입력한다. 기본값을 해제하려면 defaultDate 옵션을 생략한다. 
        sideBySide:true,
        maxDate:new Date(), //최대 범위
        minDate:minDateConf('month',-1) //최소 범위
	};
	
	$(startDate).datetimepicker(options);
	$(endDate).datetimepicker(options);

    let dateType;
    let dateValue;

	if(isNoValue(type)) {
		dateType = 'date';
		dateValue = -2;
	}
	else {
		dateType = type;
		dateValue = value;
	}
		
	setSearchDates(startDate, endDate, dateType, dateValue);
   
    $(startDate).on("dp.change", e => {
        $(endDate).data("DateTimePicker").minDate(e.date);
    });
    
    $(endDate).on("dp.change", e => {
        $(startDate).data("DateTimePicker").maxDate(e.date);
    });
};

$(document).ready(function () {

    initSearchDates("#fromDate","#toDate","");

});
