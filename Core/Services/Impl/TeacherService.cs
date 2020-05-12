using Core.Entities;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;

namespace Core.Services.Impl
{
   internal class TeacherService : ITeacherService
   {
      private readonly ITeacherRepository _repository;

      internal TeacherService(ITeacherRepository repository)
      {
         _repository = repository;
      }

      public IEnumerable<Teacher> GetAll()
      {
         return _repository.GetAll();
      }

      public Teacher Get(int id)
      {
         return _repository.Get(id);
      }

      public Teacher Add(Teacher teacher)
      {
         return _repository.Add(teacher);
      }

      public void Update(Teacher teacher)
      {
         _repository.Update(teacher);
      }

      public void Delete(int id)
      {
         _repository.Delete(id);
      }
   }
}
