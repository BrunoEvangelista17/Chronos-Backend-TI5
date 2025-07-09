// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/usuario.schema'; 
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async syncUserWithFirebase(firebaseUser: any) {
    const { uid, email, name, picture } = firebaseUser;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      const senhaFake = uid + Date.now(); // valor único
      const senha_hash = await bcrypt.hash(senhaFake, 10);

      user = new this.userModel({
        nome: name || 'Usuário Firebase',
        email,
        senha_hash,
        foto_url: picture,
        papel: 'usuario', // valor default (pode vir do token customizado também)
        ativo: true,
        score: 0,
      });

      await user.save();
    }

    return user;
  }
}
