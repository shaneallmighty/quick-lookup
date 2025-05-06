import { useEffect, useState } from 'react';
import { ScoreEntry } from '../types';

// Function to fetch scores from the JSON file
const fetchScores = async (): Promise<ScoreEntry[]> => {
  const response = await fetch('../assets/scores.json');
  if (!response.ok) {
    throw new Error(`Failed to fetch scores: ${response.statusText}`);
  }
  const data: ScoreEntry[] = await response.json();
  return data;
};

// Function to extract competencies from scores
const extractCompetencies = (scores: ScoreEntry[]): string[] => {
  if (scores.length === 0) return [];
  return Object.keys(scores[0]).filter(key => key !== 'Participant' && key !== 'Total');
};

// Function to extract participants from scores
const extractParticipants = (scores: ScoreEntry[]): string[] => {
  return scores.map(score => score.Participant).filter(Boolean);
};

// Function to extract totals from scores
const extractTotals = (scores: ScoreEntry[]): (number | null)[] => {
  return scores.map(score => score.Total);
};

export const useScores = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [competencies, setCompetencies] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [totals, setTotals] = useState<(number | null)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const data = await fetchScores();
        setScores(data);
        setCompetencies(extractCompetencies(data));
        setParticipants(extractParticipants(data));
        setTotals(extractTotals(data));
      } catch (error) {
        console.error('Failed to load scores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, []);

  return { scores, competencies, participants, totals, loading };
};