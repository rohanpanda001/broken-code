export interface EvaluationResult {
  score: number;
  feedback: string;
}

export interface AttemptResponse {
  id: string;
  questionId: string;
  candidateId: string;
  score: number | null;
  createdAt: string;
}
