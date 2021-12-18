using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Exceptions
{
    public class PhotoAlbumException : Exception
    {
        public string Property { get; protected set; }

        public PhotoAlbumException()
        {

        }

        public PhotoAlbumException(string message) : base(message)
        {

        }
        public PhotoAlbumException(string message, string prop) : base(message)
        {
            Property = prop;
        }
    }
}
