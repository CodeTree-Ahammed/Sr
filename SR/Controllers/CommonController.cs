using Newtonsoft.Json;
using SR.help;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SR.Controllers
{
    public class CommonController : ApiController
	{
		E_return EER = new E_return();
		Myvalid _valid = new Myvalid();
		[HttpPost]
		[Route("Districts")]
		public dynamic Districts(Load_district root)
		{
			try
			{
				return _valid.Check_get_districts(root);
			}
			catch (Exception)
			{
				return 0;
			}
		}


		/// <summary>
		/// this function is used to get the values from DB for sand today quantites and their cumalatives written by kumar reddy
		/// </summary>
		/// <param name="obj"> to pass object type districit and to date and from date</param>
		/// <returns></returns>
		[HttpPost]
		[Route("SandTransportReportsapi")]
		public dynamic SandTransportReportsapi(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_Get(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}

		[HttpPost]
		[Route("SandTransportReportsapi_Stockyard")]
		public dynamic SandTransportReportsapi_Stockyard(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_Get_Stockyard(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}

		[HttpPost]
		[Route("SandTransportReports_Get_for_total_orders")]
		public dynamic SandTransportReports_Get_for_total_orders(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_Get_for_total_orders_myvalid(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}


		[HttpPost]
		[Route("get_contractor_details")]
		public dynamic Get_contractor_details(Load_district root)
		{
			try
			{

				return _valid.Get_contractor_details(root);

			}
			catch (Exception)
			{
				return 0;
			}
		}

		[HttpPost]
		[Route("Load_Contarctor_Details_by_id_route")]
		public dynamic Load_Contarctor_Details_by_id_route(Load_district root)
		{
			try
			{

				return _valid.Load_Contarctor_Details_by_id_Valid(root);

			}
			catch (Exception ex)
			{
				E_return E_return = new E_return();
				E_return.Code = "99";
				E_return.Message = "something went wrong please contact admin" + ex.Message;
				E_return.Url = "Error.htm";
				return E_return;
			}
		}


		///Token Gen
		SR_Security _Security = new SR_Security(); SR_Valid valid = new SR_Valid();
		[HttpPost]
		[Route("gtsand")]
		public dynamic Gtsand(dynamic objrequest)
		{
			//E_return E_return = new E_return();
			var json = JsonConvert.SerializeObject(objrequest);
			dynamic obj = JsonConvert.DeserializeObject<ExpandoObject>(json);
			string root = valid.DecryptStringAES(obj.data);
			E_drop val = JsonConvert.DeserializeObject<E_drop>(root);
			try
			{
				EER.Code = _Security.OpenToken(val.REQUESTIP);
				return EER;

			}
			catch (Exception)
			{
				return EER;
			}
		}

		//captch gens

		[HttpPost]
		[Route("captchsand")]
		public dynamic Captchftr(Captch root)
		{
			try
			{

				return _Security.Check_s_captch(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "captchsand" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_E = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		//login controllers

		[HttpPost]
		[Route("LoginDasboard")]
		public dynamic LoginDasboard(E_Login root)
		{
			//Loginhtm
			try
			{
				return valid.Check_login(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "Login" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("gruserlogs")]
		public dynamic Gruserlogs(E_drop root)
		{
			try
			{

				return _valid.Check_get_userlogs(root);

			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "userlogs" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//	E_return E_return = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("PerhourDisplay_route")]
		public dynamic PerhourDisplay_route(Load_district root)
		{
			try
			{
				return _valid.PerhourDisplay_valid(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "userlogs" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//	E_return E_return = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("PerhourDisplay_hour_route")]
		public dynamic PerhourDisplay_hour_route(Load_district root)
		{
			try
			{
				return _valid.PerhourDisplay_hour_valid(root);
			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "userlogs" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//	E_return E_return = new E_return();
				EER.Code = "99";
				EER.Message = "something went wrong please contact admin";
				EER.Url = "Error.htm";
				return EER;
			}
		}

		[HttpPost]
		[Route("SandTransportReports_72Hours_Route")]
		public dynamic SandTransportReports_72Hours_Route(Load_district root)
		{
			try
			{

				return _valid.SandTransportReports_72Hours_valid(root);

			}
			catch (Exception)
			{
				//string logdata = JsonConvert.SerializeObject(root);
				//string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				//Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "TransportReport" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				//E_return E_return = new E_return();
				//E_return.code = "99";
				//E_return.message = "something went wrong please contact admin";
				//E_return.url = "Error.htm";
				return 0;
			}
		}

		[HttpPost]
		[Route("DashboardSocket")]
		public dynamic DashboardSocket(E_Login root)
		{
			try
			{

				return _valid.check_get_user_session(root);

			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "websocket" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				E_return E_return = new E_return();
				E_return.Code = "99";
				E_return.Message = "something went wrong please contact admin";
				E_return.Url = "Error.htm";
				return E_return;
			}
		}

		[HttpPost]
		[Route("SandTransportReports_VehilceSearch_Route")]
		public dynamic SandTransportReports_VehilceSearch_Route(Load_district root)
		{
			try
			{
				return _valid.SandTransportReports_VehilceSearch_valid(root);
			}
			catch (Exception)
			{
				return 0;
			}
		}


		[HttpPost]
		[Route("GET_deliveryreportRoute")]
		public dynamic GET_deliveryreportRoute(Load_district root)
		{
			try
			{
				return _valid.GET_deliveryreport_Valid(root);
			}
			catch (Exception ex)
			{
				//E_return E_return = new E_return();
	
				return 0;
			}
		}
		/// <summary>
		/// 
		/// </summary>
		/// <param name="root"></param>
		/// <returns></returns>
		/// <summary>
		/// 
		/// </summary>
		/// <param name="root"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("APMDC_SP_GET_STOCKYARD_DETAILS_Route")]
		public dynamic APMDC_SP_GET_STOCKYARD_DETAILS_Route(Load_district root)
		{
			try
			{

				return _valid.APMDC_SP_GET_STOCKYARD_DETAILS_Valid(root);

			}
			catch (Exception ex)
			{
				string logdata = JsonConvert.SerializeObject(root);
				string mappath = HttpContext.Current.Server.MapPath("ExceptionLogs");
				Task WriteTask = Task.Factory.StartNew(() => _Security.Log(logdata + "Exception" + "stockyardload" + ex.Message.ToString(), mappath, DateTime.Now.ToString("yyyyMMddhhmmssmmm")));

				E_return E_return = new E_return();
				E_return.Code = "99";
				E_return.Message = "something went wrong please contact admin";
				E_return.Url = "Error.htm";
				return E_return;
			}
		}


		[HttpPost]
		[Route("APMDC_SP_GET_STOCKYARD_NAME_Route")]
		public dynamic APMDC_SP_GET_STOCKYARD_NAME_Route(Load_district root)
		{
			try
			{
				return _valid.APMDC_SP_GET_STOCKYARD_NAME_valid(root);

			}
			catch (Exception)
			{

				return 0;
			}
		}

		[HttpPost]
		[Route("Tripsdoordelivery_Route")]
		public dynamic Tripsdoordelivery_Route(Load_district root)
		{
			try
			{
				return _valid.Tripsdoordelivery_Valid(root);
			}
			catch (Exception)
			{
				return 0;
			}
		}

		[HttpPost]
		[Route("Tripsdoordelivery_Update_Status_Route")]
		public dynamic Tripsdoordelivery_Update_Status_Route(Load_district root)
		{
			try
			{
				return _valid.Tripsdoordelivery_Update_Status_Valid(root);
			}
			catch (Exception)
			{
				return 0;
			}
		}

		[HttpPost]
		[Route("VtsRoads")]
		public dynamic VtsRoads(Gisshow lmobj)
		{
			dynamic obj = new ExpandoObject();
			DataTable dt = new DataTable();

			try
			{
				var value = PostData2(lmobj.Txtid);
				obj.Data = value;
			}
			catch (WebException wex)
			{
				throw wex;
			}
			return obj;

		}


		public dynamic PostData2(string Txid)
		{
			string url = "http://svts.mines.ap.gov.in:8041/ewaybilltripdistancewithpath?id=" + Txid + "&expiry_time_in_hours=24&buffer_radius_meters=5000";
			var response = String.Empty;
			try
			{
				var req = (HttpWebRequest)WebRequest.Create(url);
				req.ContentType = "application/json; charset=utf-8";
				var username = "apdmg";
				var password = "apdmg@987";
				var bytes = Encoding.UTF8.GetBytes($"{username}:{password}");
				req.Headers.Add("Authorization", $"Basic {Convert.ToBase64String(bytes)}");
				WebProxy myProxy = new WebProxy();

				req.Proxy = myProxy;

				req.Method = "GET";
				var resp = (HttpWebResponse)req.GetResponse();
				var sr = new StreamReader(resp.GetResponseStream());

				if ((resp.StatusCode == HttpStatusCode.Redirect) || (resp.StatusCode == HttpStatusCode.SeeOther) ||
					(resp.StatusCode == HttpStatusCode.RedirectMethod))
				{

				}
				else
				{
					response = sr.ReadToEnd().Trim();
				}


			}
			catch (WebException wex)
			{
				throw wex;
			}

			return JsonConvert.DeserializeObject<dynamic>(response);
		}


	}
}


