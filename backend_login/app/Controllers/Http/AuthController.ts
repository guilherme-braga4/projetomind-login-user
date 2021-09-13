import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {

  public async login({ request, auth, response }: HttpContextContract) {
    try {
      const { email, password } = request.all();

      const { token } = await auth.use('api').attempt(email, password, {
        expiresIn: '15mins'
      });

      const user = await User.query().where('email', email).first();

      return response.json({ token, user })
    } catch (err) {
        console.log(err)
      return response.status(400).send(err);
    }
  }

  public async me({ response, auth }: HttpContextContract) {
    try {

      await auth.use('api').authenticate()
      const currentUser = auth.use('api').user;

      if (!currentUser) {
        return response.status(404).json('Usuário não encontrado!')
      }

      return response.status(200).json({ currentUser });

    } catch (ex) {
      return response.status(401).json({ status: 'Token expirado!', error: true })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()
  }
}

