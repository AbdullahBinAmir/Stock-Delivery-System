using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Stock_Delivery_App_Backend.Models;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class NotificationController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();


        [HttpPost]
        public HttpResponseMessage AddNotification(int crId, int amountpaid, int bid, int sid)
        {
            try
            {
                db.Notifications.Add(new Notification()
                {
                    paid_amount = amountpaid,
                    payment_date = DateTime.Now.ToString("MM/dd/yyyy"),
                    payment_type = "credit",
                    credit_id = crId,
                    seller_id=sid,
                    buyer_id=bid,
                    request_status="requested"
                });
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Notication Submitted..");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetNotificationForSeller(int id)
        {
            try
            {
                var data = (from n in db.Notifications join
                            u in db.UserAccounts on n.buyer_id equals u.id
                            where n.seller_id == id && n.request_status.Trim().Equals("requested")
                            select new
                            {
                                buyer_id=n.buyer_id,
                                credit_id=n.credit_id,
                                id=n.id,
                                paid_amount = n.paid_amount,
                                payment_date=n.payment_date,
                                payment_type=n.payment_type,
                                request_status=n.request_status,
                                seller_id=n.seller_id,
                                userName=u.name,
                                uType = u.roles
                            });
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        } 
        
        [HttpGet]
        public HttpResponseMessage GetNotificationForBuyer(int id)
        {
            try
            {
                var data = (from n in db.Notifications
                            join u in db.UserAccounts on n.seller_id equals u.id
                            where n.buyer_id == id
                            select new
                            {
                                buyer_id = n.buyer_id,
                                credit_id = n.credit_id,
                                id = n.id,
                                paid_amount = n.paid_amount,
                                payment_date = n.payment_date,
                                payment_type = n.payment_type,
                                request_status = n.request_status,
                                seller_id = n.seller_id,
                                userName = u.name,
                                uType=u.roles
                            });
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public int AddCreditPayment(int crId, int amountpaid)
        {
            try
            {
                var cuser = db.ProviderLists.Where(p => p.id == crId).FirstOrDefault();
                cuser.total_credit = cuser.total_credit - amountpaid;
                db.SaveChanges();
                db.CreditPayments.Add(new CreditPayment()
                {
                    paid_amount = amountpaid,
                    payment_date = DateTime.Now.ToString("MM/dd/yyyy"),
                    payment_type = "credit",
                    credit_id = crId
                });
                db.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }


        [HttpPut]
        public HttpResponseMessage UpdateNotification(int id,string status)
        {
            try
            {
                var data = (from p in db.Notifications
                            where p.id == id
                            select p).FirstOrDefault();
                if (data != null)
                {
                    data.request_status = status;
                    if (status.Trim().Equals("approved"))
                    {
                        int result = AddCreditPayment((int)data.credit_id, (int)data.paid_amount);
                        if (result == 0)
                        {
                            return Request.CreateResponse(HttpStatusCode.InternalServerError, "Error while addning payments");
                        }
                        else
                        {
                            db.SaveChanges();
                        }
                    }
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Updated Sucessfully");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Nothing to update");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public HttpResponseMessage DeleteNotification(int id)
        {
            try
            {
                var data = (from p in db.Notifications
                            where p.id == id
                            select p).FirstOrDefault();
                if (data != null)
                {
                    db.Notifications.Remove(data);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Deleted Sucessfully");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Nothing to delete");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
