using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Shab.Application.Extensions
{
    public static class StringExtensions
    {
        public static string ReplaceHtmlEncoded(this string value, string oldValue, string newValue, StringComparison comparisonType = StringComparison.Ordinal)
        {
            return value.Replace(oldValue, HttpUtility.HtmlEncode(newValue), comparisonType);
        }
    }
}
