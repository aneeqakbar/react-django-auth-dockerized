import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from authentication.serializers import CustomTokenObtainPairSerializer, UserSerializer

class GetCurrentUserDataView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=200)

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(APIView):
    def post(self, request):
        data = json.loads(request.body)

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            password2 = data.get("password2", None)
            user = serializer.save()
            user.set_password(password2)
            user.save()

            data = {}
            refresh = CustomTokenObtainPairSerializer.get_token(request.user)
            data["refresh"] = str(refresh)
            data["access"] = str(refresh.access_token)
            data["user"] = UserSerializer(user).data

            return Response(data, status=201)
        return Response(serializer.errors, status=403)