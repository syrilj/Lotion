# add your delete-note function here
import boto3

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
        # POST and PUT use the body to get info about the request
        email = event["queryStringParameters"]["email"]
        note_id = int(event["queryStringParameters"]["note_id"])
        
        delete_item(email, note_id)
    return {
        "statusCode": 200
        
    }