using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Stock_Delivery_App_Backend.Models;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class UsersController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();

        [HttpPost]
        public HttpResponseMessage UserRegistration()
        {
            try
            {
                string name = HttpContext.Current.Request["uname"];
                string email = HttpContext.Current.Request["uemail"];
                string password = HttpContext.Current.Request["upassword"];
                string addr = HttpContext.Current.Request["baddress"];
                string city = HttpContext.Current.Request["ucity"];
                string mobileno = HttpContext.Current.Request["umobileno"];
                string usertype = HttpContext.Current.Request["userType"];
                if (!IsEmailExist(email))
                {
                    if (HttpContext.Current.Request.Files.Count > 0)
                    {
                        try
                        {
                            HttpPostedFile file = HttpContext.Current.Request.Files[0];
                            string path = HttpContext.Current.Server.MapPath("~/Images/");
                            file.SaveAs(path + file.FileName);
                            UserAccount ua = new UserAccount()
                            {
                                name = name,
                                email = email,
                                password = password,
                                address = addr,
                                city = city,
                                mobile_no = mobileno,
                                roles = usertype,
                                image = file.FileName,
                                account_status = "Allow"
                            };
                            db.UserAccounts.Add(ua);
                            if (db.SaveChanges() > 0)
                            {
                                return Request.CreateResponse(HttpStatusCode.OK, "Account Registered Successfully");
                            }
                            else
                            {
                                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                                    "Something Went Wrong! Please try Again later");
                            }
                        }
                        catch (Exception e)
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
                        }
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NoContent, "No File Selected");
                    }
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NoContent, "Email Already Exist");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        private bool IsEmailExist(string email)
        {
            bool IsEmailExist = false;
            int count = db.UserAccounts.Where(a => a.email == email).Count();
            if (count > 0)
                IsEmailExist = true;
            return IsEmailExist;
        }

        [HttpGet]
        public HttpResponseMessage GetUsers(string city)
        {
            try
            {
                var data = db.UserAccounts.Where(u=>u.city.Equals(city)).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
        [HttpGet]
        public HttpResponseMessage GetStatistics(int vid)
        {
            try
            {
                List<object> data = new List<object>();
                var get_orders_num = db.UserOrders.Where(o => o.seller_id == vid).ToList().Count();
                var total_credit = db.ProviderLists.Where(p=>p.seller_id==vid).Sum(i=>i.total_credit).ToString();
                data.Add(get_orders_num);
                data.Add(int.Parse(total_credit));
                return Request.CreateResponse(HttpStatusCode.OK,data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetUsers()
        {
            try
            {
                var data = db.UserAccounts.Where(u => u.account_status.Equals("Allow")).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetUsers(string uemail, string password)
        {
            try
            {

                var data = db.UserAccounts.Where(u => u.email.Equals(uemail) && u.password.Equals(password) && u.account_status.Equals("Allow")).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPut]

        public HttpResponseMessage UpdateUserInfo(int id, string acctype)
        {
            try
            {

                var data = (from a in db.UserAccounts where a.id == id select a).FirstOrDefault();

                if (data != null)
                {
                    data.account_status = acctype;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Info or Account Not Found");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {

            try
            {
                //fetching and filter specific member id record   
                var deleteUser = (from a in db.UserAccounts where a.id == id select a).FirstOrDefault();

                //checking fetched or not with the help of NULL or NOT.  
                if (deleteUser != null)
                {
                    db.Entry(deleteUser).State = System.Data.Entity.EntityState.Deleted;
                    db.SaveChanges();

                    //return response status as successfully deleted with member id  
                    return Request.CreateResponse(HttpStatusCode.OK, id);
                }
                else
                {
                    //return response error as Not Found  with exception message.  
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Member Not Found or Invalid " + id.ToString());
                }
            }

            catch (Exception ex)
            {

                //return response error as bad request  with exception message.  
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }
    }
}
