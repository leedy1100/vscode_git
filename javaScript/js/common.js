// var dateAdd = function(sDate, type, value) {
// 	var yy = parseInt(sDate.substr(0, 4), 10);
// 	var mm = parseInt(sDate.substr(5, 2), 10);
//     var dd = parseInt(sDate.substr(8,2), 10);
//     var HH = parseInt(sDate.substr(11,2),10);
//     var min = parseInt(sDate.substr(14),10); 

//     var date;
//     if(type == "date")
// 		date = new Date(yy, mm - 1, dd + value);
// 	else if(type == "month")
// 		date = new Date(yy, mm - 1 + value, dd);
// 	else if(type == "year")
// 		date = new Date(yy + value, mm - 1, dd);
// 	else
// 		date = new Date(yy, mm - 1, dd + value);

// 	yy = date.getFullYear();

// 	mm = date.getMonth() + 1;
// 	mm = (mm < 10) ? '0' + mm : mm;

// 	dd = date.getDate();
//     dd = (dd < 10) ? '0' + dd : dd;
    
//     HH = date.getHours();
//     HH = (HH < 10) ? '0' + HH:HH;

//     min = date.getMinutes();
//     min = (min < 10) ? '0'+ min : min;

// 	return '' + yy + '-' +  mm  + '-' + dd+ '  ' + HH+ ':' + min ;
	
// };

// Date.prototype.format = function(f) {
//     if (!this.valueOf()) return " ";
 
//     var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
//     var d = this;
     
//     return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
//         switch ($1) {
//             case "yyyy"	: return d.getFullYear();
//             case "yy"	: return (d.getFullYear() % 1000).zf(2);
//             case "MM"	: return (d.getMonth() + 1).zf(2);
//             case "dd"	: return d.getDate().zf(2);
//             case "E"	: return weekName[d.getDay()];
//             case "HH"	: return d.getHours().zf(2);
//             case "hh"	: return ((h = d.getHours() % 12) ? h : 12).zf(2);
//             case "mm"	: return d.getMinutes().zf(2);
//             case "ss"	: return d.getSeconds().zf(2);
//             case "a/p"	: return d.getHours() < 12 ? "오전" : "오후";
//             default		: return $1;
//         }
//     });
// };
 
// String.prototype.string = function(len) {
// 	var s = '', i = 0;
// 	while(i++ < len)
// 		s += this;
// 	return s;
// };

// String.prototype.string = function(len) {
// 	var s = '', i = 0;
// 	while(i++ < len)
// 		s += this;
// 	return s;
// };

// String.prototype.zf = function(len) {
// 	return "0".string(len - this.length) + this;
// };

// Number.prototype.zf = function(len) {
// 	return this.toString().zf(len);
// };

// /**
//  * 조회종료일자는 현재날짜, 조회시작일자는 한달 이전으로 설정
//  * @param startDate
//  * @param endDate
//  */
// function setSearchDates(startDate, endDate, type, value) {
// 	var today = new Date().format('yyyy-MM-dd HH:mm');
// 	$(startDate).val(dateAdd(today, type, value));
// 	$(endDate).val(today);
	
// 	$(endDate).datetimepicker('setStartDate', $(startDate).val());
// 	$(startDate).datetimepicker('setEndDate', $(endDate).val());
// };

// function initSearchDates(startDate, endDate, type, value) {
//     var minDate = new Date();
//     minDate.setDate(minDate.getDate()-1);
//     var maxDate = new Date();

// 	var options = { 
// 		format: "yyyy-mm-dd  HH:mm",
// 		language : 'ko', // 화면에 출력될 언어를 한국어로 설정한다. 
// 		pickTime : true, // 사용자로부터 시간 선택을 허용하려면 true를 설정하거나 pickTime 옵션을 생략한다. 
// 		defalutDate : new Date(), // 기본값으로 오늘 날짜를 입력한다. 기본값을 해제하려면 defaultDate 옵션을 생략한다. 
// 		setDaysOfWeekDisabled:false,
// 		sideBySide:true,
// 		pickerPosition: "bottom-left",
// 		autoclose: true,
//         todayBtn: true,
//         maxDate: maxDate,
//         minDate: minDate
// 	};
	
// 	$(startDate).datetimepicker(options);
// 	$(endDate).datetimepicker(options);

// 	var dateType, dateValue;
// 	if(isNoValue(type)) {
// 		dateType = 'date';
// 		dateValue = -10;
// 	}
// 	else {
// 		dateType = type;
// 		dateValue = value;
// 	}
		
// 	setSearchDates(startDate, endDate, dateType, dateValue);

// 	// 종료일자는 시작일 보다 앞서지 않아야 한다.
// 	$(startDate).change(function(){
// 		$(endDate).datetimepicker('setStartDate', $(startDate).val());
// 	});
	
// 	// 시작일자는 종료일 보다 앞서야 한다.
// 	$(endDate).change(function(){
// 		$(startDate).datetimepicker('setEndDate', $(endDate).val());
// 	});
// };

/**
 * 이벤트 핸들러
 * 숫자만 입력가능토록 제한
 */
