

$(document).ready(function () {

	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var hhh = today.getHours();
	
	today = dd + '/' + mm + '/' + yyyy;
	$("#from_datepicker_ddcur").val(today);
	$("#to_datepicker_ddcur").val(today);
	load_district_ddcur();
	load_district_ava_or_not_ddcur();


	//   var ob = location.search.slice(1);
	//   var id = ob.split('^');

	//	sessionStorage.setItem("userid", id[0]);
	//	sessionStorage.setItem('role', id[1]);
	//	sessionStorage.setItem("secid",id[2]);


	// if (sessionStorage.getItem('userid') != null && sessionStorage.getItem('userid') != undefined && sessionStorage.getItem('role') != null && sessionStorage.getItem('role') != undefined && sessionStorage.getItem('secid') != null && sessionStorage.getItem('secid') != undefined) {
	//       var url = "../DashboardSocket";
	//       var obj = "{FTYPE:'1',Username:'" + sessionStorage.getItem('userid') + "',SOURCE:'WEB'}";
	//   _Sand_Auth(url, obj, function (res) {
	//   if (res.Code == "100") {

	//			   // BASHS CODE HERE


	//           }
	//           if (res.Code != "100") {

	//               alert("please re-Login session expire");
	//               window.sessionStorage.clear(),
	//               sessionStorage.clear();
	//               setTimeout(function () { window.location.href = 'https://sand.ap.gov.in/Login.htm' }, 1000);


	//           }


	//       });
	//   }
	//   else {
	//	return;
	//}

});

function userlogfirst() {
	if (sessionStorage.getItem('userid') != null && sessionStorage.getItem('userid') != undefined && sessionStorage.getItem('role') != null && sessionStorage.getItem('role') != undefined && sessionStorage.getItem('secid') != null && sessionStorage.getItem('secid') != undefined) {
		var url = "../DashboardSocket";
		var obj = "{FTYPE:'1',Username:'" + sessionStorage.getItem('userid') + "',SOURCE:'WEB'}";
		_Sand_Auth(url, obj, function (res) {
			if (res.code == "100") {
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
				var yyyy = today.getFullYear();
				today = dd + '/' + mm + '/' + yyyy;
				$("#from_datepicker").val(today);
				$("#to_datepicker").val(today);
				//......................................................................................................... to load date values to textboxes End
				load_district();
				load_district_ava_or_not();


			}
			if (res.code != "100") {
				_n_plain_mes_1("<strong>Duplicate Session</strong>", "Multiple Login Found ....please check once", "danger");
				_n_plain_mes_1("<strong>Session Expire!</strong>", "please re-Login session expire", "danger");
				window.sessionStorage.clear(),
					sessionStorage.clear();
				setTimeout(function () { window.location.href = 'https://sand.ap.gov.in/Login.htm' }, 2000);
			}


		});
	}
	else {
		_n_plain_mes_1("<strong>Session Expire!</strong>", "please re-Login session expire", "danger");
		window.sessionStorage.clear(),
			sessionStorage.clear();
		setTimeout(function () { window.location.href = 'https://sand.ap.gov.in/Login.htm' }, 2000);

	}
}
function userlog() {
	if (sessionStorage.getItem('userid') != null && sessionStorage.getItem('userid') != undefined && sessionStorage.getItem('role') != null && sessionStorage.getItem('role') != undefined && sessionStorage.getItem('secid') != null && sessionStorage.getItem('secid') != undefined) {
		var url = "../DashboardSocket";
		var obj = "{FTYPE:'1',Username:'" + sessionStorage.getItem('userid') + "',SOURCE:'WEB'}";
		_Sand_Auth(url, obj, function (res) {
			if (res.Code == "100") {
				return;
			}
			if (res.Code != "100") {

				alert("please re-Login session expire");
				window.sessionStorage.clear(),
					sessionStorage.clear();
				setTimeout(function () { window.location.href = 'https://sand.ap.gov.in/Login.htm' }, 2000);
			}


		});
	}
	else {

		alert("please re-Login session expire");
		window.sessionStorage.clear(),
			sessionStorage.clear();
		setTimeout(function () { window.location.href = 'https://sand.ap.gov.in/Login.htm' }, 2000);

	}
}



