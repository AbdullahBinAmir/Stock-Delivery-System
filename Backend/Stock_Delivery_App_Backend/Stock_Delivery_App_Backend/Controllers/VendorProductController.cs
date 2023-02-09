using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Stock_Delivery_App_Backend.Models;
using System.IO;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class VendorProductController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();

        [HttpPost]
        public HttpResponseMessage AddProducts()
        {
            try
            {
                string name = HttpContext.Current.Request["name"];
                string desp = HttpContext.Current.Request["desp"];
                string qtyCartons = HttpContext.Current.Request["qtyCarton"];
                string spriceCarton = HttpContext.Current.Request["spriceCarton"];
                string category = HttpContext.Current.Request["cat"];
                string threshold = HttpContext.Current.Request["threshold"];
                string comName = HttpContext.Current.Request["cName"];
                string vid = HttpContext.Current.Request["vid"];
                if (HttpContext.Current.Request.Files.Count > 0)
                {
                    try
                    {
                        HttpPostedFile file = HttpContext.Current.Request.Files[0];
                        string path = HttpContext.Current.Server.MapPath("~/Images/");
                        file.SaveAs(path + file.FileName);
                        VendorProduct vp = new VendorProduct()
                        {
                            name = name,
                            description = desp,
                            qty_in_carton = int.Parse(qtyCartons),
                            saleprice_per_carton = int.Parse(spriceCarton),
                            category = category,
                            threshold = int.Parse(threshold),
                            vendor_id = int.Parse(vid),
                            image = file.FileName,
                            company_name = comName
                        };
                        db.VendorProducts.Add(vp);
                        if (db.SaveChanges() > 0)
                        {
                            return Request.CreateResponse(HttpStatusCode.OK, "Product Added Successfully");
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
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        //private byte[] getProductImage(string filepath)
        //{
        //    try
        //    {
        //        var root = HttpContext.Current.Server.MapPath(filepath);
        //        byte[] imageData = null;
        //        FileInfo fileInfo = new FileInfo(root);
        //        long imageFileLength = fileInfo.Length;
        //        FileStream fs = new FileStream(root, FileMode.Open, FileAccess.Read);
        //        BinaryReader br = new BinaryReader(fs);
        //        imageData = br.ReadBytes((int)imageFileLength);
        //        return imageData;
        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}

        [HttpGet]
        public HttpResponseMessage GetProducts()
        {
            try
            {
                var data = db.VendorProducts.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetProducts(string name)
        {
            try
            {
                var data = db.VendorProducts.Where(p => p.name == name).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //public HttpResponseMessage GetImage(string filepath)
        //{
        //    try
        //    {
        //        var root = HttpContext.Current.Server.MapPath(filepath);
        //        // var tempath = Path.Combine(root, filepath);
        //        //Directory.GetFiles(root);
        //        //byte[] byteArray = null;
        //        //byteArray = File.ReadAllBytes(root);
        //        //// check your mime type, and set your unique file name. maybe use DateTime for your file name
        //        ////Convert byte arry to base64string   
        //        //string imreBase64Data = Convert.ToBase64String(byteArray);
        //        //string imgDataURL = string.Format("data:image/jpeg;base64,{0}", imreBase64Data);
        //        byte[] imageData = null;
        //        FileInfo fileInfo = new FileInfo(root);
        //        long imageFileLength = fileInfo.Length;
        //        FileStream fs = new FileStream(root, FileMode.Open, FileAccess.Read);
        //        BinaryReader br = new BinaryReader(fs);
        //        imageData = br.ReadBytes((int)imageFileLength);
        //        return Request.CreateResponse(HttpStatusCode.OK, imageData);
        //    }
        //    catch(Exception ex)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        [HttpGet]
        public HttpResponseMessage GetProducts(int id)
        {
            try
            {
                var data = db.VendorProducts.Where(p => p.vendor_id == id).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateVendorProduct()
        {
            try
            {
                string pid = HttpContext.Current.Request["pid"];
                string name = HttpContext.Current.Request["name"];
                string desp = HttpContext.Current.Request["desp"];
                string qtyCartons = HttpContext.Current.Request["qtyCarton"];
                string spriceCarton = HttpContext.Current.Request["spriceCarton"];
                string category = HttpContext.Current.Request["cat"];
                string threshold = HttpContext.Current.Request["threshold"];
                string comName = HttpContext.Current.Request["cName"];
                string vid = HttpContext.Current.Request["vid"];
                    try
                    {
                    HttpPostedFile file=null;
                    if (HttpContext.Current.Request.Files.Count > 0)
                    {
                        file = HttpContext.Current.Request.Files[0];
                        string path = HttpContext.Current.Server.MapPath("~/Images/");
                        file.SaveAs(path + file.FileName);
                    }
                    int id = int.Parse(pid);
                        var vp = (from a in db.VendorProducts where a.id == id select a).FirstOrDefault();
                        if (vp != null)
                        {
                            vp.name = name;
                            vp.description = desp;
                            vp.qty_in_carton = int.Parse(qtyCartons);
                            vp.saleprice_per_carton = int.Parse(spriceCarton);
                            vp.category = category;
                            vp.threshold = int.Parse(threshold);
                            vp.vendor_id = int.Parse(vid);
                            vp.image = file!= null ? file.FileName:vp.image;
                            vp.company_name = comName;
                            db.SaveChanges();
                            return Request.CreateResponse(HttpStatusCode.OK, "Product Updated Successfully");
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
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage AddStock(batch_production bp)
        {
            try
            {
                db.batch_production.Add(bp);
                if (db.SaveChanges() > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Stock Added Successfully");
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                        "Something Went Wrong! Please try Again later");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
