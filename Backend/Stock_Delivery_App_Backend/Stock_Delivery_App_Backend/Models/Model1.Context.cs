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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Backend_FYP_DBEntities : DbContext
    {
        public Backend_FYP_DBEntities()
            : base("name=Backend_FYP_DBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<batch_production> batch_production { get; set; }
        public virtual DbSet<BlockUser> BlockUsers { get; set; }
        public virtual DbSet<DistributorProduct> DistributorProducts { get; set; }
        public virtual DbSet<DistributorProductDetail> DistributorProductDetails { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<ProviderList> ProviderLists { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }
        public virtual DbSet<UserAccount> UserAccounts { get; set; }
        public virtual DbSet<UserAuthentication> UserAuthentications { get; set; }
        public virtual DbSet<UserOrder> UserOrders { get; set; }
        public virtual DbSet<VendorDistributor> VendorDistributors { get; set; }
        public virtual DbSet<VendorProduct> VendorProducts { get; set; }
        public virtual DbSet<CreditPayment> CreditPayments { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<ReturnProduct> ReturnProducts { get; set; }
    }
}