//$(function () {

//    window.setinterval(function () {
//        userlog();
//    }, 20000);
//});


// region LogOut Code......................................................................................................... Logout button code start
$(function () {
	$("#logout_ddcur").click(function () {
		var r = confirm("Are you Sure want to logOut");
		if (r == true) {

			sessionStorage.clear(),
				window.sessionStorage.clear(),
				window.sessionStorage.clear(),
				sessionStorage.clear();
			window.location.href = 'https://sand.ap.gov.in/Login.htm';
			window.close();

		} else {


		}
	});

});
//......................................................................................................... Logout button code End

//......................................................................................................... to load values on calender textboxes changed Start
$('#to_datepicker_ddcur').datepicker({
	constrainInput: "true",
	dateFormat: "dd/mm/yy",
	changeMonth: true,
	changeYear: true,
	maxDate: 0,
	onSelect: function (date) {
		load_Counters(1, $("#Loadistricts").find("option:selected").val());
		load_Counters(10, $("#Loadistricts").find("option:selected").val());
		load_Counters(11, $("#Loadistricts").find("option:selected").val());
		$("#from_datepicker").datepicker("option", "maxDate", date);
		$('#from_datepicker').datepicker('setDate', date);
		$("#collapseOne").hide();
		$('.nav-hide').hide();
		$("#hour_Table_display_72").hide();
		load_per_hourdisplay($("#Loadistricts").find("option:selected").val());
		Func72hoursOfDipaly($("#Loadistricts").find("option:selected").val());
		myhours = '';
		myhours = new Date().getHours();
		if ($("#Loadistricts").val() == '1') {
			perhourchangefunc('1', '1');
		}
		else {
			$("#timeChangerPerhour").val(myhours);
			perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());

		}
		if (btrptval == 1) {

			load_DailyReports_for_db($("#Loadistricts").find("option:selected").val(), $("#from_datepicker").val(), $("#to_datepicker").val(), $("#Loadistricts").find("option:selected").text());
		}
	}
});
$('#from_datepicker_ddcur').datepicker({
	dateFormat: "dd/mm/yy",
	changeMonth: true,
	changeYear: true,
	maxDate: 0,
	onSelect: function (date) {

		load_DailyReports_for_db($("#Loadistricts_ddcur").find("option:selected").val(), $("#from_datepicker_ddcur").val(), $("#to_datepicker_ddcur").val(), $("#Loadistricts_ddcur").find("option:selected").text());
	}
});
//......................................................................................................... to load values on calender textboxes changed End



//......................................................................................................... to load Districts in dropdown start

function load_district_ddcur() {
	var obj = "{FTYPE: '13',FDISTRICT:''}";
	_Sand_Auth("../Districts", obj, function (res) {
		$('#Loadistricts_ddcur').empty();
		$('#Loadistricts_ddcur').append('<option value=0>Select District</option>');
		if (res.Code == "100") {
			$('#Loadistricts_ddcur').append('<option value=1>All</option>');
			$.each(res.Distli, function (index, value) {
				$('#Loadistricts_ddcur').append('<option value="' + value.District_code + '">' + value.District_name + '</option>');
			});
			$('#Loadistricts_ddcur').prop('selectedIndex', 1);

			//load_per_hourdisplay();
		}
		else {
			$('#Loadistricts_ddcur').empty();
			$('#Loadistricts_ddcur').append('<option value=0>Select District</option>');
		}
	});
}
function load_district_ava_or_not_ddcur() {
	if ($("#Loadistricts_ddcur").val() == '0') {
		alert('Please select District');
	}
	else if ($("#Loadistricts").val() != 'undefined') {

	}
	else if ($("#Loadistricts").val() != null) {
		alert('Please select District');
	}
	else {

	}

}


