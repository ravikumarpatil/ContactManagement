using System.ComponentModel.DataAnnotations;

namespace ContactManagement.Data.Entity
{

	public partial class Contact
	{
		public int Id { get; set; }

		[Required]
		[StringLength(50)]
		public string FirstName { get; set; }

		[Required]
		[StringLength(50)]
		public string LastName { get; set; }

		[Required]
		[StringLength(200)]
		public string Email { get; set; }

		[StringLength(20)]
		public string PhoneNumber { get; set; }

		[Required]
		[StringLength(50)]
		public string Status { get; set; }
	}
}
