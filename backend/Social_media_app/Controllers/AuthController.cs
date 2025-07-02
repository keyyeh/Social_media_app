using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Social_media_app.DTO;
using SocialConnectAPI.Data;
using SocialConnectAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Social_media_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Account acc)
        {
            if (acc == null || string.IsNullOrEmpty(acc.Email) || string.IsNullOrEmpty(acc.Password))
            {
                return BadRequest(new { message = "Email hoặc số điện thoại và mật khẩu không được để trống" });
            }

            var checkAccount = await AuthenticateUser(acc.Email, acc.Password);
            if (!checkAccount)
            {
                return Unauthorized(new { message = "Thông tin đăng nhập hoặc mật khẩu không đúng" });
            }

            var token = GenerateJwtToken(acc.Email);

            // Trả về dữ liệu an toàn (tránh lộ thông tin nhạy cảm)
            return Ok(new
            {
                token
            });
        }
        private async Task<bool> AuthenticateUser(string email, string password)
        {
            var user = await _context.Accounts.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return false;

            // Xác minh mật khẩu
            return BCrypt.Net.BCrypt.Verify(password, user.Password);
        }
        private string GenerateJwtToken(string email)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, email),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra email hoặc số điện thoại đã tồn tại
            if (await _context.Accounts.AnyAsync(a => a.Email == model.Account.Email))
            {
                return BadRequest(new { message = "Email đã được sử dụng" });
            }
            if (!string.IsNullOrEmpty(model.Account.Phone) &&
                await _context.Accounts.AnyAsync(a => a.Phone == model.Account.Phone))
            {
                return BadRequest(new { message = "Số điện thoại đã được sử dụng" });
            }

            try
            {
                // Tạo tài khoản
                var account = new Account
                {
                    Email = model.Account.Email,
                    Phone = model.Account.Phone,
                    Password = BCrypt.Net.BCrypt.HashPassword(model.Account.Password),
                    Role = model.Account.Role ?? "user"
                };

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();


                // Tạo user liên kết
                var user = new User
                {
                    UserId = account.Id,
                    Name = model.Name
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Đăng ký thành công", accountId = account.Id });
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                return StatusCode(500, new { message = "Lỗi server khi đăng ký" + ex.Message});
            }
        }
    }
}
