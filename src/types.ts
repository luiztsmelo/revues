export interface Client {
  uuid: string
  status: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phonenumber: string
  phonenumber2?: string
  cep: string
  street: string
  streetnumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}
