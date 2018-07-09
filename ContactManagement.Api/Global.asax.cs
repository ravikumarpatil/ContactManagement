using ContactManagement.Api.App_Start;
using System.Web;
using System.Web.Http;

namespace ContactManagement.Api
{
	public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
			UnityDependencyConfg.Register(GlobalConfiguration.Configuration);

		}
    }
}
