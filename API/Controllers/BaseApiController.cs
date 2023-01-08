using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Core;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController: ControllerBase
    {
        private IMediator _mediator;

        //??= check _mediator is null. !null: assign it, null: get a new one
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();  

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result == null) return NotFound();
            if(result.IsSuccess && result.Value != null)
                return Ok(result.Value);    // 202
            if(result.IsSuccess && result.Value == null)
                return NotFound();  // 404
            return BadRequest(result.Error);
        }
    }




}