# add your save-note function here
import boto3

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb")
# create a dynamodb table object
table = dynamodb_resource.Table("lotion-30144227")

def save_item(note):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/put_item.html
    return table.put_item(Item=note)

# def update_item(note):
#     # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/update_item.html
#     return table.update_item(
#         Key={
#             "email": note["email"],
#             "note_id": note["note_id"],
#         },
#         UpdateExpression="SET title = :title",
#         ExpressionAttributeValues={":title": note["title"]},
#     )

import json

def lambda_handler(event, context):

    http_method = event["requestContext"]["http"]["method"].lower()
    invoker = None
    note = None

    if http_method == "post":
        # POST and PUT use the body to get info about the request
        email = event["queryStringParameters"]["email"]
        note_id = int(event["queryStringParameters"]["note_id"])
        title = event["queryStringParameters"]["title"]
        note = {
            "email": email,
            "note_id": note_id,
            "title": title,
        }
        if invoker == "add":
            save_item(note)
    return {
        "statusCode": 200,
        "body": json.dumps({
            "note": note
        })
    }