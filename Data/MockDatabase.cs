using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data
{
   public static class MockDatabase
   {
      public static List<Teacher> Teachers = new List<Teacher>();
      public static List<Subject> Subjects = new List<Subject>();

      static MockDatabase()
      {
         Teachers = new List<Teacher>()
         {
            new Teacher() { Id = 1, Name = "Maria Franco" },
            new Teacher() { Id = 2, Name = "Rodolfo Nogueira" },
            new Teacher() { Id = 3, Name = "Miriam Fonseca" },
            new Teacher() { Id = 4, Name = "Roberto Agusto de Souza" },
            new Teacher() { Id = 5, Name = "Ana Luiza" }
         };

         Subjects = new List<Subject>()
         {
            new Subject() { Id = 1, Name = "Matemática" },
            new Subject() { Id = 2, Name = "Português" },
            new Subject() { Id = 3, Name = "História" },
            new Subject() { Id = 4, Name = "Geografia" },
            new Subject() { Id = 5, Name = "Filosofia" },
            new Subject() { Id = 6, Name = "Biologia" },
            new Subject() { Id = 7, Name = "Ciências" },
            new Subject() { Id = 8, Name = "Educação Física" },
            new Subject() { Id = 9, Name = "Literatura" },
            new Subject() { Id = 10, Name = "Química" },
            new Subject() { Id = 11, Name = "Sociologia" }
         };
      }
   }
}
