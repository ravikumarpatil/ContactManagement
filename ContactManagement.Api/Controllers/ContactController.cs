using ContactManagement.Api.ErrorHandler;
using ContactManagement.Service.Interfaces;
using ContactManagement.Service.Models;
using System;
using System.Web.Http;

namespace ContactManagement.Api.Controllers
{

	[AppExceptionFilter]
	[RoutePrefix("api/Contact")]
	public class ContactController : ApiController
    {
		private readonly IContactService _contactService;
		public ContactController(IContactService contactService)
		{
			_contactService = contactService ?? throw new ArgumentNullException("Contact service is null.");
		}

		// GET: api/Contact
		public IHttpActionResult Get()
		{
			var result = _contactService.GetAllContacts();
			return Ok(result);
		}

		// GET: api/Contact/5
		public IHttpActionResult Get(int id)
		{
			var result = _contactService.GetById(id);
			return Ok(result);
		}

		// POST: api/Contact
		[HttpPost]
		public bool Post(ContactModel contact)
		{
			return _contactService.AddContact(contact);
		}

		// PUT: api/Contact
		[HttpPut]
		public bool Put(ContactModel contact)
		{
			return _contactService.UpdateContact(contact);
		}

		// DELETE: api/Contact/5
		[HttpDelete]
		public bool Delete(int id)
		{
			return _contactService.DeleteContact(id);
		}
	}
}
