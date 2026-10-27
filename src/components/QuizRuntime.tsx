'use client';

import { useEffect } from 'react';
import { initQuiz } from '@/site/quiz';

export default function QuizRuntime() {
  useEffect(() => initQuiz(), []);
  return null;
}
