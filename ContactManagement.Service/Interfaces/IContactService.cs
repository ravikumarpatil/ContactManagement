using ContactManagement.Service.Models;
using System.Collections.Generic;

namespace ContactManagement.Service.Interfaces
{
	public interface IContactService
	{
		IEnumerable<ContactModel> GetAllContacts();
		ContactModel GetById(int id);
		bool AddContact(ContactModel contact);
		bool UpdateContact(ContactModel contact);
		bool DeleteContact(int id);
	}
}
