# add your save-note function here
import boto3

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb")
# create a dynamodb table object
table = dynamodb_resource.Table("lotion-30144227")

def save_item(note):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/put_item.html
    return table.put_item(Item=note)

import json

def lambda_handler(event, context):

    http_method = event["requestContext"]["http"]["method"].lower()
    note = None

    if http_method == "post":

        email = event["queryStringParameters"]["email"]
        note_id = event["queryStringParameters"]["note_id"]
        title = event["queryStringParameters"]["title"]
        html = event["queryStringParameters"]["html"]
        text = event["queryStringParameters"]["text"]
        timestamp = event["queryStringParameters"]["timestamp"]

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