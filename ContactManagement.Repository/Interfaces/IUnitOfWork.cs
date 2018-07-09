using System;

namespace ContactManagement.Repository.Interfaces
{
	public interface IUnitOfWork : IDisposable
	{
		IContactRepository Contacts { get; }
		int SaveChanges();
	}
}
