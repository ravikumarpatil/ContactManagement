using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ContactManagement.Repository.Interfaces
{
	public interface IRepository<TEntity> where TEntity : class
	{
		IEnumerable<TEntity> Get(string includeProperties = "");
		TEntity GetById(object id);
		IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
		TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

		void Add(TEntity entity);
		void AddRange(IEnumerable<TEntity> entities);

		void Update(TEntity entityToUpdate);

		void Remove(object id);
		void Remove(TEntity entityToDelete);
		void RemoveRange(IEnumerable<TEntity> entities);

		IEnumerable<TEntity> GetFromSQL(string sql);
	}
}
