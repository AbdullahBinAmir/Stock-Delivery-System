using Stock_Delivery_App_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class UserCreditController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();


        [HttpGet]
        public HttpResponseMessage GetCreditUserInfoForSeller(int uid)
        {
            List<object> filterdata = new List<object>();
            try
            {
                var data = (from o in db.UserOrders
                            join u in db.UserAccounts on o.buyer_id equals u.id
                            where o.seller_id == uid && o.order_status == "delivered"
                            select new
                            {
                                utype = u.roles,
                                uid = u.id,
                                uname = u.name,
                                umobileno = u.mobile_no,
                                ucity = u.city,
                                uimage = u.image,
                                totalCredit = db.ProviderLists.Where(p=>p.seller_id==uid 
                                    && p.buyer_id==u.id).FirstOrDefault().total_credit,
                                crId = db.ProviderLists.Where(p => p.seller_id == uid
                                    && p.buyer_id == u.id).FirstOrDefault().id,
                                amountPaid = db.CreditPayments.Where(cp => cp.credit_id == db.ProviderLists.Where(p => p.seller_id == uid
                                          && p.buyer_id == u.id).FirstOrDefault().id).ToList().Sum(i => i.paid_amount)
                            }).ToList();
                int id = 0;
                foreach(var result in data)
                {
                    if (result.uid != id)
                    {
                        filterdata.Add(result);
                        id = result.uid;
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, filterdata);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetCreditOrderInfoForSeller(int uid, int vid)
        {
            try
            {
                var data = (from o in db.UserOrders
                            where o.buyer_id == vid && o.seller_id==uid && o.order_status == "delivered"
                            select new
                            {
                                oid = o.id,
                                orderType = o.order_type,
                                orderState = o.order_state,
                                totalAmount = o.total_amount,
                                placeDate = o.order_place_date,
                                deliverDate = o.order_deliver_date,
                            }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetCreditUserInfoForBuyer(int uid)
        {
            List<object> filterdata = new List<object>();
            try
            {
                var data = (from o in db.UserOrders
                            join u in db.UserAccounts on o.seller_id equals u.id
                            where o.buyer_id == uid && o.order_status == "delivered"
                            select new
                            {
                                utype = u.roles,
                                uid = u.id,
                                uname = u.name,
                                umobileno = u.mobile_no,
                                ucity = u.city,
                                uimage = u.image,
                                totalCredit = db.ProviderLists.Where(p => p.seller_id == u.id
                                    && p.buyer_id == uid).FirstOrDefault().total_credit,
                                crId = db.ProviderLists.Where(p => p.seller_id == u.id
                                    && p.buyer_id == uid).FirstOrDefault().id,
                                amountPaid=db.CreditPayments.Where(cp=>cp.credit_id== db.ProviderLists.Where(p => p.seller_id == u.id
                                     && p.buyer_id == uid).FirstOrDefault().id).ToList().Sum(i=>i.paid_amount)
                            }).ToList();
                int id = 0;
                foreach (var result in data)
                {
                    if (result.uid != id)
                    {
                        filterdata.Add(result);
                        id = result.uid;
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, filterdata);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetCreditOrderInfoForBuyer(int uid, int vid)
        {
            try
            {
                var data = (from o in db.UserOrders
                            where o.seller_id == vid && o.buyer_id==uid && o.order_status == "delivered"
                            select new
                            {
                                oid = o.id,
                                orderType = o.order_type,
                                orderState = o.order_state,
                                totalAmount = o.total_amount,
                                placeDate = o.order_place_date,
                                deliverDate = o.order_deliver_date,
                            }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage AddUserPayment(int oid, int amountpaid)
        {
            try
            {
                db.Payments.Add(new Payment() { 
                    paid_amount=amountpaid,
                    payment_date= DateTime.Now.ToString("MM/dd/yyyy"),
                    payment_type = (from u in db.UserOrders where u.id == oid select u.order_type).FirstOrDefault(),
                    order_id=oid
                });
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Payment Submitted..");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }  
        
        [HttpGet]
        public HttpResponseMessage GetPayments(int oid)
        {
            try
            {
                var data = db.Payments.Where(p=>p.order_id==oid).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
        [HttpGet]
        public HttpResponseMessage GetCreditPayments(int crId)
        {
            try
            {
                var data = db.CreditPayments.Where(p=>p.credit_id==crId).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
