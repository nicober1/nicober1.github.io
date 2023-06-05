---
keywords: [Python]
---

```python
python -m pip install --upgrade pip

pip freeze

pip install --upgrade -r python/requirements.txt

pip install pipreqs
pipreqs python --force

pip list --outdated

pip install autopep8
autopep8 --in-place --aggressive --aggressive *.py

##.pylintrc file
[MESSAGES CONTROL]
disable=missing-module-docstring,invalid-name,C0321
disable=all

#################################################333

# pylint: disable-all
# pylint: disable=missing-module-docstring
# pylint: disable=W
# pylint: skip-file
from bs4 import BeautifulSoup
import json
import requests

def scrape_website(url, filename):
    response = requests.get(url, timeout=(5, 15))
    print(f"Request to {url} returned status code {response.status_code}")
    hs = BeautifulSoup(response.text, "html.parser").find_all("a")

    fh = []

    for h in hs:
        ht = h.get_text().strip()
        if ht and len(ht) > 25 and len(ht) < 99 and "    " not in ht and ht not in fh:
            fh.append(ht)


    with open(filename, "w", encoding="utf-8") as f:
        json.dump(fh, f, indent=4, ensure_ascii=False)

    print(f"Successfully written {filename}")


scrape_website("https://timesofindia.indiatimes.com/", "./static/scrap/timesofindia.json")
scrape_website("https://www.aljazeera.com/", "./static/scrap/aljazeera.json")
scrape_website("https://www.thehindu.com/", "./static/scrap/hindu.json")
scrape_website("https://www.nbcnews.com/", "./static/scrap/nbc.json")
scrape_website("https://www.theguardian.com/", "./static/scrap/guardian.json")
scrape_website("https://bbc.com/", "./static/scrap/bbc.json")
scrape_website("https://edition.cnn.com/", "./static/scrap/cnn.json")
scrape_website("https://economictimes.indiatimes.com", "./static/scrap/economictimes.json")
scrape_website("https://moneycontrol.com/", "./static/scrap/moneycontrol.json")
scrape_website("https://cnbc.com/", "./static/scrap/cnbc.json")
scrape_website("https://www.reuters.com/", "./static/scrap/reuters.json")
scrape_website("https://news.sky.com/", "./static/scrap/skynews.json")
scrape_website("https://www.goal.com/", "./static/scrap/goal.json")
scrape_website("https://www.wsj.com/", "./static/scrap/wsj.json")
scrape_website("https://www.nytimes.com/", "./static/scrap/nytimes.json")
scrape_website("https://en.wikinews.org/wiki/Main_Page", "./static/scrap/wikinews.json")
scrape_website("https://www.bbc.com/sport", "./static/scrap/sportsbbc.json")
```

### Name variable

- The **name** is a built-in variable in Python that contains the name of the current module.

When a Python module is executed as the main program, its **name** variable is set to "**main**". This means that if a module is imported into another module and its code is executed, the **name** variable will be set to the module's name instead of "**main**".

The **name** variable is often used to differentiate between the main program execution and module import. It allows you to write code that should only run when the module is executed directly as a standalone program, but not when it is imported as a module.

For example, in the program provided earlier, the if **name** == "**main**": condition checks if the module is being run as the main program by comparing the **name** variable with the string "**main**". If the condition is true, the main() function is called, allowing the user to interact with the password generator. However, if the module is imported into another module, the **name** variable will have the name of the module instead of "**main**", and the code inside the if block will not be executed.

Using **name** in this way helps modularize code and allows modules to be both reusable and executable independently.

```python

import random
import string

def generate_password(length, use_uppercase, use_numbers, use_symbols):
    characters = string.ascii_lowercase
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def main():
    print("Welcome to the Random Password Generator!")
    print("----------------------------------------")
    length = int(input("Enter the length of the password: "))
    use_uppercase = input("Include uppercase letters? (y/n): ").lower() == 'y'
    use_numbers = input("Include numbers? (y/n): ").lower() == 'y'
    use_symbols = input("Include symbols? (y/n): ").lower() == 'y'

    password = generate_password(length, use_uppercase, use_numbers, use_symbols)
    print("Your random password is: ", password)

if __name__ == "__main__":
    main()


```
