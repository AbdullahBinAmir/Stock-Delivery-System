using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stock_Delivery_App_Backend.Models.Order
{
    public class PlaceOrderClass
    {
        public Nullable<int> sid { get; set; }
        public Nullable<int>  bid { get; set; }
        public Nullable<int> total { get; set; }
        public List<CartItems> cartItems { get; set; }
    }
}