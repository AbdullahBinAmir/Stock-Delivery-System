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
    
    public partial class batch_production
    {
        public int batch_no { get; set; }
        public Nullable<int> no_of_cartons { get; set; }
        public string mfg_date { get; set; }
        public string expiry_date { get; set; }
        public Nullable<int> vendor_productid { get; set; }
    }
}
