import { COMMENT } from "./commentModel"

export interface USERDATA{
     status: string,
     message: string,
     data: {
      user: USERS
     }
}


export interface USERS {
    profilePhoto: image
    _id: string
    username: string
    email: string
    role: string
    isAccountVerified: boolean
    posts?: POST[]
    id?: string;
    bio?: string
    createdAt:Date,
    updatedAt: Date,
    followers: string[],
    following: string[]
  }
  export interface POST {
    _id: string
    image?: image
    decsription: string
    user: USERS
    category?: string
    likes: string[]
    comments: COMMENT[]
    id?: string
    createdAt:Date,
    updatedAt: Date
  }
  
  
  export interface image {
    url: string
    public_id: string | null
  }
  