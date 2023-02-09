using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stock_Delivery_App_Backend.Models.Order
{
    public class CartItems
    {
        public Nullable<int> qty_ordred { get; set; }
        public Nullable<int> product_id { get; set; }
    }
}