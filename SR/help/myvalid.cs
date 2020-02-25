using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace SR.help
{
	public class Myvalid
	{
		DataTable Dt = new DataTable();
		Sandget sandget = new Sandget();
		public dynamic Check_get_districts(Load_district root)
		{
			Getdist Getdist = new Getdist();
			Getdist.Distli = new List<Dist>();
			Dt = sandget.APMDC_SP_GET_Districts_Rural_Muncipal_Mandal_Village(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				Getdist.Code = "100";
				Getdist.Message = "";
				foreach (DataRow dr in Dt.Rows)
				{
					Dist dist = new Dist();
					dist.District_code = dr["LGD_DISTRICT_CODE"].ToString().Trim();
					dist.District_name = dr["DISTRICT"].ToString().Trim();
					Getdist.Distli.Add(dist);
				}
			}
			else
			{

				Getdist.Code = "101";
				Getdist.Message = "No Data Found";
			}
			return Getdist;
		}

		/// <summary>
		/// this function is used to get the values from DB for sand today quantites and their cumalatives written by kumar reddy
		/// </summary>
		/// <param name="obj"> to pass object type districit and to date and from date</param>
		/// <returns></returns>
		public dynamic SandTransportReports_Get(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.SandTransportReports_Get_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}

		public dynamic SandTransportReports_72Hours_valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.SandTransportReports_72Hours_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}

		public dynamic Get_contractor_details(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.Get_contractor_details_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}



		/// <summary>
		/// this function is used to get the values from DB for sand Stock Yard and their cumalatives written by ahmmed
		/// </summary>
		/// <param name="obj"> to pass object type districit and to date and from date</param>
		/// <returns></returns>
		public dynamic SandTransportReports_Get_Stockyard(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.SandTransportReports_Get_sp_StockYard(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}

		/// <summary>
		///  This function is used to get the contractor details on pop up and hence using the existance sp of " SandTransportReports_Get_sp_StockYard "
		/// </summary>
		/// <param name="root"></param>
		/// <returns></returns>
		public dynamic Load_Contarctor_Details_by_id_Valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.PerhourDisplay_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{
				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}


		public dynamic SandTransportReports_VehilceSearch_valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.SandTransportReports_VehilceSearch_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}



		/// <summary>
		/// This valid is for the per hour display and written by ahammed
		/// </summary>
		/// <param name="root"></param>
		/// <returns></returns>
		public dynamic PerhourDisplay_valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.PerhourDisplay_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}

		public dynamic PerhourDisplay_hour_valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.PerhourDisplay_hour_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}



		public dynamic SandTransportReports_Get_for_total_orders_myvalid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.SandTransportReports_Get_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				Dt.Columns.Add("Name", typeof(string));
				for (int count = 0; count < Dt.Rows.Count; count++)
				{
					Dt.Rows[count]["Name"] = "Total";
				}
				DataTable dts = GetInversedDataTable(Dt, "Name");

				dts.Columns.Add("SNo", typeof(int)).SetOrdinal(0);
				for (int count = 0; count < dts.Rows.Count; count++)
				{
					dts.Rows[count]["SNo"] = count + 1;
				}
				DataTable dtss = dts;
				userdata.DailyRepDetsli = dts;
				userdata.Message = "success";
			}
			else
			{
				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}


		public static DataTable GetInversedDataTable(DataTable table, string columnX, params string[] columnsToIgnore)
		{
			//Create a DataTable to Return
			DataTable returnTable = new DataTable();

			if (columnX == "")
				columnX = table.Columns[0].ColumnName;

			//Add a Column at the beginning of the table

			returnTable.Columns.Add(columnX);

			//Read all DISTINCT values from columnX Column in the provided DataTale
			List<string> columnXValues = new List<string>();

			//Creates list of columns to ignore
			List<string> listColumnsToIgnore = new List<string>();
			if (columnsToIgnore.Length > 0)
				listColumnsToIgnore.AddRange(columnsToIgnore);

			if (!listColumnsToIgnore.Contains(columnX))
				listColumnsToIgnore.Add(columnX);

			foreach (DataRow dr in table.Rows)
			{
				string columnXTemp = dr[columnX].ToString();
				//Verify if the value was already listed
				if (!columnXValues.Contains(columnXTemp))
				{
					//if the value id different from others provided, add to the list of 
					//values and creates a new Column with its value.
					columnXValues.Add(columnXTemp);
					returnTable.Columns.Add(columnXTemp);
				}
				else
				{
					//Throw exception for a repeated value
					throw new Exception("The inversion used must have " +
										"unique values for column " + columnX);
				}
			}

			//Add a line for each column of the DataTable

			foreach (DataColumn dc in table.Columns)
			{
				if (!columnXValues.Contains(dc.ColumnName) &&
					!listColumnsToIgnore.Contains(dc.ColumnName))
				{
					DataRow dr = returnTable.NewRow();
					dr[0] = dc.ColumnName;
					returnTable.Rows.Add(dr);
				}
			}

			//Complete the datatable with the values
			for (int i = 0; i < returnTable.Rows.Count; i++)
			{
				for (int j = 1; j < returnTable.Columns.Count; j++)
				{
					returnTable.Rows[i][j] =
					  table.Rows[j - 1][returnTable.Rows[i][0].ToString()].ToString();
				}
			}

			return returnTable;
		}

		//Token gentration
		//KUMAR GRUSER CHECKING
		public dynamic Check_get_userlogs(E_drop root)
		{
			Gettbluserlogs Gettbluserlogs = new Gettbluserlogs();
			Gettbluserlogs.Tbluserlogsli = new List<Tbluserlogs>();
			Dt = sandget.APMDC_SP_GET_LOGIN_LOGS(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				Gettbluserlogs.Code = "100";
				Gettbluserlogs.Message = "";
			}
			else
			{
				Gettbluserlogs.Code = "101";
				Gettbluserlogs.Message = "No Data Found";
			}
			return Gettbluserlogs;
		}


		public dynamic check_get_user_session(E_Login root)
		{
			E_return E_return = new E_return();

			string idsplit = SR_Security.Decrypt(root.Username, "");
			string[] id = idsplit.Split('^');
			root.Username = id[1].ToString();
			root.Password = id[5].ToString();
			Dt = sandget.APMDC_SP_GET_USER_SESSION_CHK(root);
			//Dt = Sandget.APMDC_SP_GET_USER_SESSION_CHK(root);
			//if (Dt != null && Dt.Rows.Count > 0 && root.username==Dt.Rows[0][0].ToString())
			if (Dt != null && Dt.Rows.Count > 0 && root.Username == Dt.Rows[0][0].ToString() && root.Password == Dt.Rows[0][1].ToString())
			{

				E_return.Code = "100";
				E_return.Message = "OK";
				return E_return;

			}
			else
			{
				E_return.Code = "99";
				E_return.Message = "something went wrong please contact admin";
				E_return.Url = "Error.htm";
				return E_return;
			}

		}

		public dynamic GET_deliveryreport_Valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.GET_deliveryreport_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.Code = "100";
				userdata.DailyRepDetsli = Dt;
				userdata.Message = "success";
			}
			else
			{

				userdata.Code = "101";
				userdata.Message = "No Data Found";
			}
			return userdata;
		}

		public dynamic APMDC_SP_GET_STOCKYARD_DETAILS_Valid(Load_district root)
		{
			Getstockyardprice Getstockyardprice = new Getstockyardprice();
			Getstockyardprice.Tbl_Stockyard_Master_priceli = new List<tbl_Stockyard_Master_price>();
			Dt = sandget.APMDC_SP_GET_STOCKYARD_DETAILS_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				Getstockyardprice.Code = "100";
				Getstockyardprice.Message = "";
				Getstockyardprice.SAND_PRICE = Dt.Rows[0][2].ToString();
				Getstockyardprice.STOCKYARD_EXTENT = Dt.Rows[0][3].ToString();
				foreach (DataRow dr in Dt.Rows)
				{
					tbl_Stockyard_Master_price tbl_Stockyard_Master_price = new tbl_Stockyard_Master_price();
					tbl_Stockyard_Master_price.E_STOCKYARD_ID = dr["STOCKYARD_ID"].ToString().Trim();
					tbl_Stockyard_Master_price.E_Stockyard_Name = dr["STOCKYARD_NAME"].ToString().Trim();
					tbl_Stockyard_Master_price.SAND_PRICE = Convert.ToDouble(dr["SAND_PRICE"].ToString().Trim());
					tbl_Stockyard_Master_price.STOCKYARD_EXTENT = Convert.ToDouble(dr["STOCKYARD_EXTENT"].ToString().Trim());
					tbl_Stockyard_Master_price.SAND_SOLD = Convert.ToDouble(dr["SAND_SOLD"].ToString().Trim());
					tbl_Stockyard_Master_price.SELLING_BAL = Convert.ToDouble(dr["SELLING_BAL"].ToString().Trim());
					Getstockyardprice.Tbl_Stockyard_Master_priceli.Add(tbl_Stockyard_Master_price);
				}
			}
			else
			{
				Getstockyardprice.Code = "101";
				Getstockyardprice.Message = "No Data Found";
			}
			return Getstockyardprice;
		}

		public dynamic APMDC_SP_GET_STOCKYARD_NAME_valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.APMDC_SP_GET_STOCKYARD_NAME_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.code = "100";
				userdata.dailyRepDetsli = Dt;
				userdata.message = "success";
			}
			else
			{

				userdata.code = "101";
				userdata.message = "No Data Found";
			}
			return userdata;
		}
		public dynamic Tripsdoordelivery_Valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.Tripsdoordelivery_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.code = "100";
				userdata.dailyRepDetsli = Dt;
				userdata.message = "success";
			}
			else
			{

				userdata.code = "101";
				userdata.message = "No Data Found";
			}
			return userdata;
		}

		public dynamic Tripsdoordelivery_Update_Status_Valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.Tripsdoordelivery_Update_Status_sp(root);
			if (Dt != null && Dt.Rows.Count > 0 && Dt.Rows[0]["STATUS"].ToString() == "1")
			{
				userdata.code = "100";
				userdata.dailyRepDetsli = Dt;
				userdata.message = "success";
			}
			else
			{

				userdata.code = "101";
				userdata.message = "No Data Found";
			}
			return userdata;
		}
		public dynamic Tripsdoordelivery_counts_display_valid(Load_district root)
		{
			dynamic userdata = new ExpandoObject();

			Dt = sandget.Tripsdoordelivery_counts_display_sp(root);
			if (Dt != null && Dt.Rows.Count > 0)
			{
				userdata.code = "100";
				userdata.dailyRepDetsli = Dt;
				userdata.message = "success";
			}
			else
			{

				userdata.code = "101";
				userdata.message = "No Data Found";
			}
			return userdata;
		}

	}
}