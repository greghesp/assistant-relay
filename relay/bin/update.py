import requests

response = requests.get("http://api.github.com/repos/greghesp/assistant-relay/releases/latest")
print(response.status_code)

