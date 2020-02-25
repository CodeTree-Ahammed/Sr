var tablebody2 = [];
var tablebody3 = [];
var tablebody4 = [];
var tablebody5 = [];
var ods_order = [];
var navbody = [];
var navtabs = [];
var mydistrict = [];
var contractor_view = 0;
var tableperhourDisplay = [];
var myhours = '';
var btnval_72 = 0;
var btrptval = 0;
var btrptval_all  =0;

$(document).ready(function () {

	$('#loading-wrapper').hide();
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var hhh = today.getHours();
	$("#timeChangerPerhour").val(hhh);
	today = dd + '/' + mm + '/' + yyyy;
	$("#from_datepicker").val(today);
	$("#to_datepicker").val(today);
	load_district();
	load_district_ava_or_not();


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
		
	//			 // basha to paste the ready code here
	

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
  
//    window.setInterval(function () {
//        userlog();
//    }, 20000);
//});


// region LogOut Code......................................................................................................... Logout button code start
$(function () {
	$("#logout").click(function () {
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
$('#to_datepicker').datepicker({
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
$('#from_datepicker').datepicker({
	dateFormat: "dd/mm/yy",
	changeMonth: true,
	changeYear: true,
	maxDate: 0,
	onSelect: function (date) {
	
		load_Counters(1, $("#Loadistricts").find("option:selected").val());
		load_Counters(10, $("#Loadistricts").find("option:selected").val());
		load_Counters(11, $("#Loadistricts").find("option:selected").val());
		$("#collapseOne").hide();
		$("#hour_Table_display_72").hide();
		load_per_hourdisplay($("#Loadistricts").find("option:selected").val());
		Func72hoursOfDipaly($("#Loadistricts").find("option:selected").val());
		myhours = '';
		myhours = new Date().getHours();
		if ($("#Loadistricts").val() == '1') {
			perhourchangefunc('1', '1');
		}
		else {
			perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());
		}
		if (btrptval == 1) {

			load_DailyReports_for_db($("#Loadistricts").find("option:selected").val(), $("#from_datepicker").val(), $("#to_datepicker").val(), $("#Loadistricts").find("option:selected").text());
		}
	}
});
//......................................................................................................... to load values on calender textboxes changed End



//......................................................................................................... to load Districts in dropdown start

function load_district() {
	var obj = "{FTYPE: '13',FDISTRICT:''}";
	_Sand_Auth("../Districts", obj, function (res) {
		$('#Loadistricts').empty();
		$('#Loadistricts').append('<option value=0>Select District</option>');
		if (res.Code == "100") {
			$('#Loadistricts').append('<option value=1>All</option>');
			$.each(res.Distli, function (index, value) {
				$('#Loadistricts').append('<option value="' + value.District_code + '">' + value.District_name + '</option>');
			});
			$('#Loadistricts').prop('selectedIndex', 1);
			
			//load_per_hourdisplay();
		}
		else {
			$('#Loadistricts').empty();
			$('#Loadistricts').append('<option value=0>Select District</option>');
		}
	});
}
function load_district_ava_or_not() {
	if ($("#Loadistricts").val() == '0') {
		alert('Please select District');
		$("#collapseOne").hide();
		$("#hour_Table_display_72").hide();
	}
	else if ($("#Loadistricts").val() != 'undefined') {
		load_Counters(1, 1);
		load_Counters(10, 1);
		load_Counters(11, 1);
		Func72hoursOfDipaly(1);
		load_per_hourdisplay(1);
		myhours = '';
		myhours = new Date().getHours();
		perhourchangefunc(myhours, '1');
		$("#hour_Table_display_72").hide();

	}
	else if ($("#Loadistricts").val() != null) {
		alert('Please select District');
		$("#collapseOne").hide();
		$("#hour_Table_display_72").hide();
	}
	else {

	}

}


$("#submit").click(function () {
	load_Counters(1, $("#Loadistricts").find("option:selected").val());
	load_Counters(10, $("#Loadistricts").find("option:selected").val());
	load_Counters(11, $("#Loadistricts").find("option:selected").val());
	Func72hoursOfDipaly($("#Loadistricts").find("option:selected").val());
	$("#collapseOne").hide();
	$('.nav-hide').hide();
	$("#hour_Table_display_72").hide();
	$("#icloseVehicle").click();
	$("#icloseContractor").click();
	myhours = '';
	myhours = new Date().getHours();
	if ($("#Loadistricts").val() == '1') {
		perhourchangefunc('1', '510');
		load_per_hourdisplay('1');
	}
	else {
		perhourchangefunc(myhours, $("#Loadistricts").find("option:selected").val());
		load_per_hourdisplay($("#Loadistricts").find("option:selected").val());
	}
	if (btrptval == 1) {

		load_DailyReports_for_db($("#Loadistricts").find("option:selected").val(), $("#from_datepicker").val(), $("#to_datepicker").val(), $("#Loadistricts").find("option:selected").text());
	}

});


//......................................................................................................... to load Districts in dropdown End


//......................................................................................................... to load Count for type 1 , 11 , 12 start
function load_Counters(id,tdis) {
	var obj = "{FTYPE: '" + id + "',FDISTRICT:'" + tdis + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:''}";

		_Sand_Auth("../SandTransportReportsapi", obj, function (res) {
			if (res.Code == "100") {
				if (id == 1) {
					$('#todaysandquantity').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_SAND_QUANTITY, duration: 3000 });
					$('#totalsandquantitycum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_SAND_QUANTITY_CUM, duration: 3000 });
					$('#todayquantitydispatched').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_QUANTITY_DISPATCHED, duration: 3000 });
					$('#totalquantitydispatched_cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_QUANTITY_DISPATCHED_CUM, duration: 3000 });
					$('#tobdispatch ').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TO_BE_DISPATCH, duration: 3000 });
					$('#tobdispatchcum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TO_BE_DISPATCH_CUM, duration: 3000 });
				}
				if (id == 10) {
					
					$('#Tnt_Tractor_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_BOOKED, duration: 3000 });
					$('#Tnt_Tractor_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_DISPATHED, duration: 3000 });
					$('#Tnt_Tractor_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_BOOKED_CUM, duration: 3000 });
					$('#Tnt_Tractor_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_PENDING_CUM, duration: 3000 });
					$('#Tnt_Tractor_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_TRACTOR_DISPATHED_CUM, duration: 3000 });

					$('#Tnt_6Tyre_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_BOOKED, duration: 3000 });
					$('#Tnt_6Tyre_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_DISPATHED, duration: 3000 });
					$('#Tnt_6Tyre_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_BOOKED_CUM, duration: 3000 });
					$('#Tnt_6Tyre_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_PENDING_CUM, duration: 3000 });
					$('#Tnt_6Tyre_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_6TYRE_DISPATHED_CUM, duration: 3000 });

					$('#Tnt_10Tyre_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_BOOKED, duration: 3000 });
					$('#Tnt_10Tyre_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_DISPATHED, duration: 3000 });
					$('#Tnt_10Tyre_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_BOOKED_CUM, duration: 3000 });
					$('#Tnt_10Tyre_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_PENDING_CUM, duration: 3000 });
					$('#Tnt_10Tyre_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_10TYRE_DISPATHED_CUM, duration: 3000 });

					$('#Tnt_Booked').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_BOOKED, duration: 3000 });
					$('#Tnt_Dispathed').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_DISPATHED, duration: 3000 });
					$('#Tnt_Booked_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_BOOKED_CUM, duration: 3000 });
					$('#Tnt_Pending_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_PENDING_CUM, duration: 3000 });
					$('#Tnt_Dispathed_Cum').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TNT_DISPATHED_CUM, duration: 3000 });


				}
				if (id == 11) {
				
					$('#TOTAL_REG').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_REG, duration: 3000 });
					$('#TODAY_REG').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_REG, duration: 3000 });
					$('#TOTAL_45').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_45, duration: 3000 });
					$('#TODAY_45').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_45, duration: 3000 });
					$('#TOTAL_9_10').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_9_10, duration: 3000 });
					$('#TODAY_9_10').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_9_10, duration: 3000 });
					$('#TOTAL_18').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_18, duration: 3000 });
					$('#TODAY_18').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_18, duration: 3000 });
					$('#TOTAL_24').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_24, duration: 3000 });
					$('#TODAY_24').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_24, duration: 3000 });
					$('#TOTAL_30').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_30, duration: 3000 });
					$('#TODAY_30').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_30, duration: 3000 });
					$('#TOTAL_VEHICLES').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_VEHICLES, duration: 3000 });
					$('#TODAY_VEHICLES').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TODAY_VEHICLES, duration: 3000 });

				}
			}
			else {
				$('#todaysandquantity').text("0");
				$('#totalsandquantitycum').text("0");
				$('#todayquantitydispatched').text("0");
				$('#totalquantitydispatched_cum').text("0");
				$('#tobdispatch').text("0");
				$('#Tnt_Tractor_Booked').text("0");
				$('#Tnt_Tractor_Dispathed').text("0");
				$('#Tnt_Tractor_Booked_Cum').text("0");
				$('#Tnt_Tractor_Pending_Cum').text("0");
				$('#Tnt_Tractor_Dispathed_Cum').text("0");

				$('#Tnt_6Tyre_Booked').text("0");
				$('#Tnt_6Tyre_Dispathed').text("0");
				$('#Tnt_6Tyre_Booked_Cum').text("0");
				$('#Tnt_6Tyre_Pending_Cum').text("0");
				$('#Tnt_6Tyre_Dispathed_Cum').text("0");

				$('#Tnt_10Tyre_Booked').text("0");
				$('#Tnt_10Tyre_Dispathed').text("0");
				$('#Tnt_10Tyre_Booked_Cum').text("0");
				$('#Tnt_10Tyre_Pending_Cum').text("0");
				$('#Tnt_10Tyre_Dispathed_Cum').text("0");
				$('#Tnt_Booked').text("0");
				$('#Tnt_Dispathed').text("0");
				$('#Tnt_Booked_Cum').text("0");
				$('#Tnt_Pending_Cum').text("0");
				$('#Tnt_Dispathed_Cum').text("0");
				$('#TOTAL_REG').text("0");
				$('#TODAY_REG').text("0");
				$('#TOTAL_45').text("0");
				$('#TODAY_45').text("0");
				$('#TOTAL_9_10').text("0");
				$('#TODAY_9_10').text("0");
				$('#TOTAL_18').text("0");
				$('#TODAY_18').text("0");
				$('#TOTAL_24').text("0");
				$('#TODAY_24').text("0");
				$('#TOTAL_VEHICLES').text("0");
				$('#TODAY_VEHICLES').text("0");
				
			}
		});
}
//......................................................................................................... to load Count for type 1 , 11 , 12 End


