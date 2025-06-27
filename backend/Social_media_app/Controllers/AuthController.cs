using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
                return Unauthorized(new { message = "Thông tin đăng nhập hoặc mật khẩu không đúng" }); // Sửa message
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
        public async Task<Account> Register([FromBody] Account acc)
        {
            acc.Password = BCrypt.Net.BCrypt.HashPassword(acc.Password);

            _context.Accounts.Add(acc);
            await _context.SaveChangesAsync();
            return acc;
        }
    }
}
