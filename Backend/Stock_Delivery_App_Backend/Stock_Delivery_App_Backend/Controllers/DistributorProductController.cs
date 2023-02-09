using Stock_Delivery_App_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class DistributorProductController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();

        [HttpGet]
        public HttpResponseMessage GetDistributorProducts(int did)
        {
            try
            {
                var data = (from d in db.DistributorProducts
                            join vp in db.VendorProducts on d.product_id equals vp.id
                            where d.distributor_id == did
                            select new
                            {
                                dpId=d.id,
                                salePrice=d.saleprice_for_shopkeeper,
                                totalCartons=d.total_cartons,
                                pname=vp.name,
                                qtyPerCarton=vp.qty_in_carton,
                                pCat=vp.category,
                                companyName=vp.company_name,
                                pImage=vp.image
                            });
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetAllDistributorProducts()
        {
            try
            {
                var data = (from d in db.DistributorProducts
                            join vp in db.VendorProducts on d.product_id equals vp.id
                            select new
                            {
                                dpId = d.id,
                                salePrice = d.saleprice_for_shopkeeper,
                                totalCartons = d.total_cartons,
                                pname = vp.name,
                                qtyPerCarton = vp.qty_in_carton,
                                pCat = vp.category,
                                companyName = vp.company_name,
                                pImage = vp.image,
                                pdesp=vp.description,
                                did=d.distributor_id
                            });
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateDistributorProductInfo(int dpid,int saleprice)
        {
            try
            {
                var data = (from dp in db.DistributorProducts where dp.id==dpid
                            select dp).FirstOrDefault();
                if (data != null)
                {
                    data.saleprice_for_shopkeeper = saleprice;
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
