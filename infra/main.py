# the Lambda runtime call a function in our code
# we can name the function anything we want, but it's a best practice
# to include the word "handler".
# 
# the function also needs to accept two positional arguments: event and context.
# the Lambda runtime will pass these two arguments when it runs our code.
# we're not doing anything with them here, but they're necessary anyway.
# def handler(event, context):
#     print("Hello, Lambda!")

import boto3

# create a dynamodb resource
dynamodb_resource = boto3.resource("dynamodb")
# create a dynamodb table object
table = dynamodb_resource.Table("students")


def add_item(student):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/put_item.html
    return table.put_item(Item=student)


def get_item(student_id):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/get_item.html
    response = table.get_item(Key={"student_id": student_id})
    item = response["Item"]
    return item


def update_item(student):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/update_item.html
    return table.update_item(
        Key={
            "student_id": student["student_id"],
        },
        UpdateExpression="SET grades = :grades",
        ExpressionAttributeValues={":grades": student["grades"]},
    )


def delete_item(student_id):
    # read the docs: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/delete_item.html
    return table.delete_item(
        Key={
            "student_id": student_id,
        }
    )
