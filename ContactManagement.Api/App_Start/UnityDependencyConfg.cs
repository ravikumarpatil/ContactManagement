using ContactManagement.Repository.Interfaces;
using ContactManagement.Repository.Repositories;
using ContactManagement.Service.Interfaces;
using ContactManagement.Service.Services;
using System.Web.Http;
using Unity;
using Unity.Lifetime;

namespace ContactManagement.Api.App_Start
{
	public class UnityDependencyConfg
	{
		public static void Register(HttpConfiguration configuration)
		{
			var container = new UnityContainer();

			container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());
			container.RegisterType<IContactService, ContactService>(new HierarchicalLifetimeManager());

			configuration.DependencyResolver = new UnityResolver(container);
		}
	}
}