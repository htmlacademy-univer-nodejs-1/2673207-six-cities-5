export enum UserType {
  Regular = 'Standart',
  Pro = 'pro'
}

export type User = {
  name: string,
  email: string,
  avatar: string,
  password: string,
  type: UserType
}
