﻿// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using AutoMapper;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUser, UserViewModel>()
                   .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<ApplicationUser, UserEditViewModel>()
                .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserEditViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<ApplicationUser, UserPatchViewModel>()
                .ReverseMap();

            CreateMap<ApplicationRole, RoleViewModel>()
                .ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
                .ForMember(d => d.UsersCount, map => map.MapFrom(s => s.Users != null ? s.Users.Count : 0))
                .ReverseMap();
            CreateMap<RoleViewModel, ApplicationRole>()
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<IdentityRoleClaim<string>, ClaimViewModel>()
                .ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
                .ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
                .ReverseMap();

            CreateMap<ApplicationPermission, PermissionViewModel>()
                .ReverseMap();

            CreateMap<IdentityRoleClaim<string>, PermissionViewModel>()
                .ConvertUsing(s => (PermissionViewModel)ApplicationPermissions.GetPermissionByValue(s.ClaimValue));

            CreateMap<Customer, CustomerViewModel>()
                .ReverseMap();

            CreateMap<Product, ProductViewModel>()
                .ReverseMap();

            CreateMap<Order, OrderViewModelDisplay>()
                 .ReverseMap();
            CreateMap<Order, OrderViewModelAddOrEdit>()
                 .ReverseMap();
            CreateMap<OrderViewModelDisplay, OrderViewModelAddOrEdit>()
                 .ReverseMap();

            CreateMap<OrderDetail, OrderDetailViewModel>()
                 .ReverseMap();

            CreateMap<Court, CourtViewModel>()
                .ReverseMap();
            CreateMap<Court, CourtViewModelAddOrEdit>()
                .ReverseMap();
            CreateMap<CourtViewModel, CourtViewModelAddOrEdit>()
                .ReverseMap();

            CreateMap<User, PBUserViewModel>()
                .ReverseMap();

            CreateMap<Lesson, LessonViewModelDisplay>()
                .ReverseMap();
            CreateMap<Lesson, LessonViewModelAddOrEdit>()
                .ReverseMap();
            CreateMap<LessonViewModelDisplay, LessonViewModelAddOrEdit>()
                .ReverseMap();


            CreateMap<Location, LocationViewModelMinusCourts>()
                .ReverseMap();
            CreateMap<Location, LocationViewModelDisplay>()
                .ReverseMap();
            CreateMap<LocationViewModelMinusCourts, LocationViewModelDisplay>()
                .ReverseMap();

        }
    }
}
