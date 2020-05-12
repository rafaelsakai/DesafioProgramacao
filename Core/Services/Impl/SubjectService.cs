using Core.Entities;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;

namespace Core.Services.Impl
{
   internal class SubjectService : ISubjectService
   {
      private readonly ISubjectRepository _repository;

      internal SubjectService(ISubjectRepository repository)
      {
         _repository = repository;
      }

      public IEnumerable<Subject> GetAll()
      {
         return _repository.GetAll();
      }

      public Subject Get(int id)
      {
         return _repository.Get(id);
      }

      public Subject Add(Subject subject)
      {
         return _repository.Add(subject);
      }

      public void Update(Subject subject)
      {
         _repository.Update(subject);
      }

      public void Delete(int id)
      {
         _repository.Delete(id);
      }
   }
}
