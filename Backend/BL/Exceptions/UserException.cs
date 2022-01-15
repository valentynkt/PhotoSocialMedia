using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Exceptions
{
    public class UserException : Exception
    {
        public string Property { get; protected set; }

        public UserException()
        {

        }

        public UserException(string message) : base(message)
        {

        }
        public UserException(string message, string prop) : base(message)
        {
            Property = prop;
        }
    }
}
