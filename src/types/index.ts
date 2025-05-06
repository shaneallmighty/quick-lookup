// This file contains the types used in the application

// Data shape: each item in the JSON array will have a "Participant" field and other fields that can be of type string, number, or null
export interface ScoreEntry {
    Participant: string;
    Total: number | null;  // Assuming Total is a number or null
    [key: string]: string | number | null;  // Dynamically shaped entries
  }