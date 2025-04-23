export interface LOGIN{
   status: string,
   message: string,
   data?: {
    id:string
   }
}

export interface image {
    url: string
    public_id: string | null
}

export interface loginForm {
    email: string,
    password: string
}