//......................................................................................................... to load Count for type 1 , 11 , 12 with MT Quantity start
function TntViews(id) {
	
	ods_order = id;
	if (id == 4.5) {
		$('#Vtyre').text("Tractor (4.5 MT)");
		mytyreObj = 'Tractor';
	}
	if (id == 10) {

		$('#Vtyre').text("6 Tyre (10 MT)");
		mytyreObj = '6Tyre';
	}
	if (id == 18) {

		$('#Vtyre').text("10 Tyre (18 MT)");
		mytyreObj = '10Tyre';
	}
	if (id == 22) {
		$('#Vtyre').text("Total No.of Trips");
		mytyreObj = 'TotNfT';
	}
	$('.nav-hide').hide();
	$('#loading-wrapper').show();
	var obj = "{FTYPE:'12',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../SandTransportReports_Get_for_total_orders", obj, function (res) {
		
		var OnestDistrict = $("#Loadistricts").find("option:selected").val();
		if (res.Code == "100") {

			
			$("#dt_table_1").empty('');
			tablebody = '<table id="dt_table_1" class="table text-left"><thead style="font-size:16px;"><tr class="text-left"><th class="pt-0" style="width:2%">#</th><th class="pt-0" style="width:3%;">Name</th><th class="pt-0" style="width:1%;">Total</th></tr ></thead ><tbody>';

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				tablebody += "<tr><td>" + obj.SNo + "</td ><td <a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;'  onClick=load_Cluster('" + obj.SNo + mytyreObj + OnestDistrict + "','" + obj.Name + "')>" + (obj.Name).replace('_', ' ') + "</a></td ><td ><label class='badge badge-info mr-4 mr-xl-2' style='font-size:20px;border-radius:10px;'>" + obj.Total + "</label></td></tr>";
			}


			TotalOrdersTyres(tablebody);
			$('#loading-wrapper').hide();
		}
		else {
			$('#loading-wrapper').hide();
			$('#tbl_OrderDetails_counts_table').html('No data found');
		}
	});
}

function TotalOrdersTyres(tabledata) {
	$('#tbl_OrderDetails_counts_table').html(tabledata + '<tbody><table>');

}


function load_Cluster(sn1, namess) {

	//alert(" cluster id tho  " + sn1 + namess + "evi load i ya eee");
	if (sn1 != 0 || sn1 == undefined) {
		navtabs += "<li class='nav-item nav-hide' id='" + "li" + sn1 + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1 + "' data-toggle='tab' href='" + "#mycsttab" + sn1 + "' role='tab' aria-controls='" + "mycsttab" + sn1 + "' aria-selected='false'>" + namess.replace('_', ' ') + "<button class='align-btn' id='" + "btn" + sn1 + "' onClick=closebtn('" + sn1 + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
		navbody += "<div class='col-md-10 tab-pane fade' id='" + "mycsttab" + sn1 + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1 + "'>'" + namess.replace('_', ' ') + "' </div>";
		$('#mydatatabs').append(navtabs);
		$('#mytabcontent').append(navbody);
		this.$("#li" + sn1).show();



		this.$("#mycsttab" + sn1).show();
		Cluster_details(ods_order, sn1);
	}
	else {
		this.$("#li" + sn1).hide();
		this.$("#mycsttab" + sn1).hide();
		this.$("#chinturmandal-tab").show();

	}


}


function Cluster_details(mt, idn) {
	$('#loading-wrapper').show();
	var obj = "{FTYPE:'13',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "'}";
	_Sand_Auth("../SandTransportReportsapi", obj, function (res) {
		tablebody2 = '<table id="dt_table_2" class="table"><thead style="font-size:14px;"><tr> <th style="width:2%">ID</th><th style="width:8%">Cluster Name</th> <th style="width:5%">TOTAL ORDERS</th> <th style="width:1%">ALLOCATED</th> <th style="width:1%">ACCEPTED</th> <th style="width:5%">WAY BILL GENRATED</th> <th style="width:2%">DELIVERD</th> </tr> </thead><tbody>';
		if (res.Code == "100") {
			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				tablebody2 += "<tr><td><a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;' onClick=load_stockyard('" + obj.CLUSTER_ID + "','" + obj.CLUSTER_ID + mytyreObj + "')  >" + obj.CLUSTER_ID + "</a></td><td>" + obj.CLUSTER_NAME + "</td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td></tr>";
			}
			$("#mycsttab" + idn).html(tablebody2 + '<tbody><table>');
			$('#loading-wrapper').hide();
		}
		else {
		}
	});
}


