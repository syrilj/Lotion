import boto3
from google.oauth2 import id_token
from google.auth.transport import requests

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb")
# create a dynamodb table object
table = dynamodb_resource.Table("lotion-30144227")

def delete_item(email, note_id):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/delete_item.html
    return table.delete_item(
        Key={
            "email": email,
            "note_id": note_id,
        }
    )

def lambda_handler(event, context):

    http_method = event["requestContext"]["http"]["method"].lower()

    if http_method == "delete":
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

        # Get the note_id from the query parameters.
        note_id = event["queryStringParameters"]["note_id"]

        # Use the email address to delete the note from the DynamoDB table.
        delete_item(email, note_id)

    return {
        "statusCode": 200
    }
