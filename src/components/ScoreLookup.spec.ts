import { test, expect } from '@playwright/test';
import { ScoreEntry } from '../types'; // Adjust the import path as necessary

let testData: ScoreEntry[]; // Use the imported type

test.beforeAll(async ({ request }) => {
  // Fetch the JSON data dynamically
  const response = await request.get('http://localhost:5173/assets/scores.json');
  testData = await response.json();
});

test.describe('ScoreLookup Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the ScoreLookup component is rendered
    await page.goto('http://localhost:5173'); // Replace with your app's URL
  });


  test('should display participant score when Participant is selected', async ({ page }) => {
    for (const participant of testData) {
      // Select "Participant" radio button
      await page.locator('input[value="Participant"]').check();

      // Select a competency
      const competencies = Object.keys(participant).filter(
        (key) => key !== 'Participant' && key !== 'Total'
      );
      for (const competency of competencies) {
        await page.locator('select:has-text("Select competency")').selectOption(competency);

        // Select a participant
        await page.locator('select:has-text("Select participant")').selectOption(participant.Participant);

        // Click the Submit button
        await page.locator('button:has-text("Show score")').click();

        // Verify the output
        const output = page.locator('.output p');
        const expectedValue = participant[competency];
        if (typeof expectedValue === 'string') {
          await expect(output).toHaveText(`The level for ${participant.Participant} in ${competency} is '${expectedValue}'.`);
        } else {
          await expect(output).toHaveText(`The score for ${participant.Participant} in ${competency} is ${expectedValue}.`);
        }
      }
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


  test('should show an alert when no participant is selected', async ({ page }) => {
    // Select "Participant" radio button
    await page.locator('input[value="Participant"]').check();
  
    // Dynamically select the first competency from the first participant
    const firstParticipant = testData[0]; // Get the first participant from the dynamic data
    const firstCompetency = Object.keys(firstParticipant).find(
      (key) => key !== 'Participant' && key !== 'Total'
    );
  
    if (!firstCompetency) {
      throw new Error('No valid competency found in test data.');
    }

    // Select the competency
    await page.locator('select:has-text("Select competency")').selectOption(firstCompetency);
  
    // Listen for the alert dialog
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please select a participant.');
      await dialog.dismiss(); // Close the alert
    });
  
    // Click the Submit button without selecting a participant
    await page.locator('button:has-text("Show score")').click();
  });

  
  test('should handle empty scores data gracefully', async ({ page }) => {
    // Simulate an empty scores.json file
    await page.route('**/assets/scores.json', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      })
    );
  
    // Navigate to the page
    await page.goto('http://localhost:5173');
  
    // Verify that dropdowns are empty
    const competencyOptions = await page.locator('select:has-text("Select competency") option').allTextContents();
    expect(competencyOptions).toHaveLength(1); // Only the "Select competency" placeholder should be present

    //select radio button
    await page.locator('input[value="Participant"]').check();

    const participantOptions = await page.locator('select:has-text("Select participant") option').allTextContents();
    expect(participantOptions).toHaveLength(1); // Only the "Select participant" placeholder should be present
  });

});