function load_stockyard(sn1cusObj, sn1cus) {

	navtabs += "<li class='nav-item nav-hide' id='" + "li" + sn1cus + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1cus + "' data-toggle='tab' href='" + "#mycsttab" + sn1cus + "' role='tab' aria-controls='" + "mycsttab" + sn1cus + "' aria-selected='false'>" + sn1cusObj.replace('_', ' ') + "<button class='align-btn' style='border:none;' id='" + "btn" + sn1cus + "' onClick=closebtn('" + sn1cus + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody += "<div class='col-md-12 tab-pane fade' id='" + "mycsttab" + sn1cus + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1cus + "'>" + sn1cusObj.replace('_', ' ') + " </div>";
	$('#mydatatabs').append(navtabs);
	$('#mytabcontent').append(navbody);

	if (sn1cus != 0 || sn1cus == undefined) {
		this.$("#li" + sn1cus).show();
		this.$("#mycsttab" + sn1cus).show();
		stockyard_details(sn1cusObj, sn1cus, ods_order);
	}
	else {
		this.$("#li" + sn1cus).hide();
		return;
	}


}



//stock yard function to get the cid at cluster id and mt as type of metric tons
function stockyard_details(custid, custidobjName, mt) {
	$('#loading-wrapper').show();
	var obj = "{FTYPE:'1',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + custid + "',fstockyard_id:''}";

	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {

		
		tablebody3 = '<table id="dt_table_3" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%"> STOCKYARD ID</th> <th style="width: 13%;">STOCKYARD NAME</th> <th  style="width: 10%;">CLUSTER NAME</th> <th  style="width: 8%;">TOTAL ORDERS</th> <th  style="width: 2%;">ALLOCATED</th> <th  style="width: 2%;">ACCEPTED</th> <th  style="width: 10%;">WAY BILL GENRATED</th> <th  style="width: 2%;">DELIVERD</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tablebody3 += "<tr><td><a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;'  onclick=load_stockyard_contractor_info('" + obj.STOCKYARD_ID + mytyreObj + "','" + obj.STOCKYARD_ID + "','" + obj.CLUSTER_ID + "');>" + obj.STOCKYARD_ID + "</a></td><td>" + obj.STOCKYARD_NAME + "</td><td>" + obj.CLUSTER_NAME + "</td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td></tr>";


			}
			$('#loading-wrapper').hide();
			$("#mycsttab" + custidobjName).html(tablebody3 + '<tbody><table>');
			
		}
		else {
			$('#loading-wrapper').hide();
			$("#mycsttab" + custidobjName).html('No data Found');
			
		}
	});
}


function load_stockyard_contractor_info(sn1stock_id, sn1stock_idObj, sn1stock_clusterid) {


	navtabs += "<li class='nav-item nav-hide' id='" + "li" + sn1stock_id + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1stock_id + "' data-toggle='tab' href='" + "#mycsttab" + sn1stock_id + "' role='tab' aria-controls='" + "mycsttab" + sn1stock_id + "' aria-selected='false'>" + sn1stock_idObj + "<button class='align-btn' style='border:none;' id='" + "btn" + sn1stock_id + "' onClick=closebtn('" + sn1stock_id + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody += "<div class='tab-pane fade nav-hide' id='" + "mycsttab" + sn1stock_id + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1stock_id + "'>" + sn1stock_idObj + " </div>";
	$('#mydatatabs').append(navtabs);
	$('#mytabcontent').append(navbody);

	if (sn1stock_id != 0 || sn1stock_id == undefined) {
		this.$("#li" + sn1stock_id).show();
		this.$("#mycsttab" + sn1stock_id).show();
		contaractor_details(sn1stock_clusterid, sn1stock_idObj, sn1stock_id, ods_order);
	}
	else {
		return;
	}
																

}

function contaractor_details(custid, stock_id, stock_id_obj, mt) {
	$('#loading-wrapper').show();
	var obj = "{FTYPE:'3',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + custid + "',fstockyard_id:'" + stock_id + "'}";
	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {
		
		tablebody4 = '<table id="dt_table_4" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%"> CONTRACTOR ID</th>  <th  style="width: 10%;">CONTRACTOR NAME</th> <th  style="width: 8%;">TOTAL ORDERS</th> <th  style="width: 2%;">ALLOCATED</th> <th  style="width: 2%;">ACCEPTED</th> <th  style="width: 10%;">WAY BILL GENRATED</th> <th  style="width: 2%;">DELIVERD</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tablebody4 += "<tr><td><a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px;'  onclick=load_contaractor_veh_details('" + obj.CONTRACTOR_ID + "','" + obj.CONTRACTOR_ID + mytyreObj + "','" + stock_id + "','" + custid + "');>" + obj.CONTRACTOR_ID + "</a></td><td>" + obj.CONTRACTOR_NAME + "</td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td></tr>";
			}
			
			$("#mycsttab" + stock_id_obj).html(tablebody4 + '<tbody><table>');
			$('#loading-wrapper').hide();

		}
		else {
			$('#loading-wrapper').hide();
			$("#mycsttab" + stock_id_obj).html('No data Fountd');
		}


	});
}


function load_contaractor_veh_details(mycontractors_id_obj, contractors_id, sn1stock_id, sn1stock_clusterid) {
	
	navtabs += "<li class='nav-item nav-hide' id='" + "li" + contractors_id + "' style='display:none;' ><a class='nav-link' id='" + "lia" + contractors_id + "' data-toggle='tab' href='" + "#mycsttab" + contractors_id + "' role='tab' aria-controls='" + "mycsttab" + contractors_id + "' aria-selected='false'>" + mycontractors_id_obj + "<button class='align-btn' style='border:none;' id='" + "btn" + contractors_id + "' onClick=closebtn('" + contractors_id + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody += "<div class='tab-pane fade nav-hide' id='" + "mycsttab" + contractors_id + "' role='tabpanel' aria-labelledby='" + "mycsttab" + contractors_id + "'>" + mycontractors_id_obj + " </div>";
	$('#mydatatabs').append(navtabs);
	$('#mytabcontent').append(navbody);

	if (contractors_id != 0 || contractors_id == undefined) {
		this.$("#li" + contractors_id).show();
		this.$("#mycsttab" + contractors_id).show();
		contaractor_veh_details(mycontractors_id_obj, contractors_id, sn1stock_id, sn1stock_clusterid, ods_order);
	}
	else {

		return;
	}


}
function contaractor_veh_details(contractor_id, contractorsObj, stock_id, custid, mt) {
	$('#loading-wrapper').show();
	var obj = "{FTYPE:'4',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + custid + "',fstockyard_id:'" + stock_id + "',fcontractor_id:'" + contractor_id + "'}";
	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {
		tablebody5 = '<table id="dt_table_5" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%">VEHICLE NO</th><th  style="width: 8%;">TOTAL ORDERS</th> <th  style="width: 2%;">ALLOCATED</th> <th  style="width: 2%;">ACCEPTED</th> <th  style="width: 10%;">WAY BILL GENRATED</th> <th  style="width: 2%;">DELIVERD</th><th  style="width: 2%;">DOWNLOAD</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tablebody5 += "<tr><td><a style='font-style: italic; text-decoration: underline;font-size:15px;'>" + obj.VEHICLE_NO + "</a></td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td><td style='text-align:center'>" + obj.ALLOCATED + "</td><td style='text-align:center'>" + obj.ACCEPTED + "</td><td style='text-align:center'>" + obj.WAYBILL_GENRATED + "</td><td style='text-align:center'>" + obj.DELIVERD + "</td><td a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:15px; cursor:pointer' onclick=PrintDetails('" + obj.CONTRACTOR_ID + "','" + stock_id + "','" + custid + "','" + obj.VEHICLE_NO + "');>DOWNLOAD</td></tr>";
			}

			$("#mycsttab" + contractorsObj).html(tablebody5 + '<tbody><table>');
			$('#loading-wrapper').hide();
		}
		else {

			$("#mycsttab" + contractorsObj).html('No Data Found');
			$('#loading-wrapper').hide();
		}
	});
}
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









