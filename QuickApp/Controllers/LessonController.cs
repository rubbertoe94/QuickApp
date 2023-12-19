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
    public class LessonController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;

        public LessonController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<LessonController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }



        // GET: api/values
        [HttpGet("allLessons")]
        public IActionResult GetAllLessons()
        {
            var allLessons = _unitOfWork.Lessons.GetAllLessons();
            return Ok(allLessons);
        }

        [HttpGet("throw")]
        public IEnumerable<Lesson> Throw()
        {
            throw new InvalidOperationException($"This is a test exception: {DateTime.Now}");
        }


        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetLessonById(int id)
        {
            var lesson = _unitOfWork.Lessons.GetLessonById(id);
            return Ok(lesson);
        }



        // POST api/values
        [HttpPost("addLesson")]
        public IActionResult Post([FromBody] Lesson data)
        {
            _unitOfWork.Lessons.AddLesson(data);
            _unitOfWork.SaveChanges();
            return Ok(data);
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Lesson data)
        {
            var lessonToUpdate = _unitOfWork.Lessons.GetLessonById(id);

            if (lessonToUpdate != null)
            {
                try
                {
                    lessonToUpdate.Date = data.Date;
                    lessonToUpdate.CoachId = data.CoachId;
                    lessonToUpdate.LocationId = data.LocationId;
                    lessonToUpdate.CourtId = data.CourtId;


                    _unitOfWork.Lessons.UpdateLesson(lessonToUpdate);
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
            var lesson = _unitOfWork.Lessons.Get(id);
            _unitOfWork.Lessons.Remove(lesson);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}
