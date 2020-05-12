using Core.Entities;
using Core.Factories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Repositories
{
   public interface ITeacherRepository : IRepository<Teacher>, IRepositoryFactory
   {
   }
}
