import { test, expect } from "@playwright/test";

test.describe("Landing Page Explore Activity Refinement 2.2 — Verification Suite", () => {
  test("1. Verify Identity: 'Try a Mini Activity', Subtitle, and Honest Disclosure", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const explorer = page.locator("#explorer");
    await expect(explorer).toBeVisible();

    // Select Classes 4–7
    await explorer.locator('button[role="radio"]:has-text("Classes 4 – 7")').click();

    // Verify Refined Challenge Identity
    await expect(explorer).toContainText("Try a Mini Activity");
    await expect(explorer).toContainText("A quick, fun way to discover something new.");
    await expect(explorer).toContainText("Sample exploration · Your activity isn't saved");

    // Ensure old technical terms are removed from main view
    const explorerText = await explorer.innerText();
    expect(explorerText).not.toContain("30-Second Hands-On Micro-Challenge");
    expect(explorerText).not.toContain("Design Hierarchy Tuner");
    expect(explorerText).not.toContain("Enzyme Temperature & Reaction Lab");
    expect(explorerText).not.toContain("Cardiovascular Recovery");
  });

  test("2. Verify Foundation Tier (Classes 4–7) Across Activities", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const explorer = page.locator("#explorer");

    // Select Classes 4–7
    await explorer.locator('button[role="radio"]:has-text("Classes 4 – 7")').click();

    // A. Technology: Help the Robot Find Its Way
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await expect(explorer).toContainText("Help the Robot Find Its Way");
    await expect(explorer).toContainText("Tap the direction that helps the robot reach its destination:");
    const rocketHopBtn = explorer.locator('button:has-text("Rocket Hop")');
    await rocketHopBtn.click();
    await expect(explorer).toContainText("Destination Reached! ✨");
    await expect(explorer).toContainText("You helped the robot follow instructions.");

    // B. Art & Creativity: Make Your Poster Pop!
    await explorer.locator('button[role="radio"]:has-text("Art & Creativity")').click();
    await expect(explorer).toContainText("Make Your Poster Pop!");
    await expect(explorer).toContainText("Choose a colour theme to make your festival poster pop!");
    const oceanBtn = explorer.locator('button:has-text("Ocean Cyan & Coral")');
    await oceanBtn.click();
    await expect(explorer).toContainText("ART & FUN FAIR");
    await expect(explorer).toContainText("Colours instantly set an emotion!");

    // C. Ideas & Business: Plan a Mini School Fair Stall
    await explorer.locator('button[role="radio"]:has-text("Ideas & Business")').click();
    await expect(explorer).toContainText("Plan a Mini School Fair Stall");
    await expect(explorer).toContainText("Pick an item to make and share with your school friends:");
    const cupcakeBtn = explorer.locator('button:has-text("Homemade Cupcakes")');
    await cupcakeBtn.click();
    await expect(explorer).toContainText("Cupcake Bakery Stall Active! 🧁");
    await expect(explorer).toContainText("Offering something people enjoy on a warm afternoon is the heart of every great idea!");

    // D. Science & Nature: Help the Plant Grow
    await explorer.locator('button[role="radio"]:has-text("Science & Nature")').click();
    await expect(explorer).toContainText("Help the Plant Grow");
    await expect(explorer).toContainText("Choose what your plant needs to grow:");
    const beeBtn = explorer.locator('button:has-text("Invite a Friendly Bee")');
    await beeBtn.click();
    await expect(explorer).toContainText("Bee Visiting — Flower in Full Bloom! 🐝");
    await expect(explorer).toContainText("With water and sunlight, leaves make their own food through photosynthesis.");

    // E. People & Community: Make Our Playground Better
    await explorer.locator('button[role="radio"]:has-text("People & Community")').click();
    await expect(explorer).toContainText("Make Our Playground Better");
    await expect(explorer).toContainText("Choose one change that could help more people enjoy this space:");
    const rampsBtn = explorer.locator('button:has-text("Wheelchair Ramps")');
    await rampsBtn.click();
    await expect(explorer).toContainText("Wheelchair Access Connected Across Swings & Slides!");
    await expect(explorer).toContainText("When we design spaces for everyone, including friends who use wheelchairs");

    // F. Still Exploring: Pick Something New to Try
    await explorer.locator('button[role="radio"]:has-text("Still Exploring")').click();
    await expect(explorer).toContainText("Pick Something New to Try");
    await expect(explorer).toContainText("Choose one thing you'd enjoy trying today:");
    const comicCard = explorer.locator('button:has-text("Draw a 3-Panel Comic")');
    await comicCard.click();
    await expect(explorer).toContainText("Curiosity starts with trying things you enjoy.");
  });

  test("3. Verify Exploration Senior Tier (Classes 11–12) Scenarios and Adaptations", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const explorer = page.locator("#explorer");

    // Select Classes 11–12
    await explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")').click();

    // Technology: Smart Campus Route Delivery
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await expect(explorer).toContainText("Smart Campus Route Delivery");
    await expect(explorer).toContainText("Select the route priority to deliver lab equipment across campus:");
    const safetyBtn = explorer.locator('button:has-text("Pedestrian Safety")');
    await safetyBtn.click();
    await expect(explorer).toContainText("Autonomous systems balance multiple constraints like safety, speed, and battery.");

    // Business: Entrepreneurship Day Kits
    await explorer.locator('button[role="radio"]:has-text("Ideas & Business")').click();
    await expect(explorer).toContainText("Choose your pricing and packaging strategy for student project kits:");
    const kitBtn = explorer.locator('button:has-text("Starter Maker Kit")');
    await kitBtn.click();
    await expect(explorer).toContainText("Matching price to what students value most helps projects stay sustainable");

    // Community: Transit Hub Priorities
    await explorer.locator('button[role="radio"]:has-text("People & Community")').click();
    await expect(explorer).toContainText("Choose an urban design priority for the local transit hub:");
    const transitBtn = explorer.locator('button:has-text("Protected Crossings")');
    await transitBtn.click();
    await expect(explorer).toContainText("Urban planning balances safety, equity, and accessibility");
  });

  test("4. Verify Applied Tier (Degree / Diploma) Power Routing & Operating Models", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const explorer = page.locator("#explorer");

    // Select Degree / Engineering
    await explorer.locator('button[role="radio"]:has-text("Degree / Engineering")').click();

    // Technology: Smart Grid Power Router
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await expect(explorer).toContainText("Smart Grid Power Router");
    await expect(explorer).toContainText("Choose where to route excess solar energy during peak afternoon hours:");
    const computeBtn = explorer.locator('button:has-text("Research Computing Lab")');
    await computeBtn.click();
    await expect(explorer).toContainText("Dynamic load balancing keeps modern electrical systems stable, clean, and sustainable.");

    // Business: Campus Delivery Co-op
    await explorer.locator('button[role="radio"]:has-text("Ideas & Business")').click();
    await expect(explorer).toContainText("Choose the operating model for a student-run delivery pilot:");
    const lockerBtn = explorer.locator('button:has-text("Campus Smart Lockers")');
    await lockerBtn.click();
    await expect(explorer).toContainText("Evaluating trade-offs between fixed infrastructure and variable effort");

    // Science: Bioreactor Culture
    await explorer.locator('button[role="radio"]:has-text("Science & Nature")').click();
    await expect(explorer).toContainText("Select the nutrient medium for a clean algae bio-energy culture:");
    const salineBtn = explorer.locator('button:has-text("Saline Mineral Broth")');
    await salineBtn.click();
    await expect(explorer).toContainText("Optimizing biochemical media balances yield with sustainability");
  });
});