$("#submit_ddcur").click(function () {
	load_DailyReports_for_db($("#Loadistricts_ddcur").find("option:selected").val(), $("#from_datepicker_ddcur").val(), $("#to_datepicker_ddcur").val(), $("#Loadistricts_ddcur").find("option:selected").text());
});



function PrintDetails(CONTRACTOR_ID, stock_id, custid) {

	var daattiem = Date.now() + CONTRACTOR_ID;
	var file1 = "<div id='" + daattiem + "' style='display:none;'><h3>Hello, this is a H3 tag</h3> <table id='VEHICLE_NO' class='table'><thead> <th>VEHILE NO</th><th>TOTAL ORDERS</th> <th>ALLOCATED</th> <th>ACCEPTED</th> <th>WAY BILL GENRATED</th> <th>DELIVERD</th><th>DOWNLOAD</th> </thead><tr><td><a>'obj.VEHICLE_NO'</a></td><td>'obj.TOTAL_ORDERS'</td><td>'obj.ALLOCATED'</td><td>'obj.ACCEPTED'</td><td>'obj.WAYBILL_GENRATED'</td><td>'obj.DELIVERD'</td><td>DOWNLOAD</td></tr> </table></div> <p>a pararaph</p></div><div id='editor'></div>"

	$('#collapseOne').append(file1);
	var doc = new jsPDF();
	var specialElementHandlers = {
		'#editor': function (element, renderer) {
			return true;
		}
	};
	doc.fromHTML($('#123456').html(), 5, 5, {
		'width': 1000,
		'elementHandlers': specialElementHandlers
	});
	doc.save('sample-file.pdf');

}


$('#timeChangerPerhour').on("change", function () {
	myhours = '';
	myhours = $("#timeChangerPerhour").find("option:selected").val();
	if ($("#Loadistricts").val() == '1') {
		perhourchangefunc(myhours, '1');
	}
	else {
		perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());
	}
});

$("#ibtn_RptView").click(function () {
	btrptval = 1;
	$("#ibtn_RptView").hide();
	$("#ibtn_RptClose").show();
	$("#RptView").show();
	load_DailyReports_for_db($("#Loadistricts").find("option:selected").val(), $("#from_datepicker").val(), $("#to_datepicker").val(), $("#Loadistricts").find("option:selected").text());
});

$("#ibtn_RptClose").click(function () {
	btrptval = 0;
	$("#ibtn_RptView").show();
	$("#ibtn_RptClose").hide();
	$("#excelXtraLarge").hide();
	$("#pdfXtraLarge").hide();
	$("#RptView").hide();
});

var DailyReports_for_db_table_body = [];


