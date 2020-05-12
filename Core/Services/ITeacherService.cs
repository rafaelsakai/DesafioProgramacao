using Core.Entities;
using Core.Factories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Services
{
   public interface ITeacherService : IServiceFactory
   {
      IEnumerable<Teacher> GetAll();
      Teacher Get(int id);
      Teacher Add(Teacher teacher);
      void Update(Teacher teacher);
      void Delete(int id);
   }
}
