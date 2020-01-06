// ex) 2020-01-06 15:00
const dateFormat = date => {

    let dd = date.getDate();
    let mm = date.getMonth();
    let yy = date.getFullYear();
    let hh = date.getHours();
    let MM = date.getMinutes();
    
	dd = date.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    
    mm = date.getMonth() + 1;
	mm = (mm < 10) ? '0' + mm : mm;
    
    hh = date.getHours();
    hh = (hh < 10) ? '0' + hh:hh;

    MM = date.getMinutes();
    MM = (MM < 10) ? '0'+ MM : MM;

    return yy+'-'+mm+'-'+dd+' '+hh+':'+MM;
}

/**
 * minDate config
 * @param {날짜 속성} type 
 * @param {minValue} value 
 */
const minDateConf = (date,type, value) => {

    let minDate;
    let minDate2;

    minDate = new Date(date);
    
    if (type === 'date') {
        minDate2 = minDate.getDate() + value;
        minDate.setDate(minDate2);
    } else if (type === 'month') {
        minDate2 = minDate.getMonth() + value;
        minDate.setMonth(minDate2);
    } else if (type === 'year') {
        minDate2 = minDate.getFullYear() + value;
        minDate.setFullYear(minDate2);
    }

    return minDate;
}

const setSearchDates = (startDate, endDate, type, value) => {
    let toDate = $('#toDate2').val();
    let minDate = minDateConf(toDate,type,value);
    
    console.log('setSearchDates mindate : ' + dateFormat(minDate));
    $(startDate).data("DateTimePicker").minDate(minDate);

    $('#fromDate2').val(dateFormat(minDate));
};

/**
 * date init
 * @param {시작날짜} startDate 
 * @param {종료날짜} endDate 
 * @param {년/월/일} type 
 * @param {검색 범위} value 
 */
const initSearchDates = (startDate, endDate, type, value) => {

	const options = { 
        useCurrent: true,
		format: "YYYY-MM-DD HH:mm",
		locale: moment.locale('ko'),
		defaultDate : new Date(), // default : todate.
        sideBySide:true,
        maxDate:new Date(), //최대 범위
	};
	
	$(startDate).datetimepicker(options);
	$(endDate).datetimepicker(options);
	
    setSearchDates(startDate, endDate, type, value);

    // toDate > fromDate && fromDate < toDate
    $(endDate).on("dp.change", e => {
        $(startDate).data("DateTimePicker").maxDate(e.date);
        let min = $('#fromDate2').val();
        $(startDate).data("DateTimePicker").minDate(minDateConf(min,type,value));
    });

    $(startDate).on("dp.change", e => {
        $(endDate).data("DateTimePicker").minDate(e.date);
    });

};

$(document).ready(function () {

    initSearchDates("#fromDate","#toDate","month",-1);

});
