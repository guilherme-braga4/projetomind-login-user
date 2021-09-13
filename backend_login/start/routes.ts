import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')
Route.post('/cadastro', 'UsersController.store')

Route.get('/me', 'AuthController.me')

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/user/:id', 'UsersController.show')
  Route.put('/user/:id', 'UsersController.update')
});

