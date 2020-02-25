var table = null;
var url = null;


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
	districttrips();
	load_Counters_display();

	$('#sandtbldr').hide();

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






$(function () {

	$("#SandDistrict_dd").change(function () {

		//load_Counters();
		$('#sandtbldr').dataTable().fnClearTable();
		$('#sandtbldr').hide();
		$('#sandtbldr_wrapper').hide();
		$('#sandtbldr_filter').hide();
		$('#Stockyardid_dd').empty();
		$('#Stockyardid_dd').append('<option value=0>-Select Stock Yard-</option>');
		if ($("#SandDistrict_dd").val() == "0") {
			$('#Clusteridid_dd').empty();
			$('#Clusteridid_dd').append('<option value=0>Select Cluster</option>');

			_n_plain_mes_1("<strong>alert!</strong>", "Select District", "warning"); $("#SandDistrict").focus(); return;
		}

		else {
			if ($("#SandDistrict_dd").val() != "0") {
				//$('#sandtbldr').empty();

				clusterlist_dd();
				load_Counters_display();
			}
			else {
				alert('No Data Found');
			}
		}
	});


	$("#Clusteridid_dd").change(function () {
		$('#sandtbldr').dataTable().fnClearTable();
		$('#sandtbldr').hide();
		$('#sandtbldr_wrapper').hide();
		$('#sandtbldr_filter').hide();
		if ($("#SandDistrict_dd").val() == "0" && $("#Clusteridid_dd").val() == "0") {
			$('#Stockyardid_dd').empty();
			$('#Stockyardid_dd').append('<option value=0>Select Stockyard</option>');

			_n_plain_mes_1("<strong>alert!</strong>", "Select District", "warning"); $("#SandDistrict_dd").focus(); return;
		}

		else if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() != "0") {
			stockyardlist_trips();
			load_Counters_display();
		}
		else {
			alert('No Data Found');
		}
	});
	$("#Stockyardid_dd").change(function () {

		$('#sandtbldr').dataTable().fnClearTable();
		$('#sandtbldr').hide();
		$('#sandtbldr_wrapper').hide();
		$('#sandtbldr_filter').hide();
		if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() != "0" && $("#Stockyardid_dd").val() != "0") {

			load_Counters_display();
		}
	});

});


$('#to_datepicker').datepicker({
	constrainInput: "true",
	dateFormat: "dd/mm/yy",
	changeMonth: true,
	changeYear: true,
	maxDate: 0,
	onSelect: function (date) {

		

		$('#sandtbldr').dataTable().fnClearTable();
		$('#sandtbldr').hide();
		$('#sandtbldr_wrapper').hide();
		$('#sandtbldr_filter').hide();
		load_Counters_display();

	}
});
$('#from_datepicker').datepicker({
	constrainInput: "true",
	dateFormat: "dd/mm/yy",
	changeMonth: true,
	changeYear: true,
	maxDate: 0,
	onSelect: function (date) {

		$('#sandtbldr').dataTable().fnClearTable();
		$('#sandtbldr').hide();
		$('#sandtbldr_wrapper').hide();
		$('#sandtbldr_filter').hide();
		load_Counters_display();
	}
});


function load_Counters_display() {
	var dist = $("#SandDistrict_dd").find("option:selected").val();
	if (dist == '0') {
		dist = '1';
	}

	var obj = "{FTYPE: '12',FDISTRICT:'" + dist + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "',Fclusterid:'" + $("#Clusteridid_dd").val() + "',STOCKYARD_ID:'" + $("#Stockyardid_dd").val() + "'}";

	_Sand_Auth("../Tripsdoordelivery_Route", obj, function (res) {
		console.log(res);

		if (res.code == "100") {

		    $('#totaltrips').jQuerySimpleCounter({ end: res.dailyRepDetsli[0].TOTAL_TRANSACTIONS, duration: 3000 });
		    $('#totaltrips_cum').jQuerySimpleCounter({ end: res.dailyRepDetsli[0].TOTAL_TRANSACTIONS_CUM, duration: 3000 });
		    $('#trips_completed').jQuerySimpleCounter({ end: res.dailyRepDetsli[0].TRIP_COMPLETED, duration: 3000 });
		    $('#trips_completed_cum').jQuerySimpleCounter({ end: res.dailyRepDetsli[0].TRIP_COMPLETED_CUM, duration: 3000 });
		    $('#trips_not_completed').jQuerySimpleCounter({ end: res.dailyRepDetsli[0].TRIP_NOT_COMPLETED, duration: 3000 });
		    $('#trips_not_completed_cum').jQuerySimpleCounter({ end: res.dailyRepDetsli[0].TRIP_NOT_COMPLETED_CUM, duration: 3000 });
		    $('#total_evaluated').jQuerySimpleCounter({ end: res.dailyRepDetsli[0].UPDATED_COUNT, duration: 3000 });

		}
		else {

			$('#totaltrips').text("0");
			$('#totaltrips_cum').text("0");
			$('#trips_completed').text("0");
			$('#trips_completed_cum').text("0");
			$('#trips_not_completed').text("0");
			$('#trips_not_completed_cum').text("0");
			$('#total_evaluated').text("0");



		}
	});
}