var contractor_cluster_tablebody = [];
var contractor_cluster_tablebody_cumulative = [];
function load_cluster_for_contrator(id) {

	var obj = "{FTYPE:'30',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../get_contractor_details", obj, function (res) {

		if (res.Code == "100") {
			contractor_cluster_tablebody = '<table id="dt_table_contractor" class="table"><thead style="font-size:14px;"> <tr class="text-left" > <th style="width:11% !important;;">CONTRACTOR ID</th> <th style="width:9% !important;;">NAME</th><th style="width:11% !important;; ">MOBILE</th> <th style="width:8% !important;">Tractor</th> <th style="width:8% !important;">6 Tyre</th> <th style="width:8% !important;">10 Tyre</th><th style="width:8% !important;">12 Tyre</th> <th style="width:8% !important;">TOTAL</th> </tr> </thead> </thead><tbody>';


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				contractor_cluster_tablebody += "<tr><td>" + obj.CONTRACTOR_ID + "</td><td><a>" + obj.CONTRACTOR_NAME + "</a></td><td>" + obj.CONTRACTOR_MOBILE + "</td><td>" + obj.TOTAL_4_5 + "</td><td style='text-align:center'>" + obj.TOTAL_9_10 + "</td><td style='text-align:center'>" + obj.TOTAL_18 + "</td><td style='text-align:center'>" + obj.TOTAL_24 + "</td><td style='text-align:center'>" + obj.TOTAL_491024 + "</td></tr>";
			}

			cluster_for_contractor(contractor_cluster_tablebody);
		}
		else {

		}
	});
}

function load_cluster_for_contrator_cumulative(id) {

	var obj = "{FTYPE:'301',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../get_contractor_details", obj, function (res) {

		if (res.Code == "100") {
			contractor_cluster_tablebody_cumulative = '<table id="dt_table_contractor_cum" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width: 13%;">CONTRACTOR ID</th> <th  style="width: 10%;">NAME</th><th  style="width: 2%;">MOBILE</th> <th  style="width: 5%;">Tractor</th> <th  style="width: 5%;">6 Tyre</th> <th  style="width: 5%;">10 Tyre</th><th  style="width: 5%;">12 Tyre</th> <th  style="width: 5%;">TOTAL</th> </tr> </thead> </thead><tbody>';
			String.prototype.replaceAt = function (index, charcount) {
				return this.substr(0, index) + this.substr(index + charcount);
			}

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				contractor_cluster_tablebody_cumulative += "<tr><td>" + obj.CONTRACTOR_ID + "</td><td><a>" + obj.CONTRACTOR_NAME + "</a></td><td>" + obj.CONTRACTOR_MOBILE + "</td><td>" + obj.TOTAL_4_5_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_9_10_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_18_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_24_CUM + "</td><td style='text-align:center'>" + obj.TOTAL_491024_CUM + "</td></tr>";
			}
			cluster_for_contractor_cumulative(contractor_cluster_tablebody_cumulative);
		}
		else {

		}
	});
}




function cluster_for_contractor(tabledata) {

	$('#tbl_cluster_Contractor').html(tabledata + '<tbody><table>');
	$('#tbl_cluster_Contractor').DataTable({
		destroy: true,
		stateSave: true,
		paging: true,
		"pageLength": 10,
		"ordering": false
	});
	var clustertablesss = $('#tbl_cluster_Contractor').DataTable();		
	$('#tbl_cluster_Contractor').on('click', 'tr', function () {
		var rowData = clustertablesss.rows(this).data().toArray();

		$('#Load_contractor_id_popup').modal('show');
		var UsedContracotor = rowData[0][0]
		load_cluster_for_contrator_by_contratorID(UsedContracotor);
		//$('#mylabels').text();
		
	});

}


function cluster_for_contractor_cumulative(tabledata) {

	$('#tbl_cluster_Contractor_cumulative').html(tabledata + '<tbody><table>');
	$('#tbl_cluster_Contractor_cumulative').DataTable({
		destroy: true,
		stateSave: true,
		paging: true,
		"pageLength": 10,
		"ordering": false
	});
	var clustertablesss_cum = $('#tbl_cluster_Contractor_cumulative').DataTable();
	$('#tbl_cluster_Contractor_cumulative').on('click', 'tr', function () {
		var rowData = clustertablesss_cum.rows(this).data().toArray();

		$('#Load_contractor_id_popup').modal('show');
		var UsedContracotor_cum = rowData[0][0]
		load_cluster_for_contrator_by_contratorID(UsedContracotor_cum);
		

	});

}

var Load_contractor_id_datatable = [];
function load_cluster_for_contrator_by_contratorID(contratorID) {

	var obj = "{FTYPE:'8',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'',TODATE:'',FSANDQUANTY:'',fcluster_id:'',fstockyard_id:'',Fcontractor_id:'" + contratorID + "'}";

	_Sand_Auth("../Load_Contarctor_Details_by_id_route", obj, function (res) {

		console.log(res);
		//$('#loading-wrapper').show();
		  // table created by bhagya Lakshmi.. .. .. .. .. ..
		Load_contractor_id_datatable = '<table id="dt_table_Load_contractor_id" class="table"><thead style="font-size:12px;"> <tr class="text-left"> <th>AGENCY NAME</th> <th  title="Contractor Name">NAME</th> <th >PAN NUMBER</th> <th>BANK NAME</th><th>BANK ACCOUNT NUMBER</th> <th>VEHICLE NUMBER</th><th>VEHICLE TYPE</th>  </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				Load_contractor_id_datatable += "<tr><td><a>" + obj.CONTRACTOR_AGENCY_NAME + "</a></td><td>" + obj.CONTRACTOR_NAME + "</td><td>" + obj.CONRACTOR_PAN_NUMBER + "</td><td>" + obj.CONTRACTOR_BANK_NAME + "</td><td>" + obj.CONTRACTOR_BANK_ACCOUNT_NUMBER + "</td><td>" + obj.VEHICLE_NO + "</td><td>" + obj.VEHICLE_CLASS + "</td></tr>";
			}
			$('#Load_contractor_id_table').html(Load_contractor_id_datatable + '<tbody><table>');
		}
	});
}

function load_contractor_panel() {
	contractor_view = 1

	if (contractor_view == 1) {
		$('#ContractorDetails_show').show();
		$('#lobipanel_custom_control_contaractor').lobiPanel();
		load_cluster_for_contrator(ods_order);
		load_cluster_for_contrator_cumulative(ods_order);
		contractor_view = 0;
	}
	else {
		$('#ContractorDetails_show').hide();
	}
}





//......................................................................................................... to load Count for type 1 , 11 , 12 with MT Quantity End




//......................................................................................................... Counters for jquery Objects strat
$(function () {
	$.fn.jQuerySimpleCounter = function (options) {
		var settings = $.extend({
			start: 0,
			end: 100,
			easing: 'swing',
			duration: 400,
			complete: ''
		}, options);

		var thisElement = $(this);

		$({ count: settings.start }).animate({ count: settings.end }, {
			duration: settings.duration,
			easing: settings.easing,
			step: function () {
				var mathCount = Math.ceil(this.count);
				thisElement.text(mathCount);
			},
			complete: settings.complete
		});
	};
});
//......................................................................................................... Counters for jquery Objects End

