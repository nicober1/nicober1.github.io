---
keywords: [Playwright]
---

```python
# Save storage state into the file.
storage = context.storage_state(path="state.json")

# Create a new context with the saved storage state.
context = browser.new_context(storage_state="state.json")

$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
pip install playwright
playwright install


$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
python playwright_script.py

PLAYWRIGHT_SKIP_BROWSER_GC=1

page.wait_for_timeout(5000)

from playwright.sync_api import expect

expect.set_options(timeout=10_000)
expect(page.get_by_text("Name")).to_be_visible(timeout=10_000)

playwright codegen demo.playwright.dev/todomvc


from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("about:blank")
    page.goto("chrome-error://chromewebdata/")
    page.locator("div").filter(has_text="Your connection is not private Attackers might be trying to steal your informati").first.click()
    page.get_by_role("button", name="Advanced").click()
    page.get_by_role("link", name="Proceed to centrali.mandg.com (unsafe)").click()
    page.get_by_placeholder("user@domain.com").click()
    page.get_by_placeholder("user@domain.com").fill("username")
    page.get_by_role("button", name="Next").click()
    page.locator("#i0118").fill("password")
    page.get_by_role("button", name="Sign in").click()
    page.get_by_role("button", name="Approve a request on my Microsoft Authenticator app").click()
    page.goto("https://login.microsoftonline.com/common/SAS/ProcessAuth")

    page.get_by_role("button", name="Browse ").click()
    page.get_by_role("link", name="All applications").click()
    page.get_by_role("link", name="App ").click()
    page.get_by_role("button", name="Click here").click()
    page.get_by_role("link", name="Categories").click()
    page.get_by_role("link", name="ava").click()
    page.get_by_role("menuitem", name="Profile").click()
    page.get_by_text("what").click()
    page.get_by_text("what", exact=True).click()
    page.locator("div").filter(has_text=re.compile(r"^tech$")).nth(2).click()
    page.get_by_text("what", exact=True).click()
    page.get_by_test_id("update-").click()
    page.get_by_role("button", name="close").click()
    page.get_by_role("link", name="logo").click()
    page.locator(".text-primary").click()
    page.get_by_role("link", name="about").click()
    page.get_by_text("Go to").click()
    page.get_by_role("link", name="App store").click()
    page.get_by_role("link", name="My ").click()
    page.get_by_role("link", name="All ").click()
    page.get_by_role("link", name="cat").click()
    page.get_by_role("link", name="col").click()
    page.get_by_test_id("what").click()
    page.locator(".img-screen").first.click()
    page.get_by_role("dialog").click()
    page.get_by_role("dialog").click()
    page.get_by_placeholder("Search for ").click()
    page.get_by_placeholder("Search for ").fill("what")
    page.get_by_placeholder("Search for ").press("Enter")
    page.locator("#btn-item-3").click()
    page.locator("#btn-item-5").click()
    page.get_by_role("link", name="My ").click()
    page.get_by_role("link", name="App ").click()
    page.get_by_role("link", name="App ").click(button="right")
    page.locator("div").filter(has_text=re.compile(r"^what$")).get_by_role("link", name="View all").click()
    page.locator("div:nth-child(2) > div > .img-screen").click()
    page.get_by_role("link", name="name").click()


    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)



import os
# Get session storage and store as env variable
session_storage = page.evaluate("() => JSON.stringify(sessionStorage)")
os.environ["SESSION_STORAGE"] = session_storage

# Set session storage in a new context
session_storage = os.environ["SESSION_STORAGE"]
context.add_init_script("""(storage => {
  if (window.location.hostname === 'example.com') {
    const entries = JSON.parse(storage)
    for (const [key, value] of Object.entries(entries)) {
      window.sessionStorage.setItem(key, value)
    }
  }
})('""" + session_storage + "')")


from playwright.sync_api import sync_playwright


path_to_extension = "./my-extension"
user_data_dir = "/tmp/test-user-data-dir"


def run(playwright):
    context = playwright.chromium.launch_persistent_context(
        user_data_dir,
        headless=False,
        args=[
            f"--disable-extensions-except={path_to_extension}",
            f"--load-extension={path_to_extension}",
        ],
    )
    if len(context.background_pages) == 0:
        background_page = context.wait_for_event('backgroundpage')
    else:
        background_page = context.background_pages[0]

    # Test the background page as you would any other page.
    context.close()


with sync_playwright() as playwright:
    run(playwright)


```

