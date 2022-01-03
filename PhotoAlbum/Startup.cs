using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using BL.Interfaces;
using BL.Services;
using BL.Settings;
using DAL;
using DAL.Entities.Auth;
using DAL.Interfaces;
using DAL.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PL.Extensions;


namespace PhotoAlbum
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("PhotoAlbumDB")));

            services.AddIdentity<AppUser, AppRole>(opts =>
                    {
                        opts.SignIn.RequireConfirmedAccount = false;
                        opts.SignIn.RequireConfirmedEmail = false;
                        opts.SignIn.RequireConfirmedPhoneNumber = false;
                        opts.Password.RequireNonAlphanumeric = false;
                    })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.AddHttpContextAccessor();
            var jwtSettings = Configuration.GetSection("Jwt").Get<JwtSettings>();

            services.Configure<JwtSettings>(Configuration.GetSection("Jwt"));

            services.AddAuth(jwtSettings);

            services.AddCors();


            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<UserService>();

            services.AddAutoMapper(typeof(AutomapperProfile));

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT containing userid claim",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                });
                var security =
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Id = "Bearer",
                                    Type = ReferenceType.SecurityScheme
                                },
                                UnresolvedReference = true
                            },
                            new List<string>()
                        }
                    };
                options.AddSecurityRequirement(security);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(
                options => options.SetIsOriginAllowed(x => _ = true).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
            );

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseAuth();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V2");
            });
        }
    }
}
