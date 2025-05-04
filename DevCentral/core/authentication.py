from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt

class GracefulJWTAuthentication(JWTAuthentication):
    """
    Custom JWT Authentication class that allows read operations even with invalid tokens.
    For write operations, it will still enforce valid authentication.
    """
    
    def authenticate(self, request):
        """
        Attempt to authenticate the request. If the token is invalid or expired,
        return None instead of raising an exception for read-only requests.
        """
        header = self.get_header(request)
        
        if header is None:
            return None
            
        raw_token = self.get_raw_token(header)
        
        if raw_token is None:
            return None
            
        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except Exception as e:
            # For read-only methods, return None instead of raising an exception
            if request.method in ['GET', 'HEAD', 'OPTIONS']:
                return None
            # For write methods, re-raise the exception
            raise
