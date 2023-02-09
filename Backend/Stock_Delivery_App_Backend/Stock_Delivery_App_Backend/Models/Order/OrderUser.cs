using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stock_Delivery_App_Backend.Models.Order
{
    public class OrderUser
    {
        public int uid { get; set; }
        public string uname { get; set; }
        public string ucity { get; set; }
        public string uemail { get; set; }
        public string umobileno { get; set; }
        public string baddress { get; set; }
        public string uimage { get; set; }
        public string utype { get; set; }
    }
}