function inputNumberOnly() {
	var jqThis = $(this);

	var val = jqThis.val();
	jqThis.val(val.replace(/[^0-9]/gi,""));
}

/**
 * 이벤트 핸들러
 * 숫자(콤마포함)만 입력가능토록 제한
 */
function inputNumberWithComma() {
	var jqThis = $(this);

	var val = jqThis.val();
	val = val.replace(/[^\d]/g, '');
	val = val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	
	jqThis.val(val);
}

/**
 * 수자를 콤마를 포함하는 문자로 변경
 * @param x - 숫자
 * @returns - 콤마 포함 문자
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 실수(Float)만 입력 가능토록 제한
 */
function inputFloat() {
	var jqThis = $(this);
	
	var val = jqThis.val();
	val = val.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	
	jqThis.val(val);
}

/**
 * 숫자만 입력받는 이벤트를 추가한다.
 * @param delegatorStr - 이벤트 처리 대리자
 * @param targetStr - 이벤트 대상
 */
function setInputNumberOnly(delegatorStr, targetStr) {
	setJqEvt(delegatorStr, 'input', targetStr, inputNumberOnly);
}

/**
 * 숫자(콤마 포함)만 입력받는 이벤트를 추가한다.
 * @param delegatorStr - 이벤트 처리 대리자
 * @param targetStr - 이벤트 대상
 */
function setInputNumberWithComma(delegatorStr, targetStr) {
	setJqEvt(delegatorStr, 'input', targetStr, inputNumberWithComma);
}

/**
 * 실수(Float)만 입력 가능토록 이벤트 추가
 * @param delegator - 이벤트 어리 대리자
 * @param target - 이벤트 대상
 */
function setInputFloat(delegator, target) {
	setJqEvt(delegator, 'input', target, inputFloat);
}

/**
 * JQuery 이벤트를 등록한다.
 * @param delegatorStr - 이벤트 처리 대리자
 * @param eventStr - 이벤트명
 * @param targetStr - 이벤트 대상
 * @param eventHandler - 이벤트 처리 함수
 * @returns
 */
function setJqEvt(delegatorStr, eventStr, targetStr, eventHandler) {
	$(delegatorStr).off(eventStr, targetStr) .on(eventStr, targetStr, eventHandler);
}

/**
 * 아이디 영문숫자혼합하여 6~20자리 문자열 검사
 * @param String
 * @returns boolean
 */
var isValidId = function(id) {
//	아이디 규칙 : 영문, 숫자 혼합 6자 이상 ~ 20자 이하(17.03.14) 
	return /^.*(?=.{6,30})(?=.*[0-9])(?=.*[a-zA-Z]).*$/.test(id);
}


/**
 * 비밀번호 영문숫자혼합하여 10~20자리 문자열 검사
 * @param String
 * @returns boolean
 */
var isValidPwd = function(pwd) {
//	비밀번호 규칙 : 영문, 숫자 혼합 10자 이상 (17.03.06) 
	return /^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/.test(pwd);
}

/**
 * 자바스크립트 객체가 undefined 또는 null 인지 또는 값이 없는('')지 검사한다.
 * @param obj
 * @returns
 */
var isNoValue = function(value) {
	if(isUndefinedOrNull(value) || $.trim(value) == '')
		return true;

	return false
}

var isNumber = function(value) {
	return typeof value === 'number' && isFinite(value);
}

/**
 * 실수형 검사
 * @param value 실수 문자열
 * @return boolean
 */
var isFloat = function(value) {
	return /^[+-]?\d*(\.?\d*)$/.test(value);
}


/**
 * 자바스크립트 객체가 undefined 또는 null 인지 검사한다.
 * @param obj
 * @return
 */
var isUndefinedOrNull = function(obj) {
	if(typeof obj == "undefined" || obj == null)
		return true;

	return false;
};

var parseURLParameters = function() {
	var p = {};
	
	var params = window.location.search.substring(1);
	params = params.split('&');
	if(isUndefinedOrNull(params))
		return p;
	if(params.length <= 0)
		return p;
	
	for(var i = 0; i < params.length; i++) {
		var entity = params[i].split('=');
		
		if(isUndefinedOrNull(entity))
			continue;
		if(entity.length != 2)
			continue;
		
		p[entity[0]] = decodeURIComponent(entity[1]);
	}
	return p;
};

/**
 * URI 파라메터를 생성
 * @param opt name-value 쌍으로 구성된 오브젝트
 * @return URI 파라메터
 */
var createURIParameter = function(opt) {
	console.log('createURIParameter() is deprecated.');
	var parameter = '';
	for(var name in opt)
		parameter += '&' + name + '=' + encodeURIComponent(opt[name]);
	
	return parameter;
};

/**
 * 요청 URI를 생성
 * @param opt
 * @return URI 파라메터
 */
var createRequestURI = function(opt) {
	console.log(opt);
	var options = opt || {};
	
	options.uri = (options.uri !== undefined) ? options.uri : '';
	options.uri += '&';

	var x = 0;
	var parameters = '';
	for(var name in options.params) {
		if(x != 0)
			parameters += '&';
		
		parameters += name + '=' + encodeURIComponent(options.params[name]);
		x = 1;
	}

	return options.uri + parameters;
}


