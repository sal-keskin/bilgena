from playwright.sync_api import sync_playwright, expect

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Visit Dashboard
        print("Visiting Dashboard...")
        page.goto("http://localhost:3000")

        # Wait for content to load
        page.wait_for_selector("h1:has-text('Content')")

        # Screenshot Dashboard
        page.screenshot(path="verification/dashboard.png")
        print("Dashboard screenshot saved.")

        # 2. Visit Setup Page
        print("Visiting Setup Page...")
        page.click("text=Settings")
        page.wait_for_url("**/setup")
        page.wait_for_selector("h1:has-text('Set up Page')")

        # Screenshot Setup
        page.screenshot(path="verification/setup.png")
        print("Setup screenshot saved.")

        # 3. Create a Course (simulate click on 'Create course')
        print("Creating Course...")
        page.goto("http://localhost:3000")
        page.click("button:has-text('Create course')")

        # Wait for navigation to editor
        page.wait_for_url("**/editor/*")

        # 4. Verify Editor
        print("Visiting Editor...")
        page.wait_for_selector("text=Course Preview") # In MobileCanvas top bar

        # Screenshot Editor (Empty state)
        page.screenshot(path="verification/editor.png")
        print("Editor screenshot saved.")

        # 5. Add Lesson and Open Slide Library
        print("Adding Lesson...")
        # Find the Add Lesson button. It's in the sidebar header "Lessons"
        # It has an 'add' material icon.
        # We can look for the button inside the sidebar.
        page.click("aside button:has-text('add')")

        # Wait for lesson to appear
        page.wait_for_selector("text=New Lesson")

        # Click the lesson to make it active (if not already)
        page.click("text=New Lesson")

        # Now 'New Slide' button should be visible
        print("Opening Slide Library...")
        page.click("text=New Slide")
        page.wait_for_selector("text=Slide Library")

        # Screenshot Slide Library
        page.screenshot(path="verification/slide_library.png")
        print("Slide Library screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
