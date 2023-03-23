import boto3
import json
from google.oauth2 import id_token
from google.auth.transport import requests

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb")
# create a dynamodb table object
table = dynamodb_resource.Table("lotion-30144227")

def save_item(note):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/put_item.html
    return table.put_item(Item=note)

def lambda_handler(event, context):

    http_method = event["requestContext"]["http"]["method"].lower()
    note = None

    if http_method == "post":
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

        # Extract the note data from the request.
        note_id = event["queryStringParameters"]["note_id"]
        title = event["queryStringParameters"]["title"]
        html = event["queryStringParameters"]["html"]
        text = event["queryStringParameters"]["text"]
        timestamp = event["queryStringParameters"]["timestamp"]

        # Save the note.
        note = {
            "email": email,
            "note_id": note_id,
            "title": title,
            "html": html,
            "text": text,
            "timestamp": timestamp,
        }
        save_item(note)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "note": note
        })
    }
