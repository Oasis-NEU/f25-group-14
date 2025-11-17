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
button_element = driver.find_element(By.XPATH, "//div[@class='outlinedButton']//button[contains(., 'Load More')]")
print(button_element.text)

#Loads all of the data before scraping so all the listings can be clicked
while True:
    try:
        #Click the button after waiting for it to load
        load_button = waiting_time.until(EC.element_to_be_clickable(driver.find_element(By.XPATH, "//div[@class='outlinedButton']//button[contains(., 'Load More')]")))
        load_button.click()
        print("Clicked button")
        
        #scroll after clicking the button so the button can be clicked again
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)

    #if this exception triggers, then the page is done loading because the button will disappear
    except(TimeoutException, NoSuchElementException):
        print("Page done loading")
        break

        
#store every elements href because storing the webelements would take too much memory and cause crashes
container = driver.find_element(By.ID, "org-search-results")
href_list = [element.get_attribute('href') for element in container.find_elements(By.TAG_NAME, "a")]

#start scraping the actual data here
print("\n***SCRAPING STARTS HERE:***\n")
for i in range(len(href_list)):
    #navigate to particular listing
    driver.get(href_list[i])
    print("Navigated to listing!")

    #wait for site to load
    #time.sleep(1)

    #define all needed variables here. email and image_url are optional because not every club has both
    image_url: Optional[str] = None
    email: Optional[str] = None

    #wait until the h1 element has loaded before grabbing. This ensures that the rest of the page likely has loaded too
    club_name = waiting_time.until(EC.presence_of_element_located((By.XPATH, "//h1"))).text
    #grabs the description of the club by getting all of the p elements and then combining them into one
    description = waiting_time.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.bodyText-large.userSupplied"))).text
    #attempt to grab image_url
    try:
        image_url = driver.find_element(By.XPATH, "//img").get_attribute("src")
    except(NoSuchElementException):
        print("No url found")
    #attempt to grab email
    try:
        email = driver.find_element(By.XPATH, "//strong/..").text[17:]
    except(NoSuchElementException):
        print("No email found")

    #replace every \n with a space
    description = description.replace('\n\n', " ").replace('\n', " ")

    #each club is a nested dictionary of certain info with the club name as the key
    club_data[club_name] = {'description': description, 'image_url': image_url, 'email': email}
    
#stop driver
driver.quit()
#test to see if the data is good
print(club_data)

#write into a json file
with open('club_data.json', 'w') as f:
    json.dump(club_data, f)

