# add your save-note function here
import boto3

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb")
# create a dynamodb table object
table = dynamodb_resource.Table("lotion-30144227")

def add_item(note):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/put_item.html
    return table.put_item(Item=note)

def update_item(note):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/update_item.html
    return table.update_item(
        Key={
            "email": note["email"],
            "note_id": note["note_id"],
        },
        UpdateExpression="SET title = :title",
        ExpressionAttributeValues={":title": note["title"]},
    )