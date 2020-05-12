using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
   public class Subject : IEntity
   {
      public int Id { get; set; }
      public string Name { get; set; }

      public IList<Teacher> Teachers { get; set; }

      public Subject()
      {
         Teachers = new List<Teacher>();
      }
   }
}