/**
 * 셀렉트박스 설정
 * @param target Target select box
 * @param value A value to set
 * @return
 */
var setSelectBox = function(target, value) {
	if(isUndefinedOrNull(value)) {
		console.log('common.js setSelectBox(' + target + ') : variable(' + value + ') is undefined.');
		return;
	}
	
	$(target).val(value).prop('selected', true);
	return;
};

/**
 * 셀렉트박스 설정
 * @param target Target select box
 * @param name A name to set
 * @return
 */
var setSelectBoxWithText = function(target, text) {
	if(isUndefinedOrNull(text)) {
		console.log('common.js setSelectBox(' + target + ') : text(' + text + ') is undefined.');
		return;
	}
	
	$(target + ' option:contains("' + text + '")').prop('selected', true);
	return;
};

/**
 * 셀렉트박스 옵션 초기화 설정
 * @param target
 * @param values 옵션 값을 포함한 오브젝트 배열
 * @param textProperty  오브젝트 내 옵션 문자열 프로퍼티
 * @param valueProperty 오브젝트 내 옵션 값 프로퍼티
 */
var initSelectBox = function(target, values, textProperty, valueProperty) {
	$.each(values, function(t, v) {
		$(target).append(new Option(v[textProperty], v[valueProperty]));
	});
}

/**
 * 셀렉트박스 옵션 초기화 설정 (전체 포함)
 * @param target
 * @param textForAll 전체 구분 문자열
 * @param valueForAll 전체 구분 값
 * @param values 옵션 값을 포함한 오브젝트 배열
 * @param textProperty  오브젝트 내 옵션 문자열 프로퍼티
 * @param valueProperty 오브젝트 내 옵션 값 문자열 프로퍼티
 * 
 */
var initSelectBoxWithAll = function(target, values, textProperty, valueProperty, textForAll, valueForAll) {
	$(target).append(new Option(textForAll, valueForAll));
	initSelectBox(target, values, textProperty, valueProperty);
}

/**
 * 문자열내 포함된 문자 전체를 치환.
 * @param string 대상문자열
 * @param searchStr 검색문자열
 * @param replaceStr 치환문자열
 */
var replaceAll = function(string, searchStr, replaceStr) {
	return string.split(searchStr).join(replaceStr);
}

/**
 * 체크박스 선택값 설정
 * @param selectorName : 체크박스 그룹명
 * @param valueChecked : 선택값
 * @returns
 */
var setCheckbox = function(checkboxGroupName, valueChecked) {
	if(isUndefinedOrNull(valueChecked)) {
		console.log('setCheckbox: Undefined or null valueChecked.');
		return;
	}

	var selector = 'input[name="' + checkboxGroupName + '"][type="checkbox"]';

	$(selector).each(function() {
		if($(this).val() == valueChecked) {
			$(this).prop('checked', 'checked');
		}
	});
};

var setCheckboxYN = function(selector, yn) {
	if(isUndefinedOrNull(yn)) {
		console.log('setCheckboxYN: Undefined or null value.');
		return;
	}

	if(yn == 'Y') {
		$(selector).attr('checked', true);
	}
	else {
		$(selector).attr('checked', false);
	}
}


/**
 * selector 선택값 설정
 * @param selectorName : 콤보박스 그룹명
 * @param valueChecked : 선택값
 * @returns
 */
var setSelector = function(selectorName, valueSelected) {
	if(isUndefinedOrNull(valueSelected)) {
		console.log('setSelector: Undefined or null valueSelected.');
		return;
	}

	var selector = 'select[name="' + selectorName + '"] option';

	$(selector).each(function() {
		if($(this).val() == valueSelected) {
			$(this).prop('selected', 'selected');
		}
	});
};

var setSelectorValue = function(selector, valueSelected) {
	if(isUndefinedOrNull(valueSelected)) {
		console.log('setSelector: Undefined or null valueSelected.');
		return;
	}

	var options = $(selector + ' option');

	$(options).each(function() {
		if($(this).val() == valueSelected) {
			$(this).prop('selected', 'selected');
		}
	});
};

/**
 * 라디오 버튼 선택값 설정
 * @param selectorName : 라디오버튼 그룹명
 * @param valueChecked : 선택값
 * @returns
 */
var setRadioButton = function(radioGroupName, valueChecked) {
	if(isUndefinedOrNull(valueChecked)) {
		console.log(radioGroupName + ': setRadioButton: Undefined or null valueChecked.');
		return;
	}

	var selector = 'input[name="' + radioGroupName + '"][type="radio"]';

	$(selector).each(function() {
		if($(this).val() == valueChecked) {
			$(this).prop('checked', 'checked');
		}
	});
};

// $(document).ready(function(){
// 	$('#loadHtml').hide();
// 	$(window).ajaxStart(function(){
// 	//	$('#loadHtml').show();
// 		$("#loadHtml").attr("style", "display:inline");
// 	})
// 	.ajaxStop(function(){
// 	//	$('#loadHtml').hide();
// 		$("#loadHtml").attr("style", "display:none");
// 	});
// });

