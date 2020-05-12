using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Site.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class TeacherController : ControllerBase
   {
      private readonly ITeacherService _service;

      public TeacherController(ITeacherService service)
      {
         _service = service;
      }

      [HttpGet]
      [Route("GetAll")]
      public IEnumerable<Teacher> GetAll()
      {
         return _service.GetAll();
      }

      [HttpGet]
      [Route("Get/{id}")]
      public Teacher Get(int id)
      {
         return _service.Get(id);
      }

      [HttpPost]
      [Route("Add")]
      public int Add([FromBody]Teacher teacher)
      {
         return _service.Add(teacher).Id;
      }

      [HttpPut]
      [Route("Edit")]
      public void Edit([FromBody]Teacher teacher)
      {
         _service.Update(teacher);
      }

      [HttpDelete]
      [Route("Delete/{id}")]
      public void Delete(int id)
      {
         _service.Delete(id);
      }
   }
}