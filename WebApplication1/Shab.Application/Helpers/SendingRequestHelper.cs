using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Application.Helpers
{
    public static class SendingRequestHelper
    {
        public static  async Task<HttpResponseMessage> SendRequest(HttpClient client, HttpMethod method, string address, StringContent? content = null)
        {
            var request = new HttpRequestMessage(method, address)
            {
                Content = content
            };
            return await client.SendAsync(request);
        }
    }
}
