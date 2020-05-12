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
   public class SubjectController : ControllerBase
   {
      private readonly ISubjectService _service;

      public SubjectController(ISubjectService service)
      {
         _service = service;
      }

      [HttpGet]
      [Route("GetAll")]
      public IEnumerable<Subject> GetAll()
      {
         return _service.GetAll();
      }

      [HttpGet]
      [Route("Get/{id}")]
      public Subject Get(int id)
      {
         return _service.Get(id);
      }

      [HttpPost]
      [Route("Add")]
      public int Add([FromBody]Subject subject)
      {
         return _service.Add(subject).Id;
      }

      [HttpPut]
      [Route("Edit")]
      public void Edit([FromBody]Subject subject)
      {
         _service.Update(subject);
      }

      [HttpDelete]
      [Route("Delete/{id}")]
      public void Delete(int id)
      {
         _service.Delete(id);
      }
   }
}