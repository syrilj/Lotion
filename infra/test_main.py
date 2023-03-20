from main import *
import time

# item for testing
item = {
    "student_id": 3098390,
    "first_name": "Alice",
    "last_name": "Wonderland",
    "grades": [90, 85, 100, 94],
}


# run pytest -v -k 'test_add' to run this specific test
def test_add_item():
    res = add_item(item)
    assert res is not None


# run pytest -v -k 'test_get' to run this specific test
def test_get_item():
    res = get_item(item["student_id"])
    assert res is not None
    assert res["first_name"] == item["first_name"]
    assert res["last_name"] == item["last_name"]
    assert res["grades"] == item["grades"]


# run pytest -v -k 'test_update' to run this specific test
def test_update_item():
    updated_item = {"student_id": 3098390, "grades": [90, 100, 100, 100]}
    res = update_item(updated_item)
    assert res is not None
    # sleep for 1 second to make sure the updated record is consistent across all AZs
    time.sleep(1)
    res = get_item(updated_item["student_id"])
    assert res["grades"] == updated_item["grades"]


# run pytest -v -k 'test_delete' to run this specific test
def test_delete_item():
    res = delete_item(item["student_id"])
    assert res is not None
