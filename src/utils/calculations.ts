// Calculations for the values of the scores and type of competency

// Lowest score
export const calculateLowestScore = (scores: number[]): number => {
    if (scores.length === 0) return 0; // Handle empty array
    return Math.min(...scores);
};

// Highest score
export const calculateHighestScore = (scores: number[]): number => {
    if (scores.length === 0) return 0; // Handle empty array
    return Math.max(...scores);
};

//Average score
export const calculateAverageScore = (scores: number[]): number => {
    const validScores = scores.filter(score => score !== null) as number[]; // Filter out null values and assert type
    if (validScores.length === 0) return 0; // Avoid division by zero
    let sum = 0;
    for (let i = 0; i < validScores.length; i++) {
        sum += validScores[i];
    }
    return Math.round((sum / validScores.length) * 10) / 10; // Round to one decimal place
}

// Calculate the lowest level (alphabetically)
export const calculateLowestLevel = (levels: string[]): string => {
    if (levels.length === 0) return "N/A"; 
    return levels.sort()[0]; // Sort alphabetically and return the first element
};

// Calculate the highest level (alphabetically)
export const calculateHighestLevel = (levels: string[]): string => {
    if (levels.length === 0) return "N/A"; 
    return levels.sort()[levels.length - 1]; // Sort alphabetically and return the last element
};

export const calculateAverageLevel = (levels: string[]): string => {
    if (levels.length === 0) return "N/A";
    const sortedLevels = levels.sort();
    
    //find the middle index
    const midIndex = Math.floor(sortedLevels.length / 2);
    if (sortedLevels.length % 2 === 0) {
        // If even, return the average of the two middle elements
        const midValue1 = sortedLevels[midIndex - 1];
        const midValue2 = sortedLevels[midIndex];
        return `${midValue1} & ${midValue2}`; // Return both middle values
    } else {
        // If odd, return the middle element
        return sortedLevels[midIndex];
    }
};


//Type of competency, either score or level
export const getCompetencyType = (value: string | number | null): string => {
    if (value === null) return "unknown";

    if (typeof value === "number") return "score";

    if (typeof value === "string" && /^[A-Za-z]+$/.test(value)) {
        return "level"; // It's a string containing only letters
      }
    return "Unknown"; // Handle unexpected cases
}
