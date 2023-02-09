using Stock_Delivery_App_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class ShopkeeperClientsController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();


        [HttpPost]
        public HttpResponseMessage AddShopkeeperClients(ProviderList pl)
        {
            try
            {
                var data = (from p in db.ProviderLists
                            where p.seller_id == pl.seller_id && p.buyer_id==pl.buyer_id
                            select p).FirstOrDefault();
                if (data == null)
                {
                    db.ProviderLists.Add(pl);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Data Submitted..");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Data Already Exist..");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetProvidersForShopkeeper(int uid)
        {
            try
            {
                var data = (from u in db.UserAccounts
                            join pl in db.ProviderLists on u.id equals pl.seller_id
                            where pl.buyer_id==uid
                            select new
                            {
                                uid = u.id,
                                uname = u.name,
                                umobileno = u.mobile_no,
                                utype = u.roles,
                                ucity = u.city,
                                uimage = u.image,
                                uemail = u.email,
                                Address = u.address,
                                Status = pl.status
                            }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetVendorForShopkeeper(int pid) { 
            try
            {
                var data = (from vp in db.VendorProducts
                            join u in db.UserAccounts on vp.vendor_id equals u.id
                            where vp.id == pid
                            select new
                            {
                                uid = u.id,
                                uname = u.name,
                                umobileno = u.mobile_no,
                                utype = u.roles,
                                ucity = u.city,
                                uimage = u.image,
                                uemail = u.email,
                                Address = u.address,
                                vendorProducts = db.VendorProducts.Where(p => p.vendor_id == u.id).ToList()
                            }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetDistributorForShopkeeper(int pid)
        {
            try
            {
                var data = (from dp in db.DistributorProducts
                                    join ua in db.UserAccounts
                                    on dp.distributor_id equals ua.id
                                    where dp.product_id == pid
                                    select new
                                    {
                                        uid = ua.id,
                                        uname = ua.name,
                                        ucity = ua.city,
                                        Address = ua.address,
                                        umobileno = ua.mobile_no,
                                        uemail = ua.email,
                                        utype = ua.roles,
                                        uimage = ua.image,
                                        urating=db.Ratings.Where(r => r.reciever_id == ua.id).Average(i => i.no_of_stars),
                                        vendorProducts = (from vp in db.VendorProducts join p in
                                                     db.DistributorProducts on vp.id equals p.product_id
                                                     where p.distributor_id == ua.id && p.product_id == pid
                                                     select new
                                                     {
                                                        pid = p.id,
                                                        pname = vp.name,
                                                        no_of_carton = p.total_cartons,
                                                        saleprice_per_carton = p.saleprice_for_shopkeeper,
                                                        category = vp.category,
                                                      }).FirstOrDefault()
                                    }).ToList();

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetDistributorProducts(int id)
        {
            try
            {
                var data = (from d in db.DistributorProducts
                            join vp in db.VendorProducts on d.product_id equals vp.id
                            where d.distributor_id == id
                            select new
                            {
                               id=d.id,
                               name=vp.name,
                               description=vp.name,
                               qty_in_carton=vp.qty_in_carton,
                               saleprice_per_carton=d.saleprice_for_shopkeeper,
                               category=vp.category,
                               company_name=vp.company_name,
                               threshold=1,
                               image=vp.image,
                               total_cartons=d.total_cartons
                            }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateShopkeeperClients(int sid,int bid,int security_amount, string status)
        {
            try
            {
                var data = (from p in db.ProviderLists
                            where p.seller_id == sid && p.buyer_id==bid
                            select p).FirstOrDefault();
                if (data!=null)
                {
                    data.security_amount = security_amount;
                    data.status = status;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK,"Updated Sucessfully");
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

        [HttpGet]
        public HttpResponseMessage GetBuyersForProvider(int uid)
        {
            try
            {
                var data = (from p in db.ProviderLists
                            join u in db.UserAccounts
                            on p.buyer_id equals u.id
                            where p.seller_id == uid
                            select new
                            {
                                vdId = p.id,
                                securityAmountPaid = p.security_amount,
                                status = p.status,
                                buyerId = p.buyer_id,
                                sellerId = p.seller_id,
                                uname = u.name,
                                ucity = u.city,
                                uemail = u.email,
                                utype = u.roles,
                                umobileno = u.mobile_no,
                                baddress = u.address,
                                uimage = u.image
                            });

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
        [HttpGet]
        public HttpResponseMessage GetUniqueBuyerForProvider(int rid)
        {
            try
            {
                var data = (from p in db.ProviderLists
                            join u in db.UserAccounts
                            on p.buyer_id equals u.id
                            where p.id==rid
                            select new
                            {
                                vdId = p.id,
                                securityAmountPaid = p.security_amount,
                                status = p.status,
                                buyerId = p.buyer_id,
                                sellerId = p.seller_id,
                                uname = u.name,
                                ucity = u.city,
                                uemail = u.email,
                                utype = u.roles,
                                umobileno = u.mobile_no,
                                baddress = u.address,
                                uimage = u.image
                            }).FirstOrDefault();

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetVendors(int uid)
        {
            try
            {
                var data = (from vd in db.ProviderLists
                            join u in db.UserAccounts on vd.seller_id equals u.id
                            where vd.buyer_id == uid && u.roles== "Vendor"
                            select new
                            {
                                uid = u.id,
                                uname = u.name,
                                ucity = u.city,
                                uemail = u.email,
                                umobileno = u.mobile_no,
                                baddress = u.address,
                                uimage = u.image,
                                utype = u.roles,
                                status = vd.status,
                                vendorProducts = db.VendorProducts.Where(d => d.vendor_id == u.id).ToList()
                            });

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetDistributors(int uid)
        {
            try
            {
                var data = (from vd in db.ProviderLists
                            join u in db.UserAccounts on vd.seller_id equals u.id
                            where vd.buyer_id == uid && u.roles== "Distributor"
                            select new
                            {
                                uid = u.id,
                                uname = u.name,
                                ucity = u.city,
                                uemail = u.email,
                                umobileno = u.mobile_no,
                                baddress = u.address,
                                uimage = u.image,
                                utype = u.roles,
                                status = vd.status,
                                vendorProducts = (from d in db.DistributorProducts
                                                  join vp in db.VendorProducts on d.product_id equals vp.id
                                                  where d.distributor_id == u.id
                                                  select new
                                                  {
                                                      id = d.id,
                                                      name = vp.name,
                                                      description = vp.name,
                                                      qty_in_carton = vp.qty_in_carton,
                                                      saleprice_per_carton = d.saleprice_for_shopkeeper,
                                                      category = vp.category,
                                                      company_name = vp.company_name,
                                                      threshold = 1,
                                                      image = vp.image,
                                                      total_cartons = d.total_cartons
                                                  }).ToList()
            });

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetDistributorDataForShopkeeper(int uid)
        {
            try
            {
                var data = (from u in db.UserAccounts
                            where u.id==uid
                            select new
                            {
                                uid = u.id,
                                uname = u.name,
                                ucity = u.city,
                                uemail = u.email,
                                umobileno = u.mobile_no,
                                baddress = u.address,
                                uimage = u.image,
                                utype=u.roles
                            }).FirstOrDefault();

                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
