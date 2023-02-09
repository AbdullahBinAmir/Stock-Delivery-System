using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Stock_Delivery_App_Backend.Models;
using Stock_Delivery_App_Backend.Models.Order;

namespace Stock_Delivery_App_Backend.Controllers
{
    public class UserOrderController : ApiController
    {
        Backend_FYP_DBEntities db = new Backend_FYP_DBEntities();

        private bool AddOrderDetails(int oid, List<CartItems> cartItems,int sid)
        {
            try
            {
                var data = db.UserAccounts.Where(u => u.id == sid).FirstOrDefault();
                foreach (CartItems cartItem in cartItems)
                {
                    var dproductdata = data.roles == "Distributor" ?
                        db.DistributorProducts.Where(dp => dp.id == cartItem.product_id).FirstOrDefault() : null;
                    var productdata = db.VendorProducts.Where(p => p.id == cartItem.product_id).FirstOrDefault();
                    OrderDetail od = new OrderDetail()
                    {
                        order_id = oid,
                        qty_ordred = cartItem.qty_ordred,
                        batch_no = 0,
                        product_id = cartItem.product_id,
                        product_price=dproductdata!=null?dproductdata.saleprice_for_shopkeeper: productdata.saleprice_per_carton
                    };
                    db.OrderDetails.Add(od);
                    db.SaveChanges();
                }
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        private int AddShopkeeperClient(int sid, int bid)
        {
            try
            {
                var data = (from p in db.ProviderLists
                            where p.seller_id == sid && p.buyer_id == bid
                            select p).FirstOrDefault();
                if (data == null)
                {
                    db.ProviderLists.Add(new ProviderList{ 
                       status="Allow",
                       security_amount=1,
                       seller_id=sid,
                       buyer_id=bid,
                       total_credit=0
                    });
                    db.SaveChanges();
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }


        [HttpPost]
        public HttpResponseMessage PLaceAnOrder(PlaceOrderClass po)
        {
            try
            {
                UserOrder uo = new UserOrder()
                {
                    order_status="pending",
                    order_type="credit",
                    order_state=0,
                    total_amount= po.total,
                    order_place_date= DateTime.Now.ToString("MM/dd/yyyy"),
                    order_deliver_date="",
                    seller_id= po.sid,
                    buyer_id= po.bid
                };
                db.UserOrders.Add(uo);
                if (db.SaveChanges() > 0)
                {
                    Console.WriteLine(uo.id);
                    //var oid = (from id in db.UserOrders.SqlQuery("select top 1 id from UserOrder order by id desc") select id).FirstOrDefault();
                    if (AddOrderDetails(uo.id, po.cartItems, (int)uo.seller_id))
                    {
                        AddShopkeeperClient((int)po.sid, (int)po.bid);
                        return Request.CreateResponse(HttpStatusCode.OK, "Order Placed Successfully");          
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                           "Something Went Wrong! Please try Again later");
                    }
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

        [HttpPut]
        public HttpResponseMessage UpdateOrderStatus(String OrderStatus,int Oid)
        {
            try
            {
                var data = (from o in db.UserOrders
                            where o.id == Oid
                            select o).FirstOrDefault();
                data.order_status = OrderStatus;
                db.SaveChanges();
                var check_userdata = db.UserAccounts.Where(u => u.id == data.seller_id).FirstOrDefault();
                if (data.order_status.Equals("delivered") && check_userdata.roles.Equals("Vendor"))
                {
                    data.order_deliver_date = DateTime.Now.ToString("MM/dd/yyyy");
                    data.order_state = 1;
                    var credit_Payments = db.ProviderLists.Where(cp => cp.seller_id == data.seller_id &&
                                  cp.buyer_id == data.buyer_id).FirstOrDefault();
                    credit_Payments.total_credit = credit_Payments.total_credit  + data.total_amount;
                    db.SaveChanges();
                    var orderedItems= (from oi in db.OrderDetails
                                       where oi.order_id == Oid
                                       select oi).ToList();
                    foreach (OrderDetail item in orderedItems)
                    {
                        int pid = (int)item.product_id;
                        int qty = (int)item.qty_ordred;
                        int price = (int)item.product_price;
                        db.OrderDetails.Remove(item);
                        db.SaveChanges();
                        var batches= (from bp in db.batch_production
                                      where bp.vendor_productid == pid
                                      select bp).ToList();
                        while (qty != 0)
                        {
                            foreach (batch_production batch in batches)
                            {
                                if (batch.no_of_cartons > 0 && batch.no_of_cartons <= qty && qty>0)
                                {
                                    int subTotal = (int)batch.no_of_cartons;
                                    batch.no_of_cartons = 0;
                                    db.OrderDetails.Add(new OrderDetail()
                                    {
                                        order_id = Oid,
                                        qty_ordred = subTotal,
                                        batch_no = batch.batch_no,
                                        product_id = batch.vendor_productid,
                                        product_price = price
                                    });
                                    db.SaveChanges();
                                    qty -= subTotal;
                                }
                                if (batch.no_of_cartons > 0 && batch.no_of_cartons > qty && qty>0)
                                {
                                    batch.no_of_cartons -= qty;
                                    db.OrderDetails.Add(new OrderDetail()
                                    {
                                        order_id = Oid,
                                        qty_ordred = qty,
                                        batch_no = batch.batch_no,
                                        product_id = batch.vendor_productid,
                                        product_price = price
                                    });
                                    db.SaveChanges();
                                    qty = 0;
                                }
                            }
                        }
                    }

                    int did = (int)data.buyer_id;
                    var userdata = db.UserAccounts.Where(u => u.id == did).FirstOrDefault();
                    if (userdata.roles.Equals("Distributor"))
                    {
                        var dbatches = (from odb in db.OrderDetails
                                        where odb.order_id == Oid
                                        select odb).ToList();
                        int checkpid = (int)dbatches[0].product_id;
                        int dproductId = 0;
                        var checkIfExists = db.DistributorProducts.Where(d => d.product_id == checkpid).FirstOrDefault();
                        if (checkIfExists != null) 
                        {
                            dproductId = checkIfExists.id;
                        }
                        else
                        {
                            DistributorProduct dP1 = new DistributorProduct()
                            {
                                saleprice_for_shopkeeper = 1200,
                                product_id = checkpid,
                                distributor_id = did
                            };
                            db.DistributorProducts.Add(dP1);
                            db.SaveChanges();
                            dproductId = dP1.id;
                        }
                        foreach (var dbatch in dbatches)
                        {
                            if (dbatch.product_id == checkpid)
                            {
                                db.DistributorProductDetails.Add(new DistributorProductDetail()
                                {
                                    no_of_cartons = dbatch.qty_ordred,
                                    batch_no = dbatch.batch_no,
                                    dproduct_id = dproductId
                                });
                                db.SaveChanges();
                            }
                            else
                            {
                                checkpid = (int)dbatch.product_id;
                                var checkIfExists1 = db.DistributorProducts.Where(d => d.product_id == checkpid).FirstOrDefault();
                                if (checkIfExists1 != null)
                                {
                                    dproductId = checkIfExists1.id;
                                }
                                else
                                {
                                    DistributorProduct dP = new DistributorProduct()
                                    {
                                        saleprice_for_shopkeeper = 1200,
                                        product_id = checkpid,
                                        distributor_id = did
                                    };
                                    db.DistributorProducts.Add(dP);
                                    db.SaveChanges();
                                    dproductId = dP.id;
                                }
                                db.DistributorProductDetails.Add(new DistributorProductDetail()
                                {
                                    no_of_cartons = dbatch.qty_ordred,
                                    batch_no = dbatch.batch_no,
                                    dproduct_id = dproductId
                                });
                                db.SaveChanges();
                            }
                        }
                    }
                }
                if (data.order_status.Equals("delivered") && check_userdata.roles.Equals("Distributor"))
                {
                    data.order_deliver_date = DateTime.Now.ToString("MM/dd/yyyy");
                    data.order_state = 1;
                    var credit_Payments = db.ProviderLists.Where(cp => cp.seller_id == data.seller_id &&
                                  cp.buyer_id == data.buyer_id).FirstOrDefault();
                    credit_Payments.total_credit = credit_Payments.total_credit + data.total_amount;
                    db.SaveChanges();
                    var orderedItems = (from oi in db.OrderDetails
                                        where oi.order_id == Oid
                                        select oi).ToList();
                    foreach (OrderDetail item in orderedItems)
                    {
                        int pid = (int)item.product_id;
                        int qty = (int)item.qty_ordred;
                        int price = (int)item.product_price;
                        db.OrderDetails.Remove(item);
                        db.SaveChanges();
                        var batches = (from bp in db.DistributorProductDetails
                                       where bp.dproduct_id == pid
                                       select bp).ToList();
                        while (qty != 0)
                        {
                            foreach (DistributorProductDetail batch in batches)
                            {
                                if (batch.no_of_cartons > 0 && batch.no_of_cartons <= qty && qty > 0)
                                {
                                    int subTotal = (int)batch.no_of_cartons;
                                    batch.no_of_cartons = 0;
                                    db.OrderDetails.Add(new OrderDetail()
                                    {
                                        order_id = Oid,
                                        qty_ordred = subTotal,
                                        batch_no = batch.batch_no,
                                        product_id = batch.dproduct_id,
                                        product_price = price
                                    });
                                    db.SaveChanges();
                                    qty -= subTotal;
                                }
                                if (batch.no_of_cartons > 0 && batch.no_of_cartons > qty && qty > 0)
                                {
                                    batch.no_of_cartons -= qty;
                                    db.OrderDetails.Add(new OrderDetail()
                                    {
                                        order_id = Oid,
                                        qty_ordred = qty,
                                        batch_no = batch.batch_no,
                                        product_id = batch.dproduct_id,
                                        product_price = price
                                    });
                                    db.SaveChanges();
                                    qty = 0;
                                }
                            }
                        }
                    }
                }
                    return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetOrdersRecieved(int uid,int bid, string status)
        {
            var remainig_amount = db.ProviderLists.Where(pl => pl.seller_id == uid && pl.buyer_id == bid).FirstOrDefault().total_credit;
            try
            {
                if (status.Equals("active"))
                {
                    var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.buyer_id equals u.id
                                where o.seller_id == uid && o.buyer_id == bid && (o.order_status.Equals("active") ||
                                o.order_status.Equals("packed") || o.order_status.Equals("ontheway"))
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
                                    oid = o.id,
                                    orderStatus = o.order_status,
                                    orderType = o.order_type,
                                    totalAmount = o.total_amount,
                                    total_credit=remainig_amount,
                                    orderPlaced = o.order_place_date,
                                    orderDeliver = o.order_deliver_date,
                                    ocats = (from od in db.OrderDetails
                                             join p in db.VendorProducts on od.product_id equals p.id
                                             where od.order_id == o.id
                                             select new
                                             {
                                                 category = p.category
                                             }).ToList()
                                });
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                else
                {
                    var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.buyer_id equals u.id
                                where o.seller_id == uid && o.buyer_id == bid && o.order_status.Equals(status)
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
                                    oid = o.id,
                                    orderStatus = o.order_status,
                                    orderType = o.order_type,
                                    totalAmount = o.total_amount,
                                    total_credit = remainig_amount,
                                    orderPlaced = o.order_place_date,
                                    orderDeliver = o.order_deliver_date,
                                    ocats = (from od in db.OrderDetails
                                             join p in db.VendorProducts on od.product_id equals p.id
                                             where od.order_id == o.id
                                             select new
                                             {
                                                 category = p.category
                                             }).ToList()
                                });
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
        [HttpGet]
        public HttpResponseMessage GetBuyers(int uid, string status)
        {
            try
            {
                List<object> filterData = new List<object>();
                if (status.Equals("active"))
                {
                   var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.buyer_id equals u.id
                                where o.seller_id == uid && (o.order_status.Equals("active") ||
                                o.order_status.Equals("packed") || o.order_status.Equals("ontheway"))
                                select new
                                {
                                    uid = u.id,
                                    uname = u.name,
                                    ucity = u.city,
                                    uemail = u.email,
                                    umobileno = u.mobile_no,
                                    baddress = u.address,
                                    uimage = u.image,
                                    utype = u.roles
                                }).ToList();
                    int id = 0;
                    foreach (var user in data)
                    {
                        if (user.uid != id)
                        {
                            filterData.Add(user);
                            id = user.uid;
                        }
                    }
                }
                else
                {
                    var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.buyer_id equals u.id
                                where o.seller_id == uid && o.order_status.Equals(status)
                                select new
                                {
                                    uid = u.id,
                                    uname = u.name,
                                    ucity = u.city,
                                    uemail = u.email,
                                    umobileno = u.mobile_no,
                                    baddress = u.address,
                                    uimage = u.image,
                                    utype = u.roles
                                });
                    int id = 0;
                    foreach (var user in data)
                    {
                        if (user.uid != id)
                        {
                            filterData.Add(user);
                            id = user.uid;
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, filterData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetOrdersPlaced(int uid, int sid, string status)
        {
            try
            {
                var remainig_amount = db.ProviderLists.Where(pl => pl.seller_id == sid && pl.buyer_id == uid).FirstOrDefault().total_credit;
                if (status.Equals("active"))
                {
                    var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.seller_id equals u.id
                                where o.buyer_id == uid && o.seller_id == sid && (o.order_status.Equals("active") ||
                                o.order_status.Equals("packed") || o.order_status.Equals("ontheway"))
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
                                    oid = o.id,
                                    orderStatus = o.order_status,
                                    orderType = o.order_type,
                                    total_credit = remainig_amount,
                                    totalAmount = o.total_amount,
                                    orderPlaced = o.order_place_date,
                                    orderDeliver = o.order_deliver_date,
                                    ocats = (from od in db.OrderDetails
                                             join p in db.VendorProducts on od.product_id equals p.id
                                             where od.order_id == o.id
                                             select new
                                             {
                                                 category = p.category
                                             }).ToList()
                                });
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                else
                {
                    var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.seller_id equals u.id
                                where o.buyer_id == uid && o.seller_id == sid && o.order_status.Equals(status)
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
                                    oid = o.id,
                                    orderStatus = o.order_status,
                                    orderType = o.order_type,
                                    totalAmount = o.total_amount,
                                    total_credit = remainig_amount,
                                    orderPlaced = o.order_place_date,
                                    orderDeliver = o.order_deliver_date,
                                    ocats = (from od in db.OrderDetails
                                             join p in db.VendorProducts on od.product_id equals p.id
                                             where od.order_id == o.id
                                             select new
                                             {
                                                 category = p.category
                                             }).ToList()
                                });
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }  
        
        [HttpGet]
        public HttpResponseMessage GetSellers(int uid, string status)
        {
            try
            {
                List<object> filterData = new List<object>();
                if (status.Equals("active"))
                {
                    var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.seller_id equals u.id
                                where o.buyer_id == uid && (o.order_status.Equals("active") ||
                                o.order_status.Equals("packed") || o.order_status.Equals("ontheway"))
                                select new
                                {
                                    uid = u.id,
                                    uname = u.name,
                                    ucity = u.city,
                                    uemail = u.email,
                                    umobileno = u.mobile_no,
                                    baddress = u.address,
                                    uimage = u.image,
                                    utype = u.roles
                                });
                    int id = 0;
                    foreach (var user in data)
                    {
                        if (user.uid != id)
                        {
                            filterData.Add(user);
                            id = user.uid;
                        }
                    }
                }
                else
                {
                    var data = (from o in db.UserOrders
                                join u in db.UserAccounts on o.seller_id equals u.id
                                where o.buyer_id == uid && o.order_status.Equals(status)
                                select new
                                {
                                    uid = u.id,
                                    uname = u.name,
                                    ucity = u.city,
                                    uemail = u.email,
                                    umobileno = u.mobile_no,
                                    baddress = u.address,
                                    uimage = u.image,
                                    utype = u.roles
                                });
                    int id = 0;
                    foreach (var user in data)
                    {
                        if (user.uid != id)
                        {
                            filterData.Add(user);
                            id = user.uid;
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, filterData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        private int filterOrderDetail(int pid, List<DistributorProductOrdered> list)
        {
            foreach(var i in list)
            {
                if (i.pid == pid)
                {
                    return 1;
                }
            }
            return 0;
        }

        [HttpGet]
        public HttpResponseMessage GetOrderDetail(int oid)
        {
            try
            {
                var filterData = new List<DistributorProductOrdered>();
                var data = (from od in db.OrderDetails
                            join p in db.VendorProducts on od.product_id equals p.id
                            where od.order_id == oid
                            select new DistributorProductOrdered()
                            {
                                pid= (int)od.product_id,
                                qtyOdered= (int)od.qty_ordred,
                                pname=p.name,
                                pimage=p.image,
                                price= (int)od.product_price
                            }).ToList();
                //int id = 0;
                foreach(var i in data)
                {
                    int result = filterOrderDetail(i.pid, filterData);
                    if (result == 0)
                    {
                        filterData.Add(i);
                    }
                    else
                    {
                        foreach(var n in filterData)
                        {
                            if (n.pid == i.pid)
                            {
                                n.qtyOdered = n.qtyOdered + i.qtyOdered;
                            }
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, filterData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetDistributorOrderDetail(int oid)
        {
            try
            {
                var data = (from od in db.OrderDetails
                            join p in db.DistributorProducts on od.product_id equals p.id
                            where od.order_id == oid
                            select new
                            {
                                pid = p.product_id,
                                qtyOdered = od.qty_ordred,
                                saleprice_per_carton=p.saleprice_for_shopkeeper
                            }).ToList();
                List<DistributorProductOrdered> filterdata = new List<DistributorProductOrdered>();
                foreach (var item in data)
                {
                    var vp = db.VendorProducts.Where(p => p.id == item.pid).FirstOrDefault();
                    filterdata.Add(new DistributorProductOrdered
                        {
                        pid = (int)item.pid,
                        qtyOdered = (int)item.qtyOdered,
                        pname = vp.name,
                        pimage = vp.image,
                        price = (int)item.saleprice_per_carton
                    }
                        );
                }
                return Request.CreateResponse(HttpStatusCode.OK, filterdata);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateOrderType(int Oid)
        {
            try
            {
                var data = (from o in db.UserOrders
                            where o.id == Oid
                            select o).FirstOrDefault();
                if (data.order_type.Equals("cash"))
                {
                    data.order_type = "credit";
                    db.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage SaveUserRating(Rating ur)
        {
            try
            {
                var data = (from r in db.Ratings
                            where r.oid == ur.oid && r.reciever_id==ur.reciever_id 
                            select r).FirstOrDefault();
                if (data!=null)
                {
                    data.no_of_stars = ur.no_of_stars;
                    db.SaveChanges();
                }
                else
                {
                    db.Ratings.Add(ur);
                    db.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetUserRating(Nullable<int> uid)
        {
            try
            {
                var data = db.Ratings.Where(r => r.reciever_id == uid).Average(i => i.no_of_stars);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}


//ocats = (from od in db.OrderDetails
//         join p in db.VendorProducts on od.product_id equals p.id
//         where od.order_id == o.id
//         select new
//         {
//             category = p.category
//         }).ToList()