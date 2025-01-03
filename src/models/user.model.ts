// Definiert das Benutzermodell und die Schema-Struktur für MongoDB
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface zur Definition der Benutzereigenschaften
export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Benutzer-Schema mit E-Mail, Passwort und Rolle
const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  },
  { timestamps: true } // Automatische Zeitstempel für Erstellungs- und Änderungsdatum
);

// Hashing des Passworts vor dem Speichern
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Methode zur Passwortüberprüfung
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;