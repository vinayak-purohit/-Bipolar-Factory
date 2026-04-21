import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')
options.add_argument('--window-size=1920,1080')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')

try:
    driver = webdriver.Chrome(options=options)
    
    # Products Home
    print("Capturing products home...")
    driver.get("https://www.bipolarfactory.com/products")
    time.sleep(3)
    driver.save_screenshot("public/products_home.png")
    
    # Oly page
    print("Capturing OLY...")
    driver.get("https://www.bipolarfactory.com/oly")
    time.sleep(3)
    driver.save_screenshot("public/oly_store_sync.png")
    
    # Metawood
    print("Capturing Metawood...")
    driver.get("https://www.bipolarfactory.com/metawood")
    time.sleep(3)
    driver.save_screenshot("public/metawood_vr.png")
    
    driver.quit()
    print("Done catching screens!")
except Exception as e:
    print(f"Error: {e}")
