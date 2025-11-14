from typing import Any, Optional
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

opts = Options()
opts.add_argument("--disable-dev-shm-usage")
opts.add_argument("--disable-extensions")
opts.add_argument("--disable-gpu")
opts.add_argument("--disable-background-timer-throttling")
opts.add_argument("--disable-renderer-backgrounding")
opts.add_argument("--disable-backgrounding-occluded-windows")
opts.add_argument("--no-sandbox")

club_data: dict[str, dict[str, Any]] = {} 

driver = webdriver.Chrome(options=opts)

waiting_time = WebDriverWait(driver, 10)

driver.get("https://neu.campuslabs.com/engage/organizations")
print(driver.title)
driver.save_screenshot("page.png")
#Note: the "LOAD MORE" button dissappears when you get to the bottom
#I can find every element I need if I just keep scrolling down the website over and over again
button_element = driver.find_element(By.XPATH, "//div[@class='outlinedButton']//button[contains(., 'Load More')]")
print(button_element.text)



while True:
    try:
        load_button = waiting_time.until(EC.element_to_be_clickable(driver.find_element(By.XPATH, "//div[@class='outlinedButton']//button[contains(., 'Load More')]")))
        load_button.click()
        print("Clicked button")
        
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)

    except(TimeoutException, NoSuchElementException):
        print("Page done loading")
        break

href_list = [element.get_attribute('href') for element in driver.find_elements(By.XPATH, "//a")]
print(href_list)

"""
print("\n***LIST STARTS UNDER HERE:***\n")
for i in range(len(search_list)):
    print(search_list[i].text)
print(len(search_list))
"""

print("\n***SCRAPING STARTS HERE:***\n")
for i in range(len(href_list)):
    """
    for j in range(len(search_list)):
        print(search_list[j].text)
    print(f"\n***CURRENT INDEX***\n{i}")
    """
    #print(driver.get(href_list[i]).text)
    driver.get(href_list[i])
    print("Navigated to listing!")
    #club_name = driver.find_element(By.XPATH, "//h1").text
    club_name = waiting_time.until(EC.presence_of_element_located((By.XPATH, "//h1"))).text
    description_elements = driver.find_elements(By.XPATH, "//div[contains(@class, 'userSupplied')]//p")
    description: list[str] = [p.text for p in description_elements]
    try:
        image_url: Optional[str] = driver.find_element(By.XPATH, "//img").get_attribute("src")
    except(NoSuchElementException):
        image_url = None
    #print(f"CLUB NAME: {club_name} CLUB_DESCRIPTION: {" ".join(description)}")
    club_data[club_name] = {'description': " ".join(description), 'image_url': image_url}

    time.sleep(1)

driver.quit()
print(club_data)

with open('clubs.json', 'w') as f:
    json.dump(club_data, f)