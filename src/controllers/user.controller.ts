// Controller zur Handhabung der Benutzerregistrierung und Anmeldung
import { Request, Response } from 'express';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt';

// Registriert einen neuen Benutzer
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = new User({ email, password, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'User registration failed', error });
  }
};

// Führt die Benutzeranmeldung durch
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};