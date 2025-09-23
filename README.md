# App

GymPass style app

## RFs (Requesitos funcionais)

 - [x] Deve ser possível se cadastrar
 - [x] Deve se possível se autenticar
 - [x] Deve ser possivel obter o perfil de um usuario logado
 - [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
 - [x] - Deve ser possível o usuario obter seu histórico de check-ins
 - [x] Deve ser possível o usuarário buscar academias próximas (até 10km)
 - [x] Deve ser possível o usuarário buscar academias pelo nome
 - [x] Deve ser possível o usuarário realizar check-in em uma academia
 - [x] Deve ser possível validar o check-in de um usuário
 - [x] Deve ser possível cadastar uma academia

## RNs (Regras de Negócio)

- [x] O usuario não deve se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in (100m) da academia
- [ ] O check-in só pode ser validado após 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RHFs (Requesitos não-funcionais)

- [x] A senha do usuario precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 item por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)