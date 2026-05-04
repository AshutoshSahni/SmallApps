using Microsoft.AspNetCore.Identity;

namespace backend.Dto;

public record RegisterDto(string Username, string Email, string Password);
public record LoginDto(string Email, string Password);
public record AuthResponseDto(string Token, string Email, IList<string> Roles);
