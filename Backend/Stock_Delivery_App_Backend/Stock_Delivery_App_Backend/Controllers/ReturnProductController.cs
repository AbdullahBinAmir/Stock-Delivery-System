using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Stock_Delivery_App_Backend.Models;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class ReturnProductController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();

        [HttpPost]
        public HttpResponseMessage SaveReturnedProduct(ReturnProduct rp)
        {
            try
            {
                int check = 0;
                string deliver_date = db.UserOrders.Where(o => o.id == rp.order_id).FirstOrDefault().order_deliver_date;
                string current_date = DateTime.Now.ToString("MM/dd/yyyy");
                DateTime t1 = DateTime.Parse(deliver_date);
                DateTime t2 = DateTime.Parse(current_date);
                TimeSpan time = t2 - t1;
                if (time.Days <= 14)
                {
                    var data = db.ReturnProducts.Add(rp);
                    db.SaveChanges();
                    check = 1;
                }
                else
                {
                    check = 2;
                }
                return Request.CreateResponse(HttpStatusCode.OK,check);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetReasonForSeller(int sid)
        {
            try
            {
                var data = (from rp in db.ReturnProducts
                            join vp in db.VendorProducts on rp.product_id equals vp.id
                            where rp.seller_id==sid
                            select new
                            {
                                id=rp.id,
                                reason=rp.reason,
                                detail=rp.detail,
                                product_id=rp.product_id,
                                order_id=rp.order_id,
                                qty=rp.qty,
                                price_per_pack=rp.price_per_pack,
                                seller_id=rp.seller_id,
                                buyer_id=rp.buyer_id,
                                status=rp.status,
                                pname=vp.name,
                                pimage = vp.image,
                                uname=db.UserAccounts.Where(u=>u.id==rp.buyer_id).FirstOrDefault().name
                            }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
        [HttpGet]
        public HttpResponseMessage GetReasonForBuyer(int bid)
        {
            try
            {
                var data = (from rp in db.ReturnProducts
                            join vp in db.VendorProducts on rp.product_id equals vp.id
                            where rp.buyer_id == bid
                            select new
                            {
                                id = rp.id,
                                reason = rp.reason,
                                detail = rp.detail,
                                product_id = rp.product_id,
                                order_id = rp.order_id,
                                qty = rp.qty,
                                price_per_pack = rp.price_per_pack,
                                seller_id = rp.seller_id,
                                buyer_id = rp.buyer_id,
                                status = rp.status,
                                pname = vp.name,
                                pimage=vp.image
                            }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateReturnReason(int rid,string status)
        {
            try
            {
                var data = (from rp in db.ReturnProducts
                            where rp.id == rid
                            select rp).FirstOrDefault();
                int qty = (int)data.qty;
                int total = (int)(data.price_per_pack * data.qty);
                if (data != null)
                {
                    if (status.Equals("rejected"))
                    {
                        data.status = status;
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, data);
                    }
                    else 
                    {
                        var pdata = db.DistributorProducts.Where(dp => dp.product_id == data.product_id).FirstOrDefault().id;
                        var dpdata = db.DistributorProductDetails.Where(dpd => dpd.dproduct_id == pdata).ToList();
                        foreach(var i in dpdata)
                        {
                            if (qty > i.no_of_cartons && qty!=0)
                            {
                                qty = qty - (int)i.no_of_cartons;
                                i.no_of_cartons = 0;
                                db.SaveChanges();
                            }
                            else if(qty<=i.no_of_cartons && qty!=0)
                            {
                                i.no_of_cartons = i.no_of_cartons - qty;
                                db.SaveChanges();
                                qty = 0;
                            }
                        }
                        var providerlist = db.ProviderLists.Where(pl => pl.seller_id == data.seller_id && pl.buyer_id == data.buyer_id).FirstOrDefault();
                        providerlist.total_credit = providerlist.total_credit - total;
                        data.status = "accepted";
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, data);
                    }
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invalid Info or ID Not Found");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
