from rest_framework.views import exception_handler
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    """
    Custom exception handler that handles authentication errors gracefully.
    For read operations, it will still allow the request to proceed.
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)
    
    # Check if this is an authentication error
    if isinstance(exc, (AuthenticationFailed, NotAuthenticated)):
        request = context.get('request')
        
        # For read-only methods, allow the request to proceed
        if request and request.method in ['GET', 'HEAD', 'OPTIONS']:
            # Return None to indicate that the exception should be ignored
            # and the view should proceed as if no exception occurred
            return None
    
    # Return the original response for all other cases
    return response
