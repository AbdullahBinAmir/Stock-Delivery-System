using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stock_Delivery_App_Backend.Models.Order
{
    public class DistributorProductOrdered
    {
        public int pid { get; set; }
        public int qtyOdered { get; set; }
        public string pname { get; set; }
        public string pimage { get; set; }
        public int price { get; set; }

    }
}