using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Social_media_app.DTO;
using SocialConnectAPI.Data;
using SocialConnectAPI.Models;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Social_media_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public UserController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }


        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        [Route("detailuser")]
        public async Task<IActionResult> DetailUser()
        {
            try
            {
                var email = User.Identity?.Name;
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized(new { message = "Không tìm thấy người dùng" });
                }

                var user = await _context.Users
                    .Include(u => u.Account)
                    .FirstOrDefaultAsync(u => u.Account.Email == email);

                if (user == null || user.Account == null)
                {
                    return NotFound(new { message = "Tài khoản không tồn tại" });
                }

                var userDto = new UserDto
                {
                    UserId = user.Account.Id,
                    Name = user.Name,
                    Address = user.Address,
                    Date = user.Date,
                    Avatar = user.Avatar,
                    Job = user.Job,
                    Education = user.Education,
                    Cover = user.Cover,
                    Email = user.Account.Email,
                    Phone = user.Account.Phone,
                    Role = user.Account.Role
                };
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server khi lấy thông tin người dùng: " + ex.Message });
            }
        }
        // POST api/<UserController>
        
        [HttpPost]
        public void Post([FromBody] User user)
        {

        }

        // PUT api/<UserController>/5
        [HttpPut]
        [Route("UpdateUser")]
        public async Task<IActionResult> Put([FromBody] UserUpdateDto userUpdateDto)
        {
            if (userUpdateDto == null)
            {
                return BadRequest("Dữ liệu cập nhật không được để trống.");
            }
            var email = User.Identity?.Name;
            var user = await _context.Users
                .Include(u => u.Account)
                .FirstOrDefaultAsync(u => u.Account.Email == email);

            if (user == null)
            {
                return NotFound("Người dùng không tồn tại.");
            }

            // Cập nhật thông tin User
            user.Name = userUpdateDto.Name ?? user.Name;
            user.Address = userUpdateDto.Address ?? user.Address;
            user.Job = userUpdateDto.Job ?? user.Job;
            user.Education = userUpdateDto.Education ?? user.Education;

            // Cập nhật thông tin Account
            if (user.Account != null)
            {
                user.Account.Email = userUpdateDto.Email ?? user.Account.Email;
                user.Account.Phone = userUpdateDto.Phone ?? user.Account.Phone;
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Cập nhật thành công.");
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Lỗi khi cập nhật dữ liệu.");
            }
        }
        //[Authorize]
        //[HttpPost("upload-avatar")]
        //public async Task<IActionResult> UpdateImg([FromForm] IFormFile file)
        //{
        //    try
        //    {
        //        // Kiểm tra xác thực
        //        if (!User.Identity?.IsAuthenticated ?? false)
        //            return Unauthorized("Chưa xác thực.");

        //        var email = User.Identity?.Name;
        //        if (string.IsNullOrEmpty(email))
        //            return BadRequest("Không tìm thấy thông tin người dùng.");

        //        // Kiểm tra file
        //        if (file == null || file.Length == 0)
        //            return BadRequest("Chưa chọn ảnh.");

        //        // Kiểm tra định dạng file
        //        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        //        var extension = Path.GetExtension(file.FileName)?.ToLower();
        //        if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
        //            return BadRequest("Định dạng file không được hỗ trợ. Chỉ chấp nhận .jpg, .jpeg, .png.");

        //        // Tìm người dùng
        //        var user = await _context.Users
        //            .Include(u => u.Account)
        //            .FirstOrDefaultAsync(u => u.Account.Email == email);
        //        if (user == null)
        //            return NotFound("Người dùng không tồn tại.");

        //        // Lưu file
        //        var uploadDir = Path.Combine(_env.WebRootPath, "avatars");
        //        if (!Directory.Exists(uploadDir))
        //            Directory.CreateDirectory(uploadDir);

        //        var uniqueFileName = Guid.NewGuid().ToString() + extension;
        //        var filePath = Path.Combine(uploadDir, uniqueFileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        // Cập nhật avatar
        //        user.Avatar = "/avatars/" + uniqueFileName;
        //        await _context.SaveChangesAsync();

        //        return Ok(new { path = user.Avatar });
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.ToString());
        //        return StatusCode(500, $"Lỗi server: {ex.Message}");
        //    }
        //}
        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