function bindAlldistricts() {
	//$('#sandtbldr').find('td').remove();
	$('#preloader').show();
	var obj = "{FTYPE:'" + ftype + "',FDISTRICT:'1',Fclusterid:'" + $("#Clusteridid_dd").find("option:selected").val() + "',STOCKYARD_ID:'" + $("#Stockyardid_dd").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "'}";

	_Sand_Auth("../Tripsdoordelivery_Route", obj, function (res) {
		if (res.code == "100") {

			$('#sandtbldr').show();

			$('#sandtbldr').dataTable().fnClearTable();
			$('#sandtbldr').DataTable({
				aLengthMenu: [
					[100, 200, 300, 400, -1],
					[100, 200, 300, 400, "All"]
				],
				pageLength: 10,
				destroy: true,
				stateSave: true,
				bPagenate: true,
				footer: true,
				data: res.dailyRepDetsli,
				dom: 'Bfrtip',
				buttons: [
					{

					},
				],

				columns: [
					//s['TRANSACTION_ID'];
					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['TRANSACTION_ID'];
						}
					},
					{
						"mData": null,
						"mRender": function (data, type, s) {
							//return s[onclick = 'TRANSACTION_ID'];
							return "<button id='" + s['CUSTOMER_NAME'] + "^" + s['E_Grievance_reason'] + "' title='" + s['CUSTOMER_NAME'] + "' type='button' onclick='custmerdetailsf(this);' class='btn btn-sm btn-link'>" + s['CUSTOMER_NAME'] + "</button>";
						}
					},



					{


						"mData": null,
						"mRender": function (data, type, s) {
							//return s['TRANSIT_ID'];
							return "<button id='" + s['CUSTOMER_NAME'] + "' type='button' onclick='transportdetailsf(this);' class='btn btn-sm btn-link'>" + s['CONTRACTOR_NAME'] + "</button>";
						}
					},


					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['DISTANCE'];
						}
					},

					{
						"mData": null,
						"mRender": function (data, type, s) {

							return s['ACT_DISTANCE'];
						}
					},
					{
						"mData": null,
						"mRender": function (data, type, s) {

							return s['CAPTUERDATETIME'];
						}
					},
					{


						"mData": null,
						"mRender": function (data, type, s) {
							//return s['TRANSIT_ID'];
							return "<button id='" + s['TRANSIT_ID'] + "' type='button' onclick='transitid(this);' class='btn btn-sm btn-link'>" + s['TRANSIT_ID'] + "</button>";
							//return "<a id='" + s['TRANSIT_ID'] + "' href='vts.aspx?id='" + s['TRANSIT_ID'] + " '' class='btn btn-sm btn-link' target='_blank' >" + s['TRANSIT_ID'] + "</a>";
						}
					},

					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['RECH_DES_STATUS'];
						}
					}



				]

			});
			$('#preloader').hide();
		}
		else {
			$('dt - button buttons - excel buttons - html5').hide();
			$('#sandtbl').dataTable().fnClearTable();


			$('#preloader').hide();
			alert('No Data Found');
		}
	});

}
function Detaildoordeliverytrip(ftype) {

	//$('#sandtbldr').find('td').remove();
	$('#loading-wrapper').show();

	var dist = $("#SandDistrict_dd").find("option:selected").val();
	if (dist == '0') {
		dist = '1';
	}
	var obj = "{FTYPE:'" + ftype + "',FDISTRICT:'" + $("#SandDistrict_dd").find("option:selected").val() + "',Fclusterid:'" + $("#Clusteridid_dd").find("option:selected").val() + "',STOCKYARD_ID:'" + $("#Stockyardid_dd").find("option:selected").val() + "',FROMDATE:'" + $("#from_datepicker").val() + "',TODATE:'" + $("#to_datepicker").val() + "'}";

	_Sand_Auth("../Tripsdoordelivery_Route", obj, function (res) {
		if (res.code == "100") {

			$('#sandtbldr').show();

			$('#sandtbldr').dataTable().fnClearTable();
			$('#sandtbldr').DataTable({
				aLengthMenu: [
					[100, 200, 300, 400, -1],
					[100, 200, 300, 400, "All"]
				],
				pageLength: 10,
				destroy: true,
				stateSave: true,
				bPagenate: true,
				footer: true,
				data: res.dailyRepDetsli,
				dom: 'Bfrtip',
				buttons: [
					{

					},
				],

				columns: [
					//s['TRANSACTION_ID'];
					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['TRANSACTION_ID'];
						}
					},
					{
						"mData": null,
						"mRender": function (data, type, s) {
							//return s[onclick = 'TRANSACTION_ID'];
							return "<a id='" + s['CUSTOMER_NAME'] + "^" + s['E_Grievance_reason'] + "' title='" + s['CUSTOMER_NAME'] + "'  onclick='custmerdetailsf(this);' style='text-align:left;color:#0a6ee5;'>" + s['CUSTOMER_NAME'] + "</a>";
						}
					},



					{


						"mData": null,
						"mRender": function (data, type, s) {
							//return s['TRANSIT_ID'];
							return "<a id='" + s['CUSTOMER_NAME'] + "^" + s['E_Grievance_reason'] + "' title='" + s['CONTRACTOR_NAME'] + "'  onclick='transportdetailsf(this);'  style='text-align:left;color:#0a6ee5;'>" + s['CONTRACTOR_NAME'] + "</a>";
						}
					},


					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['DISTANCE'];
						}
					},

					{
						"mData": null,
						"mRender": function (data, type, s) {

							return s['ACT_DISTANCE'];
						}
					},
					{
						"mData": null,
						"mRender": function (data, type, s) {

							return s['CAPTUERDATETIME'];
						}
					},
					{


						"mData": null,
						"mRender": function (data, type, s) {
							//return s['TRANSIT_ID'];
							return "<a id='" + s['TRANSIT_ID'] + "^" + s['DISTRICT'] + "^" + s['STOCKYARD_NAME'] + "^" + s['ADDRESS'] + "^" + s['VEHICLE_NO'] + "^" + s['DRIVER_NAME'] + "^" + s['DRIVER_MOBILENUMBER'] + "^" + s['CUSTOMER_NAME'] + "^" + s['ACT_DISTANCE'] + "^" + s['DISTANCE'] + "'  onclick='transitid(this);' style='text-align:left;color:#0a6ee5;' >" + s['TRANSIT_ID'] + "</a>";
						}
					},

					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['RECH_DES_STATUS'];
						}
					},

					{


						"mData": null,
						"mRender": function (data, type, s) {
							//return s['TRANSIT_ID'];
							return "<a id='update' onclick='Updatestatus(this);' style='background-color:green;color:white;' >UpdateStatus</a>";
						}
					}

				]

			});
			$('#loading-wrapper').hide();
		}
		else {
			$('dt - button buttons - excel buttons - html5').hide();
				$('#loading-wrapper').hide();
			$('#sandtbldr').dataTable().fnClearTable();
			$('#sandtbldr').hide();
			$('#sandtbldr_wrapper').hide();
			$('#sandtbldr_filter').hide();
			alert('No Data Found');
			//$('#sandtbl').dataTable().clear();
			//$('#preloader').hide();

		}
	});

}

