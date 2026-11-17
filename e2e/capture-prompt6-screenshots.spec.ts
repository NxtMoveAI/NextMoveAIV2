import { test } from "@playwright/test";
import path from "path";

const ARTIFACT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Capture Prompt 6 Screenshots", () => {
  test("Capture desktop and mobile screenshots", async ({ page }) => {
    // 1. Desktop - School context preserved
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/get-started?stage=classes-4-7&audience=school");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-desktop-get-started-school-stage.png"),
      fullPage: true,
    });

    // 2. Desktop - College situation preserved
    await page.goto("/get-started?situation=discover&audience=college");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-desktop-get-started-college-situation.png"),
      fullPage: true,
    });

    // 3. Desktop - Professional disclaimer
    await page.goto("/get-started?audience=professionals");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-desktop-get-started-professionals-notice.png"),
      fullPage: true,
    });

    // 4. Desktop - Student stage recognized
    await page.goto("/get-started/student?stage=classes-8-10");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-desktop-student-stage-recognized.png"),
      fullPage: true,
    });

    // 5. Desktop - Student direct stage selection (all 6)
    await page.goto("/get-started/student");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-desktop-student-stage-direct-all.png"),
      fullPage: true,
    });

    // 6. Desktop - Student access under 13 guardian gate
    await page.goto("/get-started/student/access?stage=classes-4-7");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-desktop-access-under-13-guardian.png"),
      fullPage: true,
    });

    // 7. Desktop - Student dashboard aligned with Class 4-7
    await page.goto("/dashboard/student?stage=classes-4-7");
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-desktop-dashboard-class4-7.png"),
      fullPage: false,
    });

    // 8. Mobile - School context preserved
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/get-started?stage=classes-4-7&audience=school");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-mobile-get-started-school-stage.png"),
      fullPage: true,
    });

    // 9. Mobile - College situation preserved
    await page.goto("/get-started?situation=discover&audience=college");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-mobile-get-started-college-situation.png"),
      fullPage: true,
    });

    // 10. Mobile - Student direct stage selection
    await page.goto("/get-started/student");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "prompt6-mobile-student-stage-direct-all.png"),
      fullPage: true,
    });
  });
});
