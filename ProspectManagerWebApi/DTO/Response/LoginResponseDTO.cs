﻿namespace ProspectManagerWebApi.DTO.Response
{
    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
