using Core.Factories;
using Core.Repositories;
using Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Factories
{
   public static class RepositoryFactory
   {
      public static T CreateRepository<T>(this IServiceProvider sp) where T : IRepositoryFactory
      {
         IRepositoryFactory repository = null;

         if (typeof(T) == typeof(ITeacherRepository))
            repository = new TeacherRepository();

         if (typeof(T) == typeof(ISubjectRepository))
            repository = new SubjectRepository();

         if (repository == null)
            throw new ArgumentOutOfRangeException(typeof(T).Name, "Repository not found.");

         return (T)repository;
      }
   }
}
