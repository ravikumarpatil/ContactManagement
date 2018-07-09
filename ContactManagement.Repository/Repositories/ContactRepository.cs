using ContactManagement.Data.Entity;
using ContactManagement.Repository.Interfaces;

namespace ContactManagement.Repository.Repositories
{
	public class ContactRepository : Repository<Contact>, IContactRepository
	{
		public ContactRepository(ContactManagementContext context) : base(context)
		{
		}
	}
}