//......................................................................................................... 72 hours functionlaity strat
function Func72hoursOfDipaly(distr) {
	var obj = "{P_type: '1',P_district_id:'" + distr + "',P_cluster_id:'',P_stockyard_id:'',P_permit_quantity:''}";
	if ($("#Loadistricts").val() != '0') {
		_Sand_Auth("../SandTransportReports_72Hours_Route", obj, function (res) {
			mydistrict = "for  " + $("#Loadistricts").find("option:selected").val() + "  District";
			if (res.Code == "100") {

				//for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				//	var obj = res.DailyRepDetsli[index];
				//	var counter = index + 1;
				//	vehicle_cluster_tablebody += "<tr style='font-size:10px;'><td onClick=load_cluster_for_vehicle_info('" + obj.STOCKYARD_ID + "') <a style='color: #33af65;font-weight: bold; text-decoration: underline;font-size:10px;'>" + obj.STOCKYARD_ID + "</a></td ><td  >" + (obj.CLUSTER_NAME).replace('_', ' ') + "</td ><td ><label>" + obj.NO_OF_VEHICLES + "</label></td></tr>";
				//}

				$('#Total_Orders_45_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_4_5, duration: 3000 });
				$('#Total_Orders_10_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_10, duration: 3000 });
				$('#Total_Orders_18_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_18, duration: 3000 });
				$('#Total_Orders_tot_72').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ORDERS_TOT, duration: 3000 });

			}
			else {
				// alert("No data Found"); return;
			}
		});
	}
	else {
		$('#Total_Orders_45_72').text("0");
		$('#Total_Orders_10_72').text("0");
		$('#Total_Orders_18_72').text("0");
		$('#Total_Orders_tot_72').text("0");
	}
}	

var but_72 = 0;
$('#Tractor_view_72').on('click', function (e) {
	but_72 = 1;
	load72hours_panel();
});

$('#6Tyre_view_72').on('click', function (e) {
	but_72 = 2;
	load72hours_panel();
});
$('#10Tyre_view_72').on('click', function (e) {
	but_72 = 3;
	load72hours_panel();
});

$('#TotalTyre_view_72').on('click', function (e) {
	but_72 = 4;
	load72hours_panel();
});
$('#icloseme_72').on('click', function (e) {

	but_72 = 0;
	load72hours_panel();
});




function load72hours_panel() {
	event.preventDefault();
	if (but_72 == undefined) {
		$("#hour_Table_display_72").hide();
	}
	else if (but_72 == '0') {
		$("#hour_Table_display_72").hide();
	}
	else if (but_72 == '1') {

		btnval_72 = 4.5;
		mytyreObj_72 = 'Tractor_72';
		$("#hour_heading_vehicle_72").text("Tractor (4.5 MT)");
		$("#headcolor_72").removeClass();
		$("#headcolor_72").addClass('icon-bg bg-primary dropdown-head');
		$("#hour_Table_display_72").show();
		load_panel_72("#hour_Table_lobipanel_72");
		load_72_hours_cluster_data($("#Loadistricts").find("option:selected").val(), btnval_72, mytyreObj_72);



	}
	else if (but_72 == '2') {
		btnval_72 = 10;		
		mytyreObj_72 = '6Tyre_72';
		$("#hour_heading_vehicle_72").text("6 Tyre (10 MT)");
		$("#headcolor_72").removeClass();
		$("#headcolor_72").addClass('icon-bg bg-success dropdown-head');
		$("#hour_Table_display_72").delay(500).show();
		load_panel_72("#hour_Table_lobipanel_72");
		load_72_hours_cluster_data($("#Loadistricts").find("option:selected").val(), btnval_72, mytyreObj_72);

	}
	else if (but_72 == '3') {
		btnval_72 = 18;
		mytyreObj_72 = '10Tyre_72';
		$("#hour_heading_vehicle_72").text("10 Tyre (18 MT)");
		$("#headcolor_72").removeClass();
		$("#headcolor_72").addClass('icon-bg bg-danger dropdown-head');
		$("#hour_Table_display_72").delay(500).show();
		load_panel_72("#hour_Table_lobipanel_72");
		load_72_hours_cluster_data($("#Loadistricts").find("option:selected").val(), btnval_72, mytyreObj_72);
	}
	else if (but_72 == '4') {
		$("#hour_heading_vehicle_72").text("Total No.of Trips");
		btnval_72 = 22;
		mytyreObj_72 = '18Tyre_72';
		$("#headcolor_72").removeClass();
		$("#headcolor_72").addClass('card-header icon-bg bg-white dropdown-head text-dark');
		$("#hour_Table_display_72").delay(500).show();
		load_panel_72("#hour_Table_lobipanel_72");
		load_72_hours_cluster_data($("#Loadistricts").find("option:selected").val(), btnval_72, mytyreObj_72);
	}
	else {
		$("#hour_Table_display_72").hide();
	}
}

function load_panel_72(pid) {
	
	$(pid).lobiPanel();
}

var tablebody_dt_table_72_hours_cluster_data = [];
function load_72_hours_cluster_data(distr, mtmid, mytyreObj_72_val) {
	
	$('#loading-wrapper').show();
	var obj = "{P_type: '2',P_district_id:'" + distr + "',P_cluster_id:'',P_stockyard_id:'',P_permit_quantity:'" + mtmid + "'}";
	var OnestDistrict_72 = $("#Loadistricts").find("option:selected").val();
	_Sand_Auth("../SandTransportReports_72Hours_Route", obj, function (res) {
		if (res.Code == "100") {

			$("#dt_table_72_hours_cluster_data").empty('');
			tablebody_dt_table_72_hours_cluster_data = '<table id="dt_table_72_hours_cluster_data" class="table text-left"><thead style="font-size:14px;"><tr class="text-left"><th class="pt-0" style="width:2%">Cluster ID</th><th class="pt-0" style="width:3%;">Cluster Name</th><th class="pt-0" style="width:1%;">Total Orders</th></tr ></thead ><tbody>';

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				tablebody_dt_table_72_hours_cluster_data += "<tr><td onClick=load_72hrs_stockyard_info('" + obj.CLUSTER_ID + mytyreObj_72_val + OnestDistrict_72 + "','" + obj.CLUSTER_ID + "')  <a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:13px;'>" + obj.CLUSTER_ID + "</a></td ><td   >" + obj.CLUSTER_NAME + "</td ><td ><label class='badge badge-info mr-4 mr-xl-2' style='font-size:20px;border-radius:10px;'>" + obj.TOTAL_ORDERS + "</label></td></tr>";
			}


			table_72_hours_cluster_data(tablebody_dt_table_72_hours_cluster_data);
			$('#loading-wrapper').hide();
		}
		else {
			$('#loading-wrapper').hide();
			$('#table_72_hours_cluster').html('No Data Found');

		}
	});
}





function table_72_hours_cluster_data(tabledata) {
	$('#table_72_hours_cluster').html(tabledata + '<tbody><table>');
}


var nav_tabs_72 = [];
var navbody_72 = [];
function load_72hrs_stockyard_info(sn1Cluster_72_obj, sn1_clusterid_72) {

	/// ahammed working now .. .. .. .. .. ...

	nav_tabs_72 += "<li class='nav-item nav-hide' id='" + "li" + sn1Cluster_72_obj + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1Cluster_72_obj + "' data-toggle='tab' href='" + "#mycsttab" + sn1Cluster_72_obj + "' role='tab' aria-controls='" + "mycsttab" + sn1Cluster_72_obj + "' aria-selected='false'>" + sn1_clusterid_72 + "<button class='align-btn' style='border:none;' id='" + "btn" + sn1Cluster_72_obj + "' onClick=closebtn('" + sn1Cluster_72_obj + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody_72 += "<div class='tab-pane fade nav-hide' id='" + "mycsttab" + sn1Cluster_72_obj + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1Cluster_72_obj + "'>" + sn1_clusterid_72 + " </div>";
	$('#notDeliverin72h_ul').append(nav_tabs_72);
	$('#notDeliverin72h_tab_content').append(navbody_72);

	if (sn1Cluster_72_obj != 0 || sn1Cluster_72_obj == undefined) {
		this.$("#li" + sn1Cluster_72_obj).show();
		this.$("#mycsttab" + sn1Cluster_72_obj).show();
		stockyard_details_72(sn1Cluster_72_obj, sn1_clusterid_72, btnval_72, mytyreObj_72);
	}
	else {
		this.$("#li" + sn1Cluster_72_obj).hide();
		return;
	}
}


