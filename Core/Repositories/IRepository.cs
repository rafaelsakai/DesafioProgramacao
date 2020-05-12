using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Repositories
{
   public interface IRepository<T> where T : IEntity
   {
      IEnumerable<T> GetAll();
      T Get(int id);
      T Add(T entity);
      void Update(T entity);
      void Delete(int id);
   }
}