function custmerdetails(ftype) {
	var id = ob.id.split('^');
	$('.bgoverlay').css('display', ''); $('.bgoverlay').css('display', 'none');

	var obj = "{FTYPE:'" + ftype + "',FDISTRICT:'" + $("#SandDistrict").find("option:selected").val() + "',Fclusterid:'" + $("#SandDistrict").find("option:selected").val() + "',STOCKYARD_ID:'" + $("#SandDistrict").find("option:selected").val() + "'}";
	_Sand_Auth("../Tripsdoordelivery_Route", obj, function (res) {
		if (res.code == "100") {
			$('#sandtbldis').dataTable().fnClearTable();
			$('#sandtbldis').DataTable({
				aLengthMenu: [
					[100, 200, 300, 400, -1],
					[100, 200, 300, 400, "All"]
				],
				destroy: true,
				data: res.dailyRepDetsli,
				columns: [
					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['CUSTOMER_MOBILE'];
						}
					},


					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['CUSTOMER_NAME'];
						}
					},


					{

						"mData": null,
						"mRender": function (data, type, s) {
							return s['ADDRESS'];
						}
					}



				]

			});
		}
		else {
			$('#sandtbldis').dataTable().fnClearTable();
		}
	});
}
function transportdetails(ftype) {

	$('.bgoverlay').css('display', ''); $('.bgoverlay').css('display', 'none');

	var obj = "{FTYPE:'" + ftype + "',FDISTRICT:'" + $("#SandDistrict").find("option:selected").val() + "',Fclusterid:'" + $("#SandDistrict").find("option:selected").val() + "',STOCKYARD_ID:'" + $("#SandDistrict").find("option:selected").val() + "'}";
	_Sand_Auth("../Tripsdoordelivery_Route", obj, function (res) {
		if (res.code == "100") {
			$('#sandtbldisiv').dataTable().fnClearTable();
			$('#sandtbldisiv').DataTable({
				aLengthMenu: [
					[100, 200, 300, 400, -1],
					[100, 200, 300, 400, "All"]
				],
				destroy: true,
				data: res.dailyRepDetsli,
				columns: [
					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['CONTRACTOR_MOBILE'];
						}
					},


					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['CONTRACTOR_NAME'];
						}
					},


					{

						"mData": null,
						"mRender": function (data, type, s) {
							return s['VEHICLE_NO'];
						}
					},
					{

						"mData": null,
						"mRender": function (data, type, s) {
							return s['DRIVER_NAME'];
						}
					},

					{
						"mData": null,
						"mRender": function (data, type, s) {
							return s['DRIVER_MOBILENUMBER'];
						}
					}




				]

			});
		}
		else {
			$('#sandtbldis').dataTable().fnClearTable();
		}
	});
}

