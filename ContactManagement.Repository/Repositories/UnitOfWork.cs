using ContactManagement.Data.Entity;
using ContactManagement.Repository.Interfaces;

namespace ContactManagement.Repository.Repositories
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly ContactManagementContext _context;
		public IContactRepository Contacts { get; private set; }

		public UnitOfWork()
		{
			_context = new ContactManagementContext();
			Contacts = new ContactRepository(_context);
		}

		public int SaveChanges()
		{
			return _context.SaveChanges();
		}

		public void Dispose()
		{
			_context.Dispose();
		}
	}
}
