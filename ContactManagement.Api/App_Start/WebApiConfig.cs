using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Swashbuckle.Application;
using System.Collections.Generic;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ContactManagement.Api
{
	public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

			//Use JSON friendly default settings
			var defaultSettings = new JsonSerializerSettings
			{
				Formatting = Formatting.Indented,
				ContractResolver = new CamelCasePropertyNamesContractResolver(),
				Converters = new List<JsonConverter> { new StringEnumConverter { CamelCaseText = true }, }
			};
			JsonConvert.DefaultSettings = () => { return defaultSettings; };
			//Specify JSON as the default media type
			config.Formatters.Clear();
			config.Formatters.Add(new JsonMediaTypeFormatter());
			config.Formatters.JsonFormatter.SerializerSettings = defaultSettings;


			// Web API configuration and services

			// Web API routes
			config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

			// Redirect root to Swagger UI
			config.Routes.MapHttpRoute(
				name: "Swagger UI",
				routeTemplate: "",
				defaults: null,
				constraints: null,
				handler: new RedirectHandler(SwaggerDocsConfig.DefaultRootUrlResolver, "swagger/ui/index"));

			var enableCorsAttribute = new EnableCorsAttribute("*",
											   "Origin, Content-Type, Accept, Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods",
											   "GET, PUT, POST, DELETE, OPTIONS");
			config.EnableCors(enableCorsAttribute);
		}
    }
}