var savedata = [];
function Updatestatus() {

	//$('.bgoverlay').css('display', '');

	table = $('#sandtbldr').DataTable();
	$('#sandtbldr tbody').on('click', 'tr', function () {
		console.log(table.row(this).data());
		var tbldata1 = table.row(this).data();

		$("#transit_id").text(tbldata1.TRANSIT_ID);

	});

	$("#showupdate").modal('show');
}

$(function () {
	$("#Update_status").click(function () {

		var obj = "{FTYPE:'1',Remarks:'" + $("#remarks").val() + "',status:'" + $("#status").find("option:selected").text() + "',P_transactionid:'" + $("#transit_id").text() + "'}";

		_Sand_Auth("../Tripsdoordelivery_Update_Status_Route", obj, function (res) {
			console.log(res);
			if (res.code == "100") {
				alert('Updated Successfully');
				load_Counters_display();
				if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() == "0" && $("#Stockyardid_dd").val() == "0") {


					Detaildoordeliverytrip('9')

				}
				if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() != "0" && $("#Stockyardid_dd").val() == "0") {


					Detaildoordeliverytrip('10')

				}
				if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() != "0" && $("#Stockyardid_dd").val() != "0") {

					Detaildoordeliverytrip('11')

				}
			}
			else {

				alert('Updation Failed');
			}
		});

	});

});


function transitid(obj) {


	if (obj != null) {

		url = "../DdTripstatus_gis.html?" + obj.id;
		window.open(url, '_blank');
	}
	else {
		return;
	}


}