function load_DailyReports_for_db(distid, fm, tm, distText) {
	$('#dailyReport_db_ddcur').html('');
	//	$(".tabledob").dateFormat('dd/mm/yy');
	var obj = "{FDISTRICT:'" + distid + "',FROMDATE:'" + fm + "',TODATE:'" + tm + "'}";
	_Sand_Auth("../GET_deliveryreportRoute", obj, function (res) {
		if (res.Code == "100") {
			console.log(res);
			$("#excelXtraLarge").show();
			$("#pdfXtraLarge").show();
			DailyReports_for_db_table_body = "<table  id='dt_table_DailyReports' class='table'><thead style='font-size:10px;'><tr> <th colspan='27' style='text-align:center'>" + distText + " " + " Door Delivery Report</th> </tr> <tr> <th rowspan='3' style='text-align:center'>Date</th> <th colspan='6' style='text-align:center'>10 Tyre Lorry</th> <th colspan='6' style='text-align:center'>6 Tyre Lorry</th> <th colspan='6' style='text-align:center'>Tractors</th> <th colspan='8' style='text-align:center'> Total</th> </tr> <tr> <th colspan='2'>Dispatched</th> <th colspan='2' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Total</th> <th colspan='2'>Dispatched</th> <th colspan='2' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Total</th> <th colspan='2'>Dispatched</th> <th colspan='2' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Total</th> <th colspan='3'>Dispatched</th> <th colspan='3' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Grand Total</th> </tr> <tr style='font-size:8px;'> <th>No.Of Orders</th> <th>Booked Qty</th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th><th>% Qty </th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th><th style='color:red;'>% Qty </th> <th>No.Of Orders</th> <th>Booked Qty</th> </tr></thead><tbody>";

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				DailyReports_for_db_table_body += "<tr style='font-size:8px;'><td ><a>" + obj.BOOKED_DATE + " </a></td><td> " + obj.R_10TYRE_D_BOOKED_QTY + "</td> <td>" + obj.R_10TYRE_D_NO_OF_ORDERS + "</td> <td style='color:red;'>" + obj.R_10TYRE_Y_BOOKED_QTY + "</td> <td style='color:red;'>" + obj.R_10TYRE_Y_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.R_10TYRE_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.R_10TYRE_T_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.R_6TYRE_D_BOOKED_QTY + "</td> <td>" + obj.R_6TYRE_D_NO_OF_ORDERS + "</td> <td style='color:red;'>" + obj.R_6TYRE_Y_BOOKED_QTY + "</td> <td style='color:red;'>" + obj.R_6TYRE_Y_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.R_6TYRE_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.R_6TYRE_T_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.TRACTOR_D_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TRACTOR_D_NO_OF_ORDERS + "</td> <td  style='color:red;'>" + obj.TRACTOR_Y_BOOKED_QTY + "</td> <td  style='color:red;'>" + obj.TRACTOR_Y_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.TRACTOR_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TRACTOR_T_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.TOTAL_D_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TOTAL_D_NO_OF_ORDERS + "</td><td style='text-align:left'>" + obj.TOTAL_D_PER_QTY + "</td> <td  style='color:red;'>" + obj.TOTAL_Y_BOOKED_QTY + "</td> <td  style='color:red;'>" + obj.TOTAL_Y_NO_OF_ORDERS + "</td><td  style='color:red;'>" + obj.TOTAL_Y_PER_QTY + "</td> <td style='text-align:left'>" + obj.TOTAL_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TOTAL_T_NO_OF_ORDERS + "</td></tr > ";
			}
			$('#dailyReport_db_ddcur').html(DailyReports_for_db_table_body + '<tbody><table>');
		}
		else {
			$("#excelXtraLarge").hide();
			$("#pdfXtraLarge").hide();
			$('#dailyReport_db_ddcur').html('No data found');
		}
	});
}

$("#excelXtraLarge").click(function () {
	//	https://www.jqueryscript.net/table/Export-Html-Table-To-Excel-Spreadsheet-using-jQuery-table2excel.html
	$("#dailyReport_db").table2excel({
		// exclude: ".noExl",  if you want to remove some columns from table use this class at your <TR> tag and Uncoment this line
		name: "Worksheet Name",
		filename: "SomeFile",
		fileext: ".xls",
		preserveColors: true
	});
	$("#excelXtraLarge").hide();
	$("#pdfXtraLarge").hide();

});


$("#pdfXtraLarge").click(function () {

	var data = [], fontSize = 12, height = 0, doc;
	doc = new jsPDF('p', 'pt', 'a4', true);
	doc.setFont("times", "normal");
	doc.setFontSize(fontSize);
	doc.text(20, 20, "hi table");
	data = [];
	data = doc.tableToJson('#dailyReport_db_ddcur');
	height = doc.drawTable(data, {
		xstart: 10,
		ystart: 10,
		tablestart: 40,
		marginleft: 10,
		xOffset: 10,
		yOffset: 15
	});
	doc.text(50, height + 20, 'hi world');
	doc.save("some-file.pdf");




	$("#excelXtraLarge").hide();
	$("#pdfXtraLarge").hide();

});


function generatefromtable() {
	
}