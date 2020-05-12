using Core.Entities;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data.Repositories
{
   internal class TeacherRepository : ITeacherRepository
   {
      public IEnumerable<Teacher> GetAll()
      {
         return MockDatabase.Teachers;
      }

      public Teacher Get(int id)
      {
         return MockDatabase.Teachers.SingleOrDefault(t => t.Id == id);
      }

      public Teacher Add(Teacher teacher)
      {
         teacher.Id = 1;

         if (MockDatabase.Teachers.Count > 0)
            teacher.Id = MockDatabase.Teachers.Max(t => t.Id) + teacher.Id;

         MockDatabase.Teachers.Add(teacher);

         AddRefence(teacher);
        
         return teacher;
      }

      public void Update(Teacher teacher)
      {
         for (int i = 0; i < MockDatabase.Teachers.Count; i++)
         {
            if (MockDatabase.Teachers[i].Id == teacher.Id)
            {
               DeleteReference(teacher.Id);

               AddRefence(teacher);

               MockDatabase.Teachers[i] = teacher;
               break;
            }
         }
      }

      public void Delete(int id)
      {
         MockDatabase.Teachers = MockDatabase.Teachers.Where(t => t.Id != id).ToList();
         DeleteReference(id);
      }

      private void AddRefence(Teacher teacher)
      {
         if (teacher.Subjects != null && teacher.Subjects.Any())
         {
            foreach (var item in teacher.Subjects)
            {
               Subject subject = MockDatabase.Subjects.Single(s => s.Id == item.Id);

               if (subject.Teachers == null)
                  subject.Teachers = new List<Teacher>();

               subject.Teachers.Add(teacher);
            }
         }
      }

      private void DeleteReference(int id)
      {
         foreach (Subject subject in MockDatabase.Subjects)
         {
            if (subject.Teachers != null)
            {
               while (subject.Teachers.Any(t => t.Id == id))
               {
                  subject.Teachers.Remove(subject.Teachers.First(t => t.Id == id));
               }
            }
         }
      }
   }
}
