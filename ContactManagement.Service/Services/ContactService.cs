using ContactManagement.Data.Entity;
using ContactManagement.Repository.Interfaces;
using ContactManagement.Service.Interfaces;
using ContactManagement.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using static ContactManagement.Service.Models.ContactStatusEnum;

namespace ContactManagement.Service.Services
{
	public class ContactService : IContactService
	{
		private readonly IUnitOfWork _unitOfWork;

		public ContactService(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork ?? throw new ArgumentNullException("Unit of work is null.");
		}

		public IEnumerable<ContactModel> GetAllContacts()
		{
			return _unitOfWork.Contacts.Get()
				.Where(c => c.Status == ContactStatus.Active.ToString())
				.Select(c => MapDataModelToModel(c));
		}

		public ContactModel GetById(int id)
		{
			var contact = _unitOfWork.Contacts.GetById(id);
			return MapDataModelToModel(contact);
		}

		public bool AddContact(ContactModel contactModel)
		{
			contactModel.Status = ContactStatus.Active.ToString();
			_unitOfWork.Contacts.Add(MapModelToDataModel(contactModel));
			return _unitOfWork.SaveChanges() > 0;
		}

		public bool UpdateContact(ContactModel contactModel)
		{
			var contact = MapModelToDataModel(contactModel);
			_unitOfWork.Contacts.Update(contact);
			return _unitOfWork.SaveChanges() > 0;
		}

		public bool DeleteContact(int id)
		{
			var contact = _unitOfWork.Contacts.GetById(id);
			contact.Status = ContactStatus.InActive.ToString();
			_unitOfWork.Contacts.Update(contact);
			return _unitOfWork.SaveChanges() > 0;
		}

		private ContactModel MapDataModelToModel(Contact contact)
		{
			return new ContactModel
			{
				Id = contact.Id,
				FirstName = contact.FirstName,
				LastName = contact.LastName,
				Email = contact.Email,
				PhoneNumber = contact.PhoneNumber,
				Status = contact.Status
			};
		}

		private Contact MapModelToDataModel(ContactModel contactModel)
		{
			return new Contact
			{
				Id = contactModel.Id,
				FirstName = contactModel.FirstName,
				LastName = contactModel.LastName,
				Email = contactModel.Email,
				PhoneNumber = contactModel.PhoneNumber,
				Status = contactModel.Status
			};
		}
	}
}
