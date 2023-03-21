# add your get-notes function here
import boto3

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb")
# create a dynamodb table object
table = dynamodb_resource.Table("lotion-30144227")


def get_item(email, note_id):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/get_item.html
    response = table.get_item(
        Key={
            "email": email,
            "note_id": note_id,
        })
    item = response["Item"]
    return item

def get_items(email):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/query.html
    response = table.query(
        KeyConditionExpression=boto3.dynamodb.conditions.Key("email").eq(email)
    )
    items = response["Items"]
    return items