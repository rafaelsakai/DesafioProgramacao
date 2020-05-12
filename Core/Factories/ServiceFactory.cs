using Core.Entities;
using Core.Repositories;
using Core.Services;
using Core.Services.Impl;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;

namespace Core.Factories
{
   public static class ServiceFactory
   {
      public static T CreateService<T>(this IServiceProvider sp, IRepositoryFactory repository) where T : IServiceFactory
      {
         IServiceFactory service = null;

         if (typeof(T) == typeof(ITeacherService))
            service = new TeacherService((ITeacherRepository)repository);

         if (typeof(T) == typeof(ISubjectService))
            service = new SubjectService((ISubjectRepository)repository);

         if (service == null)
            throw new ArgumentOutOfRangeException(typeof(T).Name, "Service not found.");

         return (T)service;
      }
   }
}
