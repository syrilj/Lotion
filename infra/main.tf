terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

# specify the provider region
provider "aws" {
  region = "ca-central-1"
}


# # Create an S3 bucket
# # if you omit the name, Terraform will assign a random name to it
# # see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket
# resource "aws_s3_bucket" "lambda" {}

# read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "lotion-30144227" {
  name         = "lotion-30144227"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1


  hash_key = "email"
  range_key = "note_id"

  attribute {
    name = "note_id"
    type = "N"
  }
  attribute {
    name = "email"
    type = "S"
  }

}


resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "dynamodb-lambda-policy" {
  name = "dynamodb_lambda_policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : ["dynamodb:*"],
        "Resource" : "${aws_dynamodb_table.lotion-30144227.arn}"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach" {

  role = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.dynamodb-lambda-policy.arn

}

data "archive_file" "get-all-notes-archive" {
  source_file = "../functions/get-notes/main.py"
  output_path = "get-notes.zip"
  type        = "zip"
}


resource "aws_lambda_function" "get-all-notes" {
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "main.lambda_handler"
  function_name = "get-notes-30145947"
  filename      = "get-notes.zip"
  source_code_hash = data.archive_file.get-all-notes-archive.output_base64sha256

  runtime = "python3.9"
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "get-notes-url" {
  function_name      = aws_lambda_function.get-all-notes.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# show the Function URL after creation
output "get-all-notes_url" {
  value = aws_lambda_function_url.get-notes-url.function_url
}

data "archive_file" "save-note-archive" {
  source_file = "../functions/save-note/main.py"
  output_path = "save-note.zip"
  type        = "zip"
}

resource "aws_lambda_function" "save-note" {
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "main.lambda_handler"
  function_name = "save-note-30145947"
  filename      = "save-note.zip"
  source_code_hash = data.archive_file.save-note-archive.output_base64sha256

  runtime = "python3.9"
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "save-notes-url" {
  function_name      = aws_lambda_function.save-note.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# show the Function URL after creation
output "save-note_url" {
  value = aws_lambda_function_url.save-notes-url.function_url
}

data "archive_file" "delete-note-archive" {
  source_file = "../functions/delete-note/main.py"
  output_path = "delete-note.zip"
  type        = "zip"
}


resource "aws_lambda_function" "delete-note" {
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "main.lambda_handler"
  function_name = "delete-note-30145947"
  filename      = "delete-note.zip"
  source_code_hash = data.archive_file.delete-note-archive.output_base64sha256

  runtime = "python3.9"
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "delete-note-url" {
  function_name      = aws_lambda_function.delete-note.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["DELETE"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# show the Function URL after creation
output "delete-note_url" {
  value = aws_lambda_function_url.delete-note-url.function_url
}