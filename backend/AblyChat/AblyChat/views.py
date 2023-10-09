from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class BaseView(APIView):
    # Authentication Class for token Authentication
    authentication_classes = [SessionAuthentication, BasicAuthentication]


class AblyChat_App_Api(BaseView):
    # Any Access permission class
    permission_classes = ()

    # Get request method for view function
    def get(self, request):
        response_dict = {"Acknowledge": "Ably Chat APP API Beta Ver 1.0 is alive."}
        return Response(response_dict, status=200)