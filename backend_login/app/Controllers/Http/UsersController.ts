import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event';
import User from 'App/Models/User';

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all();
    return response.status(200).json(users);

  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
        console.log('aqui')
      const { name, email, cpf, password, nivel } = request.all();
      console.log('aqui2')
      const user = await User.create({
        name,
        email,
        cpf,
        password,
        nivel
      })

      const { token } = await auth.use('api').generate(user ,{
        expiresIn: '10mins'
      })

      Event.emit('new:users', user);
      await user.save()
        .catch(err => response.status(400).json(err));

      return response.status(201).send({ user, token });

    } catch (err) {
      return response.status(400).json({err, msg: 'esta caindo aqui'});
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const user = await User
      .find(id)
      .catch(err => response.json(err))

    return response.json({user})
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const { name, email, cpf } = request.all()
    const user = await User.findOrFail(id)
    // user.email = email || user.email
    // user.password = password || user.password

    user.merge({
      name, 
      email, 
      cpf
    })

    await user
      .save()
      .catch(err => response.status(400).json(err))

    return response.json({user})
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;
    const user = await User.findOrFail(id)

    await user
      .delete()
      .catch(err => response.status(400).json(err))

    return response.status(204)
  }
}

