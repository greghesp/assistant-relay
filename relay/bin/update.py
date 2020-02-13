import zipfile
import io
import os
import requests

url = 'https://github.com/greghesp/assistant-relay/releases/latest/download/release.zip'



def download_extract_zip(url):
        response = requests.get(url)
        with zipfile.ZipFile(io.BytesIO(response.content)) as zip:
            # zip.printdir()

            print("Extracting files")

            zip.extractall(os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..')))
            print("Done")


download_extract_zip(url)
