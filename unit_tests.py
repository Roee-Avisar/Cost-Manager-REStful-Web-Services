import requests

base_url = "http://localhost:5000"

def run_test(name, method, url, payload=None, expected_status=None, expected_keys=None, expect_error=False):
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=payload)
        else:
            print(f"[❌] {name} - Invalid HTTP method")
            return

        passed = response.status_code == expected_status
        result = f"[{'✅' if passed else '❌'}] {name} (Status: {response.status_code})"

        if expected_keys and not expect_error:
            json_data = response.json()
            keys_ok = all(key in json_data for key in expected_keys)
            passed = passed and keys_ok
            if not keys_ok:
                result += f" - Missing keys: {expected_keys}"
        elif expect_error:
            json_data = response.json()
            passed = passed and "error" in json_data

        print(result)
        if not passed:
            print("Response:", response.text)
        print()
    except Exception as e:
        print(f"[❌] {name} - Exception: {str(e)}\n")

# בדיקות

run_test(
    name="GET /api/about - Developers",
    method="GET",
    url=f"{base_url}/api/about",
    expected_status=200,
    expected_keys=["first_name", "last_name"]
)

run_test(
    name="GET /api/users/:id - Existing User",
    method="GET",
    url=f"{base_url}/api/users/123123",
    expected_status=200,
    expected_keys=["id", "first_name", "last_name", "total"]
)

run_test(
    name="GET /api/users/:id - Not Found",
    method="GET",
    url=f"{base_url}/api/users/999999",
    expected_status=404,
    expect_error=True
)

run_test(
    name="POST /api/add - Valid",
    method="POST",
    url=f"{base_url}/api/add",
    payload={
        "userid": 123123,
        "description": "test item",
        "category": "food",
        "sum": 10
    },
    expected_status=201,
    expected_keys=["userid", "description", "category", "sum"]
)

run_test(
    name="POST /api/add - Missing Fields",
    method="POST",
    url=f"{base_url}/api/add",
    payload={"userid": 123123, "category": "food"},
    expected_status=400,
    expect_error=True
)

run_test(
    name="GET /api/report - Valid",
    method="GET",
    url=f"{base_url}/api/report?id=123123&year=2025&month=2",
    expected_status=200,
    expected_keys=["userid", "year", "month", "costs"]
)

run_test(
    name="GET /api/report - Missing Parameters",
    method="GET",
    url=f"{base_url}/api/report?month=2&year=2025",
    expected_status=400,
    expect_error=True
)
