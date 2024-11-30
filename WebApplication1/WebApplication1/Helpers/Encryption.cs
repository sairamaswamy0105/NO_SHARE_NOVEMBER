using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Shab.Api.Helpers
{
        public  class Encryption
    {
        private readonly string _key;
        private readonly string _IV;

        public Encryption(IConfiguration configuration)
        {
            _key = configuration["EncryptionKey:Key"];
            _IV= configuration["EncryptionKey:IV"];
        }
        public  string Encrypt(string plainText)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_key);
                aes.IV = Encoding.UTF8.GetBytes(_IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, aes.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        using (StreamWriter writer = new StreamWriter(cryptoStream))
                        {
                            writer.Write(plainText);
                        }
                    }
                    return Convert.ToBase64String(memoryStream.ToArray());
                }
            }
        }
    }

}
