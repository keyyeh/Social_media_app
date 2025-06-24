using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialConnectAPI.Data;
using SocialConnectAPI.Models;

namespace Social_media_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Account acc)
        {
            if (acc == null || string.IsNullOrEmpty(acc.Email) || string.IsNullOrEmpty(acc.Password))
            {
                return BadRequest(new { message = "Email hoặc số điện thoại và mật khẩu không được để trống" });
            }

            var checkAccount = await _context.Accounts
                .FirstOrDefaultAsync(a => (a.Email == acc.Email || a.Phone == acc.Email) && a.Password == acc.Password);
            if (checkAccount == null)
            {
                return Unauthorized(new { message = "Thông tin đăng nhập hoặc mật khẩu không đúng" });
            }

            // Trả về dữ liệu an toàn (tránh lộ thông tin nhạy cảm)
            return Ok(new
            {
                id = checkAccount.Id,
                email = checkAccount.Email,
                phone = checkAccount.Phone
            });
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
