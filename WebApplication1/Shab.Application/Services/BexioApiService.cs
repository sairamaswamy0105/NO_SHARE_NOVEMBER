using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shab.Application.Helpers;
using Shab.Domain.Configs;
using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Application.Services
{
    public class BexioApiService : IBexioApiService
    {
        private readonly string _token;
        private readonly string _address;

        // Inject the configuration values using IOptions<BexioSettings>
        public BexioApiService(IOptions<ConnectionStrings> bexioSettings)
        {
            _token = bexioSettings.Value.Token;
            _address = bexioSettings.Value.Address;
        }

        public async Task<List<ContactEntity>> FetchContacts()
        {
            List<ContactEntity>? contacts = null;
            using (var client = ConfiguringHttpClientHelper.ConfigureHttpClient(_token))
            {
                var response = await SendingRequestHelper.SendRequest(client, HttpMethod.Get, _address);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    contacts = JsonConvert.DeserializeObject<List<ContactEntity>>(content);
                    Console.WriteLine("Successfully Fetched Contacts");
                }
                else
                {
                    Console.WriteLine("Error fetching contacts.");
                }
            }
            return contacts;
        }
    }
}
