using System.Data.Entity;

namespace ContactManagement.Data.Entity
{
	public partial class ContactManagementContext: DbContext
	{
		public ContactManagementContext()
			:base("name=ContactManagementContext")
		{

		}

		public virtual DbSet<Contact> Contacts { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			//base.OnModelCreating(modelBuilder);
		}
	}
}
