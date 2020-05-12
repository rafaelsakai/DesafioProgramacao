using Core.Entities;
using Core.Factories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Repositories
{
   public interface ISubjectRepository : IRepository<Subject>, IRepositoryFactory
   {
   }
}
