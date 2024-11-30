using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Constants
{
    public static class LanguageCodes
    {
        public static string[] All = { German, English };

        public const string Default = German;
        public const string German = "de-CH";
        public const string English = "en-CH";
    }
}
