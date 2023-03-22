# add your get-notes function here
import boto3
from boto3.dynamodb.conditions import Key
# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb", region_name="ca-central-1")
table_name = "lotion-30144227"
# create a dynamodb table object
table = dynamodb_resource.Table(table_name)

# def get_items(email):
#     # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/query.html
#     response = table.query(
#         TableName = table_name,
#         KeyConditionExpression=Key("email").eq(email)
#     )
#     items = response["Items"]
#     return items


def lambda_handler(event, context):
    http_method = event["requestContext"]["http"]["method"].lower()
    notes = None

    if http_method == "get":
        # POST and PUT use the body to get info about the request
        email = event["queryStringParameters"]["email"]
        # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/query.html
        response = table.query(
            TableName = table_name,
            KeyConditionExpression=Key("email").eq(email)
        )
        notes = response["Items"]
       
    return notes
    