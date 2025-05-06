import { test, expect } from '@playwright/test';

const testData = {
  participants: [
    { name: 'Vera Voorbeeld', competency: 'Enthousiasm', score: '4.8' },
    { name: 'James Peterson', competency: 'Teamwork', score: '3.2' },
  ],
  summaries: [
    { competency: 'Enthousiasm', type: 'Average', result: '3.6' },
    { competency: 'Teamwork', type: 'Highest', result: '3.7' },
  ],
};

test.describe('ScoreLookup Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the ScoreLookup component is rendered
    await page.goto('http://localhost:5173'); // Replace with your app's URL
  });

  test('should display participant score when Participant is selected', async ({ page }) => {
    for (const participant of testData.participants) {
      // Select "Participant" radio button
      await page.locator('input[value="Participant"]').check();

      // Select a competency
      await page.locator('select:has-text("Select competency")').selectOption(participant.competency);

      // Select a participant
      await page.locator('select:has-text("Select participant")').selectOption(participant.name);

      // Click the Submit button
      await page.locator('button:has-text("Show score")').click();

      // Verify the output
      const output = page.locator('.output p');
      await expect(output).toHaveText(`The score for ${participant.name} in ${participant.competency} is ${participant.score}.`);
    }
  });

  test('should display summary calculation when Summary is selected', async ({ page }) => {
    for (const summary of testData.summaries) {
      // Select "Summary" radio button
      await page.locator('input[value="Summary"]').check();

      // Select a competency
      await page.locator('select:has-text("Select competency")').selectOption(summary.competency);

      // Select a summary type
      await page.locator('select:has-text("Select Summary")').selectOption(summary.type);

      // Click the Submit button
      await page.locator('button:has-text("Show score")').click();

      // Verify the output
      const output = page.locator('.output p');
      await expect(output).toHaveText(`The ${summary.type.toLowerCase()} score for ${summary.competency} is ${summary.result}.`);
    }
  });

  test('should show an alert when no competency is selected', async ({ page }) => {
    // Listen for the alert dialog
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please select a competency.');
      await dialog.dismiss(); // Close the alert
    });
  
    // Click the Submit button without selecting any options
    await page.locator('button:has-text("Show score")').click();
  });
});