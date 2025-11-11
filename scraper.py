from selenium import webdriver #type:ignore
from selenium.webdriver.chrome.options import Options #type: ignore
from selenium.webdriver.common.by import By #type: ignore
from selenium.webdriver.support.ui import WebDriverWait #type:ignore
from selenium.webdriver.support import expected_conditions as EC #type:ignore
from selenium.common.exceptions import TimeoutException, NoSuchElementException #type:ignore
from typing import Any
import time

opts = Options()
opts.add_argument("--headless")
opts.add_argument("--no-sandbox")
opts.add_argument("--disable-dev-shm-usage")

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


search_list = driver.find_elements(By.CLASS_NAME, "MuiCard-root")

"""
print("\n***LIST STARTS UNDER HERE:***\n")
for i in range(len(search_list)):
    print(search_list[i].text)
print(len(search_list))
"""

print("\n***SCRAPING STARTS HERE:***\n")
for i in range(len(search_list)):
    """
    for j in range(len(search_list)):
        print(search_list[j].text)
    print(f"\n***CURRENT INDEX***\n{i}")
    """
    print(search_list[i].text)
    search_list[i].click() #click on the club
    print("Clicked on listing!")
    #club_name = driver.find_element(By.XPATH, "//h1").text
    club_name = waiting_time.until(EC.presence_of_element_located((By.XPATH, "//h1"))).text
    description_elements = driver.find_elements(By.XPATH, "//div[contains(@class, 'userSupplied')]//p")
    description: list[str] = [p.text for p in description_elements]
    try:
        image_url = driver.find_element(By.XPATH, "//img").get_attribute("src")
    except(NoSuchElementException):
        image_url = None
    #print(f"CLUB NAME: {club_name} CLUB_DESCRIPTION: {" ".join(description)}")
    club_data[club_name] = {'description': " ".join(description), 'image_url': image_url}

    driver.back()
    search_list = driver.find_elements(By.CLASS_NAME, "MuiCard-root")

    time.sleep(1)

driver.quit()
print(club_data)
