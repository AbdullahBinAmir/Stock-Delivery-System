//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Stock_Delivery_App_Backend.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class OrderDetail
    {
        public int id { get; set; }
        public Nullable<int> order_id { get; set; }
        public Nullable<int> qty_ordred { get; set; }
        public Nullable<int> batch_no { get; set; }
        public Nullable<int> product_id { get; set; }
        public Nullable<int> product_price { get; set; }
    }
}