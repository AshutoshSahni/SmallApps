using backend.Data;
using backend.Dto;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly TokenService _tokenService;

    public AuthController(UserManager<IdentityUser>  userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    // Register
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto dto)
    {
        var user = new IdentityUser {UserName = dto.Username, Email = dto.Email};
        var result = await _userManager.CreateAsync(user, dto.Password);
        
        if(!result.Succeeded)
            return BadRequest(result.Errors);
        
        await _userManager.AddToRoleAsync(user, "User");
        
        var token = await _tokenService.GenerateJwtToken(user);
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new AuthResponseDto(token, user.Email, roles));
    }
    
    // Login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user is null || !await _userManager.CheckPasswordAsync(user, dto.Password))
            return Unauthorized("Invalid credentials.");

        var token = await _tokenService.GenerateJwtToken(user);
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new AuthResponseDto(token, user.Email!, roles));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _userManager.FindByIdAsync(
            User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "");

        if (user is null) return NotFound();

        var roles = await _userManager.GetRolesAsync(user);
        return Ok(new { user.Email, roles });
    }
   
}