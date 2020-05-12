using Core.Entities;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data.Repositories
{
   internal class SubjectRepository : ISubjectRepository
   {
      public IEnumerable<Subject> GetAll()
      {
         return MockDatabase.Subjects;
      }

      public Subject Get(int id)
      {
         return MockDatabase.Subjects.SingleOrDefault(t => t.Id == id);
      }

      public Subject Add(Subject subject)
      {
         subject.Id = 1;

         if (MockDatabase.Subjects.Count > 0)
            subject.Id = MockDatabase.Subjects.Max(t => t.Id) + subject.Id;

         MockDatabase.Subjects.Add(subject);

         AddRefence(subject);

         return subject;
      }

      public void Update(Subject subject)
      {
         for (int i = 0; i < MockDatabase.Subjects.Count; i++)
         {
            if (MockDatabase.Subjects[i].Id == subject.Id)
            {
               DeleteReference(subject.Id);

               AddRefence(subject);

               MockDatabase.Subjects[i] = subject;
               break;
            }
         }
      }

      public void Delete(int id)
      {
         MockDatabase.Subjects = MockDatabase.Subjects.Where(t => t.Id != id).ToList();
         DeleteReference(id);
      }

      private void AddRefence(Subject subject)
      {
         if (subject.Teachers != null && subject.Teachers.Any())
         {
            foreach (var item in subject.Teachers)
            {
               Teacher teacher = MockDatabase.Teachers.Single(s => s.Id == item.Id);

               if (teacher.Subjects == null)
                  teacher.Subjects = new List<Subject>();

               teacher.Subjects.Add(subject);
            }
         }
      }

      private void DeleteReference(int id)
      {
         foreach (Teacher teacher in MockDatabase.Teachers)
         {
            if (teacher.Subjects != null)
            {
               while (teacher.Subjects.Any(t => t.Id == id))
               {
                  teacher.Subjects.Remove(teacher.Subjects.First(t => t.Id == id));
               }
            }
         }
      }
   }
}
