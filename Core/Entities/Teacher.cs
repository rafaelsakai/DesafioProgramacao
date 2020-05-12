using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
   public class Teacher : IEntity
   {
      public int Id { get; set; }
      public string Name { get; set; }

      public IList<Subject> Subjects { get; set; }

      public Teacher()
      {
         Subjects = new List<Subject>();
      }
   }
}
