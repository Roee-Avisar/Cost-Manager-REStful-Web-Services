import sys
import requests

filename = input("filename=")

# כתובת השרת שלך ב-Render
base_url = "https://cost-manager-restful-web-services-4ovd.onrender.com"

output = open(filename, "w")
sys.stdout = output

print("===================================\n")

print("testing getting the about")
print("-------------------------")

try:
    url = f"{base_url}/api/about"
    data = requests.get(url)

    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.text)
    print(data.json())

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
    data = requests.post(url, json={
        'userid': "123123",
        'description': 'milk 9',
        'category': 'food',
        'sum': 8
    })

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
