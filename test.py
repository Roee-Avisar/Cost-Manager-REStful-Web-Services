import sys
import requests

# כתובת השרת (עדכון כתובת ה-API)
base_url = "http://localhost:5000"

# שם הקובץ לשמירת הפלט
filename = "test_results.txt"

output = open(filename, "w")
sys.stdout = output

print("===================================")
print("\n")

print("testing getting the about")
print("-------------------------")

try:
    url = f"{base_url}/api/about"
    data = requests.get(url)

    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")

print("testing getting the report - 1")
print("------------------------------")

try:
    url = f"{base_url}/api/report/?id=123123&year=2025&month=2"
    data = requests.get(url)

    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")

print("testing adding cost item")
print("----------------------------------")

try:
    url = f"{base_url}/api/add"
    data = requests.post(url, json={'userid': 123123, 'description': 'milk 9', 'category': 'food', 'sum': 8})

    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")

print("testing getting the report - 2")
print("------------------------------")

try:
    url = f"{base_url}/api/report/?id=123123&year=2025&month=2"
    data = requests.get(url)

    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")
