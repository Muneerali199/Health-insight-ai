/*
  # Healthcare Platform Schema

  1. New Tables
    - `profiles`
      - User profiles for both doctors and patients
      - Stores additional user information
    - `doctors`
      - Doctor-specific information
      - Specializations, qualifications, etc.
    - `appointments`
      - Appointment bookings between patients and doctors
    - `medical_records`
      - Patient medical history and records
    - `availability`
      - Doctor availability slots

  2. Security
    - Enable RLS on all tables
    - Policies for doctors and patients
    - Secure access control
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE time_slot AS ENUM ('morning', 'afternoon', 'evening');

-- Profiles table for both doctors and patients
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL DEFAULT 'patient',
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  date_of_birth date,
  gender text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Doctors table for additional doctor information
CREATE TABLE doctors (
  id uuid PRIMARY KEY REFERENCES profiles(id),
  specialization text NOT NULL,
  qualifications text[] NOT NULL,
  license_number text NOT NULL UNIQUE,
  years_of_experience integer,
  bio text,
  consultation_fee decimal(10,2),
  rating decimal(2,1),
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Doctor availability
CREATE TABLE availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  time_slot time_slot NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(doctor_id, day_of_week, time_slot)
);

-- Appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id),
  doctor_id uuid REFERENCES doctors(id),
  appointment_date date NOT NULL,
  time_slot time_slot NOT NULL,
  status appointment_status DEFAULT 'pending',
  symptoms text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medical records table
CREATE TABLE medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id),
  doctor_id uuid REFERENCES doctors(id),
  appointment_id uuid REFERENCES appointments(id),
  diagnosis text,
  prescription text,
  notes text,
  attachments text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Doctors policies
CREATE POLICY "Public can view doctor profiles"
  ON doctors FOR SELECT
  USING (true);

CREATE POLICY "Doctors can update their own profile"
  ON doctors FOR UPDATE
  USING (auth.uid() = id);

-- Availability policies
CREATE POLICY "Public can view doctor availability"
  ON availability FOR SELECT
  USING (true);

CREATE POLICY "Doctors can manage their availability"
  ON availability FOR ALL
  USING (auth.uid() = doctor_id);

-- Appointments policies
CREATE POLICY "Users can view their appointments"
  ON appointments FOR SELECT
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = doctor_id
  );

CREATE POLICY "Patients can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update their appointments"
  ON appointments FOR UPDATE
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = doctor_id
  );

-- Medical records policies
CREATE POLICY "Users can view their medical records"
  ON medical_records FOR SELECT
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = doctor_id
  );

CREATE POLICY "Doctors can create medical records"
  ON medical_records FOR INSERT
  WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Doctors can update medical records"
  ON medical_records FOR UPDATE
  USING (auth.uid() = doctor_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, role, full_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'role', 'patient')::user_role,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();