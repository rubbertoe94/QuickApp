// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Helpers;
using QuickApp.ViewModels;
using System;
using System.Collections.Generic;

namespace QuickApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;

        public UserController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<UserController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }



        // GET: api/values
        [HttpGet("allUsers")]
        public IActionResult GetAllUsers()
        {
            var allUsers = _unitOfWork.Users.GetAllUsers();
            return Ok(allUsers);
        }

        [HttpGet("throw")]
        public IEnumerable<User> Throw()
        {
            throw new InvalidOperationException($"This is a test exception: {DateTime.Now}");
        }


        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var User = _unitOfWork.Users.GetUserById(id);
            return Ok(User);
        }



        // POST api/values
        [HttpPost("addUser")]
        public IActionResult Post([FromBody] PBUserViewModel data)
        {
            _unitOfWork.Users.AddUser(_mapper.Map<User>(data));
            _unitOfWork.SaveChanges();
            return Ok(data);
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User data)
        {
            var userToUpdate = _unitOfWork.Users.GetUserById(id);

            if (userToUpdate != null)
            {
                try
                {
                    userToUpdate.Name = data.Name;

                    _unitOfWork.Users.UpdateUser(userToUpdate);
                    _unitOfWork.SaveChanges();
                    return Ok(data);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"an error occured: {ex.Message}");
                }
            }
            return NotFound();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = _unitOfWork.Users.Get(id);
            _unitOfWork.Users.Remove(user);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}