var stockyard_details_table_body_72 = [];
function stockyard_details_72(sn1_stockyard_obj_72, sn1_stockyard_Clust_id_72, mtmid_Stock, mytyreObj_stck_72) {
	$('#loading-wrapper').show();

	var distr_cou_72 =  $("#Loadistricts").find("option:selected").val()
	var obj = "{P_type: '3',P_district_id:'" + distr_cou_72 + "',P_cluster_id:'" + sn1_stockyard_Clust_id_72 + "',P_stockyard_id:'',P_permit_quantity:'" + mtmid_Stock + "'}";
	_Sand_Auth("../SandTransportReports_72Hours_Route", obj, function (res) {

		stockyard_details_table_body_72 = '<table id="dt_table_stockyard_details_table_body_72" class="table col-md-5"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%"> STOCKYARD ID</th>  <th  style="width: 10%;">STOCKYARD NAME</th> <th  style="width: 8%;">TOTAL ORDERS</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				stockyard_details_table_body_72 += "<tr><td onClick=load_72hrs_Contractor_info_delay('" + obj.STOCKYARD_ID + mytyreObj_stck_72 +distr_cou_72 + "','" + obj.STOCKYARD_ID + "','" + obj.CLUSTER_ID + "') <a style='color: #33af65;font-weight: bold;font-style: italic; text-decoration: underline;font-size:13px;'>" + obj.STOCKYARD_ID + "</a></td><td>" + obj.STOCKYARD_NAME + "</td><td style='text-align:center'>" + obj.TOTAL_ORDERS + "</td></tr>";
			}

			$("#mycsttab" + sn1_stockyard_obj_72).html(stockyard_details_table_body_72 + '<tbody><table>');
			$('#loading-wrapper').hide();

		}
		else {
			$('#loading-wrapper').hide();
			$("#mycsttab" + sn1_stockyard_obj_72).html('No data Fountd');
		}


	});
}



function load_72hrs_Contractor_info_delay(sn1Stock_72_obj, sn1Stock_72_id, sn1Cluster_72_id) {

	/// ahammed working now .. .. .. .. .. ...

	nav_tabs_72 += "<li class='nav-item nav-hide' id='" + "li" + sn1Stock_72_obj + "' style='display:none;' ><a class='nav-link' id='" + "lia" + sn1Stock_72_obj + "' data-toggle='tab' href='" + "#mycsttab" + sn1Stock_72_obj + "' role='tab' aria-controls='" + "mycsttab" + sn1Stock_72_obj + "' aria-selected='false'>" + sn1Stock_72_id + "<button class='align-btn' style='border:none;' id='" + "btn" + sn1Stock_72_obj + "' onClick=closebtn('" + sn1Stock_72_obj + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	navbody_72 += "<div class='tab-pane fade nav-hide' id='" + "mycsttab" + sn1Stock_72_obj + "' role='tabpanel' aria-labelledby='" + "mycsttab" + sn1Stock_72_obj + "'>" + sn1Stock_72_id + " </div>";
	$('#notDeliverin72h_ul').append(nav_tabs_72);
	$('#notDeliverin72h_tab_content').append(navbody_72);

	if (sn1Stock_72_obj != 0 || sn1Stock_72_obj == undefined) {
		this.$("#li" + sn1Stock_72_obj).show();
		this.$("#mycsttab" + sn1Stock_72_obj).show();
		Contractor_details_72_dealy(sn1Stock_72_obj, sn1Stock_72_id, sn1Cluster_72_id, btnval_72);
	}
	else {
		this.$("#li" + sn1Stock_72_obj).hide();
		return;
	}
}



var Contractor_details_table_body_72 = [];
function Contractor_details_72_dealy(sn1_Contractor_obj_72, sn1_Contractor_Stock_id_72, sn1_Contractor_Clust_id_72 ,mtmid_con) {
	$('#loading-wrapper').show();

	var distr_cou_Contractor_72 = $("#Loadistricts").find("option:selected").val()
	var obj = "{P_type: '4',P_district_id:'" + distr_cou_Contractor_72 + "',P_cluster_id:'" + sn1_Contractor_Clust_id_72 + "',P_stockyard_id:'" + sn1_Contractor_Stock_id_72+"',P_permit_quantity:'" + mtmid_con + "'}";
	_Sand_Auth("../SandTransportReports_72Hours_Route", obj, function (res) {
		console.log(res);
		Contractor_details_table_body_72 = '<table id="dt_table_Contracotr_details_table_body_72" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:8%">Order ID</th>  <th  style="width: 10%;">Transaction ID</th> <th  style="width: 8%;">Customer ID</th><th  style="width: 8%;">Customer Name</th><th  style="width: 8%;">Mobile</th><th  style="width: 8%;">Address</th> <th  style="width: 8%;">Delayed Days</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {

			console.log(res);
			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				
				Contractor_details_table_body_72 += "<tr><td >" + obj.ORDER_ID + "</td><td>" + obj.TRANSACTION_ID + "</td><td >" + obj.CUSTOMER_ID + "</td> <td >" + obj.CUSTOMER_NAME + "</td><td >" + obj.CUSTOMER_MOBILE + "</td><td title='" + obj.ADDRESS + "' >" + obj.ADDRESS1 + "..." + "</td><td style='text-align: center;'>" + obj.DELAY_DAYS + "</td></tr>";
			}

			$("#mycsttab" + sn1_Contractor_obj_72).html(Contractor_details_table_body_72 + '<tbody><table>');
			$('#loading-wrapper').hide();

		}
		else {
			$('#loading-wrapper').hide();
			$("#mycsttab" + sn1_Contractor_obj_72).html('No data Fountd');
		}


	});
}






function closebtn(sn1) {
	if (sn1 != 0 || sn1 == undefined) {
		this.$("#li" + sn1).remove('');
		this.$("#mycsttab" + sn1).remove('');

		this.$("#chinturmandal-tab").show();

	} else {

		this.$("#li" + sn1).show();
		this.$("#mycsttab" + sn1).show();
		

	}

}





function load_per_hourdisplay(disthourdisp) {

	var obj = "{FTYPE:'5',FDISTRICT:'" + disthourdisp + "',FROMDATE:'',TODATE:'',FSANDQUANTY:'',fcluster_id:'',fstockyard_id:''}";
	_Sand_Auth("../PerhourDisplay_route", obj, function (res) {


		tableperhourDisplay = '<table id="dt_table_perhourtable" class="table"><thead style="font-size:14px;"> <tr class="text-left"> <th style="width:7%">Time in Hours</th> <th style="width: 8%;">District</th> <th  style="width: 4%;">Pushed Request</th> <th  style="width: 5%;">Accepted Request</th> <th  style="width: 2%;">Tractor</th> <th  style="width: 2%;">6 Tyre</th> <th  style="width: 1%;">10 Tyre</th> </tr> </thead> </thead><tbody>';

		if (res.Code == "100") {

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				tableperhourDisplay += "<tr><td> " + obj.HR + "</td><td>" + obj.DISTRICT + "</td><td style='text-align:center'>" + obj.TOTAL_ALLOCATED + "</td><td style='text-align:center'>" + obj.TOTAL_ACCEPTED + "</td><td style='text-align:center'>" + obj.TRACTOR + "</td><td style='text-align:center'>" + obj.SIXTYRE + "</td><td style='text-align:center'>" + obj.TENTYRE + "</td></tr>";
			}

			if (disthourdisp == '1') {							  
				$("#prehour_datatable").html(tableperhourDisplay + '<tbody><table>');
				$("#prehour_datatable tr:contains('EAST')").css("background-color", "#d8d2d2a8");
				$("#prehour_datatable tr:contains('KADAPA')").css("background-color", "#d8d2d2a8");
				$("#prehour_datatable tr:contains('NELLORE')").css("background-color", "#d8d2d2a8");
				$("#prehour_datatable tr:contains('SRIKAKULAM')").css("background-color", "#d8d2d2a8");
				$("#prehour_datatable tr:contains('VISAKHAPATANAM')").css("background-color", "#d8d2d2a8");
				$("#prehour_datatable tr:contains('GODAVARI')").css("background-color", "#d8d2d2a8");
			}
			else {
				$("#prehour_datatable").html(tableperhourDisplay + '<tbody><table>');
			}

			
		}
		else {
			$("#prehour_datatable").html('No Data Found');
		}
	});

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

