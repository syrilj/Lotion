import time

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


# item for testing
item = {
    "email": "rhamzax@gmail.com",
    "note_id": 1234567890,
    "text": "Hello World!",
    "title": "First Note",
    "timestamp": "2021-01-01 00:00:00",
    "time_created": "2023-06-01 12:00:00",
    "html": "<p>Hello World!</p>",
}


# run pytest -v -k 'test_add' to run this specific test
def test_add_item():
    res = save_note.add_item(item)
    print(res)
    assert res is not None


# run pytest -v -k 'test_get' to run this specific test
def test_get_item():
    res = get_note.get_item(item["email"], item["note_id"])
    assert res is not None
    assert res["text"] == item["text"]
    assert res["title"] == item["title"]
    assert res["html"] == item["html"]


# run pytest -v -k 'test_update' to run this specific test
def test_update_item():
    updated_item = {"email": item["email"], "note_id":item["note_id"], "title": "Hello World!1231245"}
    res = update_note.update_item(updated_item)
    assert res is not None
    # sleep for 1 second to make sure the updated record is consistent across all AZs
    time.sleep(1)
    res = get_note.get_item(updated_item["email"] , updated_item["note_id"])
    assert res["title"] == updated_item["title"]


# run pytest -v -k 'test_delete' to run this specific test
def test_delete_item():
    res = delete_note.delete_item(item["email"], item["note_id"])
    assert res is not None