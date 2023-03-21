import importlib.util

spec = importlib.util.spec_from_file_location("delete_item", "./delete-note/main.py")
delete_note = importlib.util.module_from_spec(spec)
spec.loader.exec_module(delete_note)

spec = importlib.util.spec_from_file_location("add_item", "./save-note/main.py")
save_note = importlib.util.module_from_spec(spec)
spec.loader.exec_module(save_note)

spec = importlib.util.spec_from_file_location("get_item", "./get-notes/main.py")
get_note = importlib.util.module_from_spec(spec)
spec.loader.exec_module(get_note)

spec = importlib.util.spec_from_file_location("update_item", "./save-note/main.py")
update_note = importlib.util.module_from_spec(spec)
spec.loader.exec_module(update_note)


import json

def lambda_handler(event, context):
    print(event)
    http_method = event["requestContext"]["http"]["method"].lower()
    invoker = None

    if http_method == "post" or http_method == "put":
        # POST and PUT use the request body to get info about the request
        body = json.loads(event["body"])
        invoker = body["invoker"]
    elif http_method == "get" or http_method == "delete":
        # GET and DELETE use query string parameters to get info about the request
        invoker = event["queryStringParameters"]["invoker"]
    
    return {
        "statusCode": 200,
        "body": json.dumps({
            "method": http_method,
            "invoker": invoker
        })
    }