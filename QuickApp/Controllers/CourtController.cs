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
    public class CourtController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;

        public CourtController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<CourtController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }

     

        // GET: api/values
        [HttpGet("allCourts")]
        public IActionResult GetAllCourts()
        {
            var allCourts = _unitOfWork.Courts.GetAllCourts();
            return Ok(_mapper.Map<IEnumerable<CourtViewModel>>(allCourts));       
        }

        [HttpGet("throw")]
        public IEnumerable<Court> Throw()
        {
            throw new InvalidOperationException($"This is a test exception: {DateTime.Now}");
        }


        // GET api/values/5
        [HttpGet("locationId/{id}")]
        public IActionResult GetCourtsByLocationId(int id)
        {
            var courts = _unitOfWork.Courts.GetCourtsByLocationId(id);
            return Ok(_mapper.Map<IEnumerable<CourtViewModel>>(courts));
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetCourtById(int id)
        {
            var court = _unitOfWork.Courts.GetCourtById(id);
            return Ok(_mapper.Map<CourtViewModel>(court));
        }



        // POST api/values
        [HttpPost("addCourt")]
        public IActionResult Post([FromBody] CourtViewModelAddOrEdit data)
        {
            if (!ModelState.IsValid)
            {
                // Model validation failed; return 400 Bad Request with error messages
                return BadRequest(ModelState);
            }

            // Check for duplicate court number at the location
            if (_unitOfWork.Courts.DoesCourtExistAtLocation(data.LocationId, data.CourtNumber))
            {
                return BadRequest(new { Message = "Court number already exists at this location. Please choose a different number." });
            }

            _unitOfWork.Courts.AddCourt(_mapper.Map<Court>(data));
            _unitOfWork.SaveChanges();

            return Ok(_mapper.Map<CourtViewModel>(data));
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CourtViewModel data)
        {
            var courtToUpdate = _unitOfWork.Courts.GetCourtById(id);

            if (courtToUpdate != null)
            {
                try
                {
                    courtToUpdate.LocationId = data.LocationId;
                    courtToUpdate.CourtNumber = data.CourtNumber;
                   

                    _unitOfWork.Courts.UpdateCourt(courtToUpdate);
                    _unitOfWork.SaveChanges();
                    return Ok(_mapper.Map<CourtViewModel>(data));
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
            var court = _unitOfWork.Courts.Get(id);
            _unitOfWork.Courts.Remove(court);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}
