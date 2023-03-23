import boto3
from boto3.dynamodb.conditions import Key
from google.oauth2 import id_token
from google.auth.transport import requests

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb", region_name="ca-central-1")
table_name = "lotion-30144227"
# create a dynamodb table object
table = dynamodb_resource.Table(table_name)


def lambda_handler(event, context):
    http_method = event["requestContext"]["http"]["method"].lower()
    notes = None

    if http_method == "get":
        # Get the access token from the request headers or body.
        access_token = event["headers"]["Authorization"].split()[1]

        # Verify the access token.
        try:
            idinfo = id_token.verify_oauth2_token(access_token, requests.Request(), "572348176466-51fd22tl7u7gcp26b0bcmrhj0rh08g3f.apps.googleusercontent.com")
            # Extract the user's email address from the access token.
            email = idinfo['email']
        except ValueError:
            # Invalid token
            return {"statusCode": 401, "body": "Invalid token"}

        # Get the notes for the user.
        response = table.query(
            TableName=table_name,
            KeyConditionExpression=Key("email").eq(email)
        )
        notes = response["Items"]

    return notes
