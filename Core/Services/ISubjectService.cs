using Core.Entities;
using Core.Factories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Services
{
   public interface ISubjectService : IServiceFactory
   {
      IEnumerable<Subject> GetAll();
      Subject Get(int id);
      Subject Add(Subject subject);
      void Update(Subject subject);
      void Delete(int id);
   }
}
