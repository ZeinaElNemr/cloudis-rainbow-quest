
import { supabase } from '@/lib/supabase';

export const saveHighScore = async (playerName: string, score: number, timeInSeconds: number) => {
  try {
    const { data, error } = await supabase
      .from('high_scores')
      .insert([
        { 
          player_name: playerName,
          score: score,
          time_in_seconds: timeInSeconds,
          created_at: new Date().toISOString()
        }
      ]);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving score:', error);
    return null;
  }
};

export const getTopScores = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('high_scores')
      .select('*')
      .order('score', { ascending: false })
      .order('time_in_seconds', { ascending: true })
      .limit(limit);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
};
