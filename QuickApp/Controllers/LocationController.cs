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
    public class LocationController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;

        public LocationController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<LocationController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }



        // GET: api/values
        [HttpGet("allLocations")]
        public IActionResult GetAllLocations()
        {
            var allLocations = _unitOfWork.Locations.GetAllLocations();
            return Ok(_mapper.Map<IEnumerable<LocationViewModel>>(allLocations));
        }

        [HttpGet("throw")]
        public IEnumerable<Location> Throw()
        {
            throw new InvalidOperationException($"This is a test exception: {DateTime.Now}");
        }


        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetLocationById(int id)
        {
            var location = _unitOfWork.Locations.GetLocationById(id);
            return Ok(_mapper.Map<LocationViewModel>(location));
        }



        // POST api/values
        [HttpPost("addLocation")]
        public IActionResult Post([FromBody] LocationViewModel data)
        {

            _unitOfWork.Locations.AddLocation(_mapper.Map<Location>(data));
            _unitOfWork.SaveChanges();
            return Ok(_mapper.Map<LocationViewModel>(data));
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] LocationViewModel data)
        {
            var locationToUpdate = _unitOfWork.Locations.GetLocationById(id);

            if (locationToUpdate != null)
            {
                try
                {
                    locationToUpdate.Title = data.Title;
                    locationToUpdate.Address = data.Address;
                    //locationToUpdate.Courts = data.Courts;

                    _unitOfWork.Locations.UpdateLocation(locationToUpdate);
                    _unitOfWork.SaveChanges();
                    return Ok(_mapper.Map<LocationViewModel>(data));
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
            var location = _unitOfWork.Locations.Get(id);
            _unitOfWork.Locations.Remove(location);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}
