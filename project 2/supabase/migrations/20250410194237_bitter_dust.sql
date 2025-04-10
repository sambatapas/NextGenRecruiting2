/*
  # Initial Schema Setup for NextGen Recruiting Platform

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - role (enum: athlete, recruiter)
      - full_name (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - athlete_profiles
      - id (uuid, primary key)
      - profile_id (uuid, references profiles)
      - position (text)
      - graduation_year (integer)
      - height (integer, in cm)
      - vertical_jump (integer, in cm)
      - school (text)
      - stats (jsonb)
      - achievements (jsonb[])
      - video_urls (text[])
      
    - recruiter_profiles
      - id (uuid, primary key)
      - profile_id (uuid, references profiles)
      - institution (text)
      - title (text)
      - division (text)
      - verified (boolean)
    
    - messages
      - id (uuid, primary key)
      - sender_id (uuid, references profiles)
      - receiver_id (uuid, references profiles)
      - content (text)
      - created_at (timestamp)
      - read_at (timestamp)
    
    - events
      - id (uuid, primary key)
      - creator_id (uuid, references profiles)
      - title (text)
      - description (text)
      - location (text)
      - start_date (timestamp)
      - end_date (timestamp)
      - type (text)
      - max_participants (integer)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on user role
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('athlete', 'recruiter');

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role user_role NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create athlete profiles table
CREATE TABLE athlete_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  position text,
  graduation_year integer,
  height integer, -- in cm
  vertical_jump integer, -- in cm
  school text,
  stats jsonb DEFAULT '{}',
  achievements jsonb[] DEFAULT '{}',
  video_urls text[] DEFAULT '{}',
  UNIQUE(profile_id)
);

-- Create recruiter profiles table
CREATE TABLE recruiter_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  institution text NOT NULL,
  title text NOT NULL,
  division text NOT NULL,
  verified boolean DEFAULT false,
  UNIQUE(profile_id)
);

-- Create messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles NOT NULL,
  receiver_id uuid REFERENCES profiles NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Create events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES profiles NOT NULL,
  title text NOT NULL,
  description text,
  location text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  type text NOT NULL,
  max_participants integer
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiter_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Athlete profiles policies
CREATE POLICY "Athlete profiles are viewable by everyone"
  ON athlete_profiles FOR SELECT
  USING (true);

CREATE POLICY "Athletes can update own profile"
  ON athlete_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = athlete_profiles.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Recruiter profiles policies
CREATE POLICY "Recruiter profiles are viewable by everyone"
  ON recruiter_profiles FOR SELECT
  USING (true);

CREATE POLICY "Recruiters can update own profile"
  ON recruiter_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = recruiter_profiles.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Messages policies
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles
      WHERE profiles.id IN (sender_id, receiver_id)
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = (
      SELECT user_id FROM profiles
      WHERE profiles.id = sender_id
    )
  );

-- Events policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Recruiters can create events"
  ON events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'recruiter'
    )
  );

-- Create functions
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();