```csharp
playwright codegen demo.playwright.dev/todomvc

using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            Headless = false,
        });
        var context = await browser.NewContextAsync();

        var page = await context.NewPageAsync();

        await page.GotoAsync("about:blank");

        await page.GotoAsync("chrome-error://chromewebdata/");

        await page.Locator("div").Filter(new() { HasText = "Your connection is not private Attackers might be trying to steal your informati" }).First.ClickAsync();

await page.GotoAsync("https://google.com");
await page.GetByPlaceholder("user@domain.com").ClickAsync();
await page.GetByRole(AriaRole.Button, new() { Name = "Next" }).ClickAsync();
await page.GetByRole(AriaRole.Link, new() { Name = "Proceed to centrali.mandg.com (unsafe)" }).ClickAsync();

await page.GetByPlaceholder("user@domain.com").FillAsync("username");
await page.Locator("#i0118").FillAsync("password");

await page.GetByRole(AriaRole.Button, new() { Name = "Browse what" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "All what" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "App what" }).ClickAsync();

        await page.GetByRole(AriaRole.Button, new() { Name = "Click here" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "what" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "what what what" }).ClickAsync();

        await page.GetByRole(AriaRole.Menuitem, new() { Name = "what" }).ClickAsync();

        await page.GetByText("what what").ClickAsync();

        await page.GetByText("what what", new() { Exact = true }).ClickAsync();

        await page.Locator("div").Filter(new() { HasTextRegex = new Regex("^what$") }).Nth(2).ClickAsync();

        await page.GetByText("what", new() { Exact = true }).ClickAsync();

        await page.GetByTestId("what").ClickAsync();

        await page.GetByRole(AriaRole.Button, new() { Name = "close" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "what" }).ClickAsync();

        await page.Locator(".text-primary").ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "what" }).ClickAsync();

        await page.GetByText("Go to portal").ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "App what" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "My what" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "All what" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "what" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "what" }).ClickAsync();

        await page.GetByTestId("what").ClickAsync();

        await page.Locator(".img-screen").First.ClickAsync();

        await page.GetByRole(AriaRole.Dialog).ClickAsync();

        await page.GetByRole(AriaRole.Dialog).ClickAsync();

        await page.GetByPlaceholder("Search for apps").ClickAsync();

        await page.GetByPlaceholder("Search for apps").FillAsync("esg");

        await page.GetByPlaceholder("Search for apps").PressAsync("Enter");

        await page.Locator("#btn-item-3").ClickAsync();

        await page.Locator("#btn-item-5").ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "My " }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "App store" }).ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "App store" }).ClickAsync(new LocatorClickOptions
        {
            Button = MouseButton.Right,
        });

        await page.Locator("div").Filter(new() { HasTextRegex = new Regex("^New all$") }).GetByRole(AriaRole.Link, new() { Name = "View all" }).ClickAsync();

        await page.Locator("div:nth-child(2) > div > .img-screen").ClickAsync();

        await page.GetByRole(AriaRole.Link, new() { Name = "All " }).ClickAsync();





```

```python
# pylint: disable-all
from playwright.sync_api import sync_playwright
import time

def launch_browser(url, path):
    with sync_playwright() as playwright:
        # browser = playwright.chromium.launch(headless=False,slow_mo=1000)
        browser = playwright.chromium.launch()
        context = browser.new_context(ignore_https_errors=True)
        page = context.new_page()
        page.goto(url,wait_until='commit',timeout=100000)
        page.wait_for_timeout(30000)
        page.screenshot(path=path, full_page=True)
        browser.close()

launch_browser('https://edition.cnn.com/', './static/scr/cnn.png')
launch_browser('https://www.bbc.com/', './static/scr/bbc.png')
launch_browser('https://www.cnbc.com/', './static/scr/cnbc.png')

```
