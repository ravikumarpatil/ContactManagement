using ContactManagement.Data.Entity;
using ContactManagement.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace ContactManagement.Repository.Repositories
{
	public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
	{
		protected readonly ContactManagementContext Context;
		internal DbSet<TEntity> dbSet;

		public Repository(ContactManagementContext context)
		{
			Context = context;
			dbSet = context.Set<TEntity>();
		}

		#region Get

		public IEnumerable<TEntity> Get(string includeProperties = "")
		{
			IQueryable<TEntity> query = dbSet;

			foreach (var includeProperty in includeProperties.Split
				(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
			{
				query = query.Include(includeProperty);
			}

			return query.ToList();
		}

		public TEntity GetById(object id)
		{
			return dbSet.Find(id);
		}

		public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
		{
			return dbSet.Where(predicate);
		}

		public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
		{
			return dbSet.SingleOrDefault(predicate);
		}

		public IEnumerable<TEntity> GetFromSQL(string sql)
		{
			return Context.Database.SqlQuery<TEntity>(sql);
		}

		#endregion

		#region Add

		public void Add(TEntity entity)
		{
			dbSet.Add(entity);
		}

		public void AddRange(IEnumerable<TEntity> entities)
		{
			dbSet.AddRange(entities);
		}

		#endregion

		#region Update

		public void Update(TEntity entityToUpdate)
		{
			dbSet.Attach(entityToUpdate);
			Context.Entry(entityToUpdate).State = EntityState.Modified;
		}

		#endregion

		#region Remove

		public void Remove(object id)
		{
			TEntity entityToDelete = dbSet.Find(id);
			Remove(entityToDelete);
		}

		public void Remove(TEntity entityToDelete)
		{
			if (Context.Entry(entityToDelete).State == EntityState.Detached)
			{
				dbSet.Attach(entityToDelete);
			}
			dbSet.Remove(entityToDelete);

		}

		public void RemoveRange(IEnumerable<TEntity> entities)
		{
			dbSet.RemoveRange(entities);
		}

		#endregion

	}
}