function perhourchangefunc(p_hour,distrperhour) {

	var obj = "{FTYPE:'6',FDISTRICT:'" + distrperhour + "',FROMDATE:'',TODATE:'',FSANDQUANTY:'" + p_hour + "',fcluster_id:'',fstockyard_id:''}";
	_Sand_Auth("../PerhourDisplay_hour_route", obj, function (res) {

		
		if (res.Code == "100") {
			$('#TOTAL_ALLOCATED_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ALLOCATED, duration: 3000 });
			$('#TOTAL_ACCEPTED_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TOTAL_ACCEPTED, duration: 3000 });
			$('#TRACTOR_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TRACTOR, duration: 3000 });
			$('#SIXTYRE_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].SIXTYRE, duration: 3000 });
			$('#TENTYRE_per_h').jQuerySimpleCounter({ end: res.DailyRepDetsli[0].TENTYRE, duration: 3000 });
		}
		else {
			$('#TOTAL_ALLOCATED_per_h').text("0");
			$('#TOTAL_ACCEPTED_per_h').text("0");
			$('#TRACTOR_per_h').text("0");
			$('#SIXTYRE_per_h').text("0");
			$('#TENTYRE_per_h').text("0");
		}
	});

}
		  

var vehmts = [];
var veh_navbody = [];
var veh_navtabs = [];
var vehicle_cluster_tablebody = [];
var veh_details = [];
var veh_Obj = [];

function load_Vehicle_panel(vehicleMT) {

	$('#lobipanel_custom_control_Vehicle').lobiPanel();
	vehmts = vehicleMT;
	if (vehmts == 0 || vehmts == undefined) {
	}
	else if (vehmts == '4.5') {
		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-primary dropdown-head');
		$('#vehicle_register_show').show();
		veh_Obj = 'vehTractor';
		$("#Vtyre_veh_id").val("Tractors");
		load_cluster_for_vehicle(vehmts);
		
	}
	else if (vehmts == '10') {

		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-success dropdown-head');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh10Tyre';
		load_cluster_for_vehicle(vehmts);
		$("#Vtyre_veh_id").val("6 Tyre Vehicles");
	}
	else if (vehmts == '18') {
		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-danger dropdown-head');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh18Tyre';
		$("#Vtyre_veh_id").val("10 Tyre Vehicles");
		load_cluster_for_vehicle(vehmts);
		
	}
	else if (vehmts == '24') {
		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-warning dropdown-head');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh24Tyre';
		$("#Vtyre_veh_id").val("12 Tyre Vehicles");
		load_cluster_for_vehicle(vehmts);
	}	
	else if (vehmts == '30') {
		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('icon-bg bg-secondary dropdown-head');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh30Tyre';
		$("#Vtyre_veh_id").val("14 Tyre Vehicles");
		load_cluster_for_vehicle(vehmts);
	}
	else if (vehmts == '22') {
		$("#veh_headcolor").removeClass();
		$("#veh_headcolor").addClass('card-header icon-bg bg-white dropdown-head text-dark');
		$("#vehicle_register_show").delay(500).show();
		veh_Obj = 'veh22Tyre';
		$("#Vtyre_veh_id").val("Total Vehicles");
		load_cluster_for_vehicle(vehmts);
	}
	else {
		//$('#vehicle_register_show').hide();
	}
}



function load_cluster_for_vehicle(id) {
var obj = "{FTYPE:'31',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + id + "'}";
	_Sand_Auth("../get_contractor_details", obj, function (res) {

		if (res.Code == "100") {
			vehicle_cluster_tablebody = '<table id="dt_table_vehicle_cluster" class="table text-left"><thead style="font-size:14px;"><tr class="text-left"><th class="pt-0" style="width:2%">CLUSTER ID</th><th class="pt-0" style="width:3%;">CLUSTER NAME</th><th class="pt-0" style="width:3%;">NO OF VEHICLES </th></tr ></thead ><tbody>';

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				vehicle_cluster_tablebody += "<tr style='font-size:12px;'><td onClick=load_cluster_for_vehicle_info('" + obj.CLUSTER_ID + veh_Obj + "','" + obj.CLUSTER_ID + "') <a style='color: #33af65;font-weight: bold; text-decoration: underline;font-size:12px;'>" + obj.CLUSTER_ID + "</a></td ><td  >" + (obj.CLUSTER_NAME).replace('_', ' ') + "</td ><td ><label>" + obj.NO_OF_VEHICLES + "</label></td></tr>";
			}
			cluster_for_vehicle(vehicle_cluster_tablebody);
		}
		else {
			$('#tbl_cluster_vehicledata').html('');
		}
	});
}
function cluster_for_vehicle(tabledata) {
	$('#tbl_cluster_vehicledata').html(tabledata + '<tbody><table>');
}
function load_cluster_for_vehicle_info(veh_cust_id, veh_obj) {
	veh_navtabs += "<li class='nav-item nav-hide' id='" + "veh_li" + veh_cust_id + "' style='display:none;' ><a class='nav-link' id='" + "veh_lia" + veh_cust_id + "' data-toggle='tab' href='" + "#veh_mycsttab" + veh_cust_id + "' role='tab' aria-controls='" + "veh_mycsttab" + veh_cust_id + "' aria-selected='false'>" + veh_obj + "<button class='align-btn' style='border:none;' id='" + "veh_btn" + veh_cust_id + "' onClick=closebtn_veh('" + veh_cust_id + "') ><i class='mdi mdi-close-circle'></i></button></a></li>";
	veh_navbody += "<div class='tab-pane fade nav-hide' id='" + "veh_mycsttab" + veh_cust_id + "' role='tabpanel' aria-labelledby='" + "veh_mycsttab" + veh_cust_id + "'>" + veh_obj + " </div>";
	$('#myvehicletabs').append(veh_navtabs);
	$('#mytabcontent_vehicle').append(veh_navbody);

	if (veh_cust_id != 0 || veh_cust_id == undefined) {
		this.$("#veh_li" + veh_cust_id).show();
		this.$("#veh_mycsttab" + veh_cust_id).show();
		veh_details_data(veh_cust_id, veh_obj, vehmts);
	}
	else {
		return;
	}


}


function veh_details_data(vehd_custid, veh_objs, mt) {

	var obj = "{FTYPE:'7',FDISTRICT:'" + $("#Loadistricts").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',FSANDQUANTY:'" + mt + "',fcluster_id:'" + veh_objs + "',fstockyard_id:'',fcontractor_id:''}";

	_Sand_Auth("../SandTransportReportsapi_Stockyard", obj, function (res) {


		veh_details = '<table id="dt_table_vehicle" class="table"><thead style="font-size:13px;"> <tr class="text-left"> <th style="width: 13%;">CONTRACTOR ID</th> <th  style="width: 10%;">CONTRACTOR MOBILE </th> <th  style="width: 8%;">CONTRACTOR NAME</th> <th  style="width: 2%;">VEHICLE NO</th> </tr> </thead> </thead><tbody>';
		if (res.Code == "100") {


			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;

				veh_details += "<tr><td><a style='color: #33af65;font-weight: bold; text-decoration: underline;font-size:12px;' >" + obj.CONTRACTOR_ID + "  </a></td><td><a>" + obj.CONTRACTOR_MOBILE + " </a></td><td><a>" + obj.CONTRACTOR_NAME + "</a></td><td style='text-align:center'>" + obj.VEHICLE_NO + "</td></tr>";


			}
			$("#veh_mycsttab" + vehd_custid).html(veh_details + '<tbody><table>');

		}
	});
}

function closebtn_veh(sn1_veh) {
	if (sn1_veh != 0 || sn1_veh == undefined) {
		this.$("#veh_li" + sn1_veh).remove('');
		this.$("#veh_mycsttab" + sn1_veh).remove('');
	} else {

		this.$("#veh_li" + sn1_veh).show();
		this.$("#veh_mycsttab" + sn1_veh).show();
	}


}




$("#icloseVehicle").click(function () {
	$('#vehicle_register_show').hide();
});
$("#icloseContractor").click(function () {
	$('#ContractorDetails_show').hide();
});



//vechile data search

var contractor_clustervehicle_tablebody_POP = [];
function load_cluster_for_vechiledatasearch(id) {
	$('#veh_search_data_table_inPopup').html('');
	var obj = "{FTYPE:'1',FDISTRICT:'',FROMDATE:'',TODATE:'',Vehnumber:'" + id + "'}";
	_Sand_Auth("../SandTransportReports_VehilceSearch_Route", obj, function (res) {

		if (res.Code == "100") {
			console.log(res);
			contractor_clustervehicle_tablebody_POP = '<table id="dt_table_veh_search" class="table"><thead style="font-size:14px;"> <tr class="text-left" > <th style="width:11% !important;;">CONTRACTOR NAME</th> <th style="width:9% !important;;">MOBILE NUMBER</th><th style="width:11% !important;; ">VEHICLE NO</th> <th style="width:8% !important;">VEHICLE QTY</th> <th style="width:8% !important;">GPS STATUS</th> <th style="width:8% !important;">DISTRICT</th> </thead> </thead><tbody>';

			for (var index = 0; index < res.DailyRepDetsli.length; index++) {

				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				contractor_clustervehicle_tablebody_POP += "<tr><td><a>" + obj.CONTRACTOR_NAME + " </a></td><td><a>" + obj.MOBILE_NUMBER + "</a></td><td>" + obj.VEHICLE_NO + "</td><td>" + obj.VEHICLE_QTY + "</td><td style='text-align:left'>" + obj.GPS_STATUS + "</td><td style='text-align:left'>" + obj.DISTRICT + "</td></tr>";
			}


			$('#veh_search_data_table_inPopup').html(contractor_clustervehicle_tablebody_POP + '<tbody><table>');
			
		}
		else {
			$('#veh_search_data_table_inPopup').html('No data found');
		}
	});
}

$("#btn_submit_vehicle").click(function () {
	var textValue = $("#txt_veh_number").val();
	load_cluster_for_vechiledatasearch(textValue);
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
function load_DailyReports_for_db(distid,fm,tm,distText) {
	$('#dailyReport_db').html('');
//	$(".tabledob").dateFormat('dd/mm/yy');
	var obj = "{FDISTRICT:'" + distid + "',FROMDATE:'" + fm +"',TODATE:'"+tm+"'}";
	_Sand_Auth("../GET_deliveryreportRoute", obj, function (res) {
		if (res.Code == "100") {
			console.log(res);
			$("#excelXtraLarge").show();
			$("#pdfXtraLarge").show();
			DailyReports_for_db_table_body = "<table  id='dt_table_DailyReports' class='table'><thead style='font-size:10px;'><tr> <th colspan='27' style='text-align:center'>" + distText + " " +" Door Delivery Report</th> </tr> <tr> <th rowspan='3' style='text-align:center'>Date</th> <th colspan='6' style='text-align:center'>10 Tyre Lorry</th> <th colspan='6' style='text-align:center'>6 Tyre Lorry</th> <th colspan='6' style='text-align:center'>Tractors</th> <th colspan='8' style='text-align:center'> Total</th> </tr> <tr> <th colspan='2'>Dispatched</th> <th colspan='2' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Total</th> <th colspan='2'>Dispatched</th> <th colspan='2' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Total</th> <th colspan='2'>Dispatched</th> <th colspan='2' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Total</th> <th colspan='3'>Dispatched</th> <th colspan='3' style='color:red;'>Yet To Dispatch</th> <th colspan='2'>Grand Total</th> </tr> <tr style='font-size:8px;'> <th>No.Of Orders</th> <th>Booked Qty</th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th> <th>No.Of Orders</th> <th>Booked Qty</th><th>% Qty </th> <th style='color:red;'>No.Of Orders</th> <th style='color:red;'>Booked Qty</th><th style='color:red;'>% Qty </th> <th>No.Of Orders</th> <th>Booked Qty</th> </tr></thead><tbody>";
			
			for (var index = 0; index < res.DailyRepDetsli.length; index++) {
				var obj = res.DailyRepDetsli[index];
				var counter = index + 1;
				
				DailyReports_for_db_table_body += "<tr style='font-size:8px;'><td ><a>" + obj.BOOKED_DATE + " </a></td><td> " + obj.R_10TYRE_D_BOOKED_QTY + "</td> <td>" + obj.R_10TYRE_D_NO_OF_ORDERS + "</td> <td style='color:red;'>" + obj.R_10TYRE_Y_BOOKED_QTY + "</td> <td style='color:red;'>" + obj.R_10TYRE_Y_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.R_10TYRE_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.R_10TYRE_T_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.R_6TYRE_D_BOOKED_QTY + "</td> <td>" + obj.R_6TYRE_D_NO_OF_ORDERS + "</td> <td style='color:red;'>" + obj.R_6TYRE_Y_BOOKED_QTY + "</td> <td style='color:red;'>" + obj.R_6TYRE_Y_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.R_6TYRE_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.R_6TYRE_T_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.TRACTOR_D_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TRACTOR_D_NO_OF_ORDERS + "</td> <td  style='color:red;'>" + obj.TRACTOR_Y_BOOKED_QTY + "</td> <td  style='color:red;'>" + obj.TRACTOR_Y_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.TRACTOR_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TRACTOR_T_NO_OF_ORDERS + "</td> <td style='text-align:left'>" + obj.TOTAL_D_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TOTAL_D_NO_OF_ORDERS + "</td><td style='text-align:left'>" + obj.TOTAL_D_PER_QTY + "</td> <td  style='color:red;'>" + obj.TOTAL_Y_BOOKED_QTY + "</td> <td  style='color:red;'>" + obj.TOTAL_Y_NO_OF_ORDERS + "</td><td  style='color:red;'>" + obj.TOTAL_Y_PER_QTY + "</td> <td style='text-align:left'>" + obj.TOTAL_T_BOOKED_QTY + "</td> <td style='text-align:left'>" + obj.TOTAL_T_NO_OF_ORDERS + "</td></tr > ";
			}
			$('#dailyReport_db').html(DailyReports_for_db_table_body + '<tbody><table>');			
		}
		else {
			$("#excelXtraLarge").hide();
			$("#pdfXtraLarge").hide();
			$('#dailyReport_db').html('No data found');
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






	$("#excelXtraLarge").hide();
	$("#pdfXtraLarge").hide();

});
