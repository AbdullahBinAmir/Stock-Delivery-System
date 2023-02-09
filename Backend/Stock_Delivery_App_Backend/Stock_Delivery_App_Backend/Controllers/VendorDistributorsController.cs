using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using System.Web;
using Stock_Delivery_App_Backend.Models;

namespace StockDeliveryApp_APIS_BACKEND.Controllers
{
    public class VendorDistributorsController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();

        [HttpPost]
        public HttpResponseMessage AddDistributorsForVendor(VendorDistributor vd)
        {
            try
            {
                db.VendorDistributors.Add(vd);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Application Submitted..");
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetDistributors(int vid)
        {
            try
            {
                var data = (from vd in db.VendorDistributors join u in db.UserAccounts
                                on vd.distributor_id equals u.id where vd.vendor_id == vid select new
                                {
                                    vdId = vd.id,
                                    securityAmountPaid = vd.security_amount,
                                    status =vd.distributor_status,
                                    buyerId=vd.distributor_id,
                                    sellerId=vd.vendor_id,
                                    uname=u.name,
                                    ucity=u.city,
                                    uemail=u.email,
                                    umobileno=u.mobile_no,
                                    baddress=u.address,
                                    uimage=u.image
                                });
                
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetVendors(int vid,int did)
        {
            try
            {
                String vdStatus = "";
                var vdata = db.ProviderLists.Where(vd => vd.seller_id == vid && vd.buyer_id == did).FirstOrDefault();
                if (vdata!=null)
                {
                    vdStatus = vdata.status;
                }
                var data = (from  u in db.UserAccounts
                            where u.id==vid
                            select new {
                                uid=u.id,
                                uname = u.name,
                                ucity = u.city,
                                uemail = u.email,
                                umobileno = u.mobile_no,
                                Address = u.address,
                                uimage = u.image,
                                utype=u.roles,
                                status= vdStatus,
                                vendorProducts = db.VendorProducts.Where(d => d.vendor_id == u.id).ToList()
                            }).FirstOrDefault();

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        public HttpResponseMessage GetMyVendors(int did)
        {
            try
            {
                var data = (from vd in db.ProviderLists join
                            u in db.UserAccounts on vd.seller_id equals u.id
                            where vd.buyer_id==did
                            select new
                            {
                                uid = u.id,
                                uname = u.name,
                                ucity = u.city,
                                uemail = u.email,
                                umobileno = u.mobile_no,
                                Address = u.address,
                                uimage = u.image,
                                utype = u.roles,
                                status = vd.status,
                                vendorProducts = db.VendorProducts.Where(d => d.vendor_id == u.id).ToList()
                            }).ToList();

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        public HttpResponseMessage GetVendorList(int did)
        {
            try
            {
                var data = (from u in db.UserAccounts.SqlQuery(
                    "select * from UserAccount where roles='Vendor'" +
                    " and id not in (select vendor_id from VendorDistributor  where distributor_id="+did+")"
                    )
                            select new
                            {
                                uid = u.id,
                                uname=u.name,
                                uemail=u.email,
                                umobileno=u.mobile_no,
                                ucity=u.city,
                                Address=u.address,
                                uimage=u.image,
                                vendorProducts=db.VendorProducts.Where(d=>d.vendor_id==u.id).ToList()
                            });
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateDistributorStatus(VendorDistributor VD)
        {
            try
            {
                var data = (from vd in db.VendorDistributors where
                            vd.distributor_id==VD.distributor_id && vd.vendor_id==VD.vendor_id select vd).FirstOrDefault();
                if (data != null)
                {
                    data.distributor_status = VD.distributor_status;
                    data.security_amount = VD.security_amount;
                    data.distributor_id = VD.distributor_id;
                    data.vendor_id = VD.vendor_id;
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


    }
}
