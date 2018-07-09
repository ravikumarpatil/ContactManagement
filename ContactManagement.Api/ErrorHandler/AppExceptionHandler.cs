using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

//using System.Data.Entity.Validation;


namespace ContactManagement.Api.ErrorHandler
{
	[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
	public class AppExceptionFilterAttribute : ExceptionFilterAttribute
	{
		public override void OnException(HttpActionExecutedContext context)
		{
			bool isDbEntityValidationException = false;
			if (context.Exception is NotImplementedException)
				context.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
			//else if (context.Exception is DbEntityValidationException)
			//{
			//	isDbEntityValidationException = true;
			//	var dbEx = context.Exception as DbEntityValidationException;
			//	string exceptionMessage = "";
			//	foreach (var validationErrors in dbEx.EntityValidationErrors)
			//	{
			//		foreach (var validationError in validationErrors.ValidationErrors)
			//		{
			//			exceptionMessage += string.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
			//		}
			//	}

			//	context.Response = context.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exceptionMessage, context.Exception);

			//	//TODO:: Log Exception
			//}
			else if (context.Exception is Exception)
				context.Response = context.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, context.Exception.Message, context.Exception);

			if (!isDbEntityValidationException)
			{
				//TODO:: Log Exception
			}
		}
	}

}