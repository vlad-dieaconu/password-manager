#!/usr/bin/env python
# coding: utf-8

# In[35]:


from selenium import webdriver
import time


# In[36]:


def connect_to_webdriver(webdriver_path):
    try:
        full_path = r"{}".format(webdriver_path)
        chrome_options = webdriver.ChromeOptions()
      #  chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_webdriver = webdriver.Chrome(
            full_path, chrome_options=chrome_options)
        # astept sa gasesc un anumit elemn
        chrome_webdriver.implicitly_wait(15)
        chrome_webdriver.maximize_window()
        return chrome_webdriver
    except Exception as e:
        print('Error creating webdriver: ', e)
        return None


# In[37]:
def testLoginSuccessful():


  driver_loc = r'C:\Users\dutu_\Desktop\WEBDRIVER\chromedriver.exe'


# In[38]:


  browser = connect_to_webdriver(driver_loc)


# In[39]:


  browser.get('http://localhost:3000/')


# In[40]:


  email = browser.find_element_by_id("email")


# In[41]:


  password = browser.find_element_by_id("password")


# In[42]:


  signinButton = browser.find_element_by_xpath(
    "/html/body/div/body/div/div[1]/div/form/button")


# In[43]:


  email.send_keys("testselenium@mail.com")
  time.sleep(2)


# In[44]:


  password.send_keys("testselenium")
  time.sleep(2)


# In[45]:

  
  email.submit()


# In[30]:


  signinButton.click()
  time.sleep(4)
  return True


def testLoginWithBadCredentials():


  driver_loc = r'C:\Users\dutu_\Desktop\WEBDRIVER\chromedriver.exe'


# In[38]:


  browser = connect_to_webdriver(driver_loc)


# In[39]:


  browser.get('http://localhost:3000/')


# In[40]:


  email = browser.find_element_by_id("email")


# In[41]:


  password = browser.find_element_by_id("password")


# In[42]:


  signinButton = browser.find_element_by_xpath(
    "/html/body/div/body/div/div[1]/div/form/button")


# In[43]:


  email.send_keys("testselenium@mail.com")
  time.sleep(2)


# In[44]:


  password.send_keys("testseleniumfake")
  time.sleep(2)


# In[45]:

  
  email.submit()


# In[30]:


  signinButton.click()
  time.sleep(2)
  errorMessage = browser.find_element_by_xpath("/html/body/div/body/div/div[1]/div/form/div[3]")

  if errorMessage is not None:
    return True


# In[ ]:
if __name__ == "__main__":
  if testLoginSuccessful():
    print("Test login with good credentials successful")
  if testLoginWithBadCredentials():
    print("Test login with bad credentials successful")