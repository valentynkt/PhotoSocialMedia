using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Exceptions
{
    public class RoleException : Exception
    {
        public string Property { get; protected set; }

        public RoleException()
        {

        }

        public RoleException(string message) : base(message)
        {

        }
        public RoleException(string message, string prop) : base(message)
        {
            Property = prop;
        }
    }
}