function custmerdetailsf() {

	//$('.bgoverlay').css('display', '');

	table = $('#sandtbldr').DataTable();
	$('#sandtbldr tbody').on('click', 'tr', function () {
		console.log(table.row(this).data());
		var tbldata = table.row(this).data();

		$("#mobile_no").text(tbldata.CUSTOMER_MOBILE);
		$("#name").text(tbldata.CUSTOMER_NAME);
		$("#address").text(tbldata.ADDRESS);
		$("#stock_yard").text(tbldata.STOCKYARD_NAME);
		$("#alt_mobile_no").text(tbldata.ALT_MOBILE);
	});

	$("#showalerts3td").modal('show');
}
function transportdetailsf() {
	//$('.bgoverlay').css('display', '');


	table = $('#sandtbldr').DataTable();
	$('#sandtbldr tbody').on('click', 'tr', function () {
		// console.log(table.row(this).data());
		var tbldata = table.row(this).data();

		//$("#mobile_no_dd").text(tbldata.CUSTOMER_MOBILE);
		//$("#name_dd").text(tbldata.CUSTOMER_NAME);
		$("#con_name_dd").text(tbldata.CONTRACTOR_NAME);
		$("#con_mobile_no_dd").text(tbldata.CONTRACTOR_MOBILE);
		$("#con_alt_mobile_no_dd").text(tbldata.CONTRACTOR_ALTERNATE);
		$("#vehicle_no").text(tbldata.VEHICLE_NO);
		$("#driver_name").text(tbldata.DRIVER_NAME);
		$("#driver_moible_no").text(tbldata.DRIVER_MOBILENUMBER);
		$("#allot_id").text(tbldata.ALLOTMENT_ID);

	});

	$("#showalerts3").modal('show');
}
function transportdetails(ob) {
	//$('.bgoverlay').css('display', '');
	$("#showalertsiv3").modal('show');
	if ($("#SandDistrict").val() != "0" && $("#Clusteridid").val() == "0" && $("#Stockyardid1").val() == "0") {


		transportdetails('9')

	}
	if ($("#SandDistrict").val() != "0" && $("#Clusteridid").val() != "0" && $("#Stockyardid1").val() == "0") {


		transportdetails('10')

	}
	if ($("#SandDistrict").val() != "0" && $("#Clusteridid").val() != "0" && $("#Stockyardid1").val() != "0") {

		transportdetails('11')

	}


}


$(function () {
	$("#getdata").click(function () {



		if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() == "0" && $("#Stockyardid_dd").val() == "0") {


			Detaildoordeliverytrip('9')

		}
		if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() != "0" && $("#Stockyardid_dd").val() == "0") {


			Detaildoordeliverytrip('10')

		}
		if ($("#SandDistrict_dd").val() != "0" && $("#Clusteridid_dd").val() != "0" && $("#Stockyardid_dd").val() != "0") {

			Detaildoordeliverytrip('11')

		}


	});

});
function districttrips() {
	var obj = "{FTYPE: '13',FDISTRICT:''}";

	_Sand_Auth("../Districts", obj, function (res) {

		if (res.Code == "100") {
			$('#SandDistrict_dd').append('<option value=1>All</option>');
			$.each(res.Distli, function (index, value) {
				$('#SandDistrict_dd').append('<option value="' + value.District_code + '">' + value.District_name + '</option>');
			});
			$('#SandDistrict_dd').prop('selectedIndex', 1);
		}
		else {

			$('#SandDistrict_dd').empty();
			$('#SandDistrict_dd').append('<option value=0>Select District</option>');
		}
	});
}

function stockyardlist_trips() {
	var obj = "{FTYPE:'8',FDISTRICT:'" + $("#SandDistrict_dd").val() + "',FSTOCKYARDID:'" + $("#Clusteridid_dd").val() + "'}";
	_Sand_Auth("../APMDC_SP_GET_STOCKYARD_DETAILS_Route", obj, function (res) {
		$('#Stockyardid_dd').empty();
		$('#Stockyardid_dd').append('<option value=0>Select Stockyard</option>');
		if (res.Code == "100") {
			$.each(res.Tbl_Stockyard_Master_priceli, function (index, value) {
				$('#Stockyardid_dd').append('<option value="' + value.E_STOCKYARD_ID + '">' + value.E_Stockyard_Name + '</option>');
			});
		}
		else {
			$('#Stockyardid_dd').empty();
			$('#Stockyardid_dd').append('<option value=0>Select Stockyard</option>');
			alert("<strong>alert!</strong>", "Select District", "warning");
			$("#SandDistrict").focus(); return;
		}
	});
}
function clusterlist_dd() {
	var obj = "{FTYPE: '18',FDISTRICT:'" + $("#SandDistrict_dd").val() + "'}";
	_Sand_Auth("../APMDC_SP_GET_STOCKYARD_NAME_Route", obj, function (res) {

		console.log(res);
		if (res.code == "100") {

			$('#Clusteridid_dd').empty();
			$('#Clusteridid_dd').append('<option value=0>Select Cluster</option>');
			$.each(res.dailyRepDetsli, function (index, value) {
				$('#Clusteridid_dd').append('<option value="' + value.CLUSTER_ID + '">' + value.CLUSTER_NAME + '</option>');
			});
		}
		else {

			$('#Clusteridid_dd').empty();
			$('#Clusteridid_dd').append('<option value=0>Select Cluster</option>');
		}
	});
}

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