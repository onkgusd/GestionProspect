using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ProspectManagerWebApi.Services
{
    public class EmailService
    {
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _fromAddress;
        private readonly string _password;

        public EmailService(string smtpServer, int smtpPort, string fromAddress, string password)
        {
            _smtpServer = smtpServer;
            _smtpPort = smtpPort;
            _fromAddress = fromAddress;
            _password = password;
        }

        public async Task SendEmailAsync(string toAddress, string subject, string body)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromAddress),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.To.Add(toAddress);

            var smtpClient = new SmtpClient(_smtpServer, _smtpPort)
            {
                Credentials = new NetworkCredential(_fromAddress, _password),
                EnableSsl = true
            };

            await smtpClient.SendMailAsync(mailMessage);
        }
    }

}
