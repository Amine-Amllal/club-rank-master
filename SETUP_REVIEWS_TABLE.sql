-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL CHECK (char_length(comment) > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_review_per_user_pair UNIQUE(user_id, reviewer_id),
  CONSTRAINT no_self_review CHECK (user_id != reviewer_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Enable RLS for reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reviews
CREATE POLICY "Reviews are viewable by all authenticated users" 
  ON reviews FOR SELECT 
  USING (auth.role() = 'authenticated_user');

-- Policy: Users can insert reviews
CREATE POLICY "Users can insert reviews" 
  ON reviews FOR INSERT 
  WITH CHECK (auth.uid() = reviewer_id AND auth.role() = 'authenticated_user');

-- Policy: Users can only update their own reviews
CREATE POLICY "Users can update their own reviews" 
  ON reviews FOR UPDATE 
  USING (auth.uid() = reviewer_id AND auth.role() = 'authenticated_user');

-- Policy: Users can only delete their own reviews
CREATE POLICY "Users can delete their own reviews" 
  ON reviews FOR DELETE 
  USING (auth.uid() = reviewer_id AND auth.role() = 'authenticated_user');
