/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Request, Response, NextFunction } from 'express'
import * as  Authservice from '../services/auth.service'
import { signupBodySchema } from '../validators/auth.validator'

/* eslint-disable @typescript-eslint/no-unused-vars */
export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
     const createdUser=await Authservice.signup(
     signupBodySchema.parse(req.body)
     )
     res.json(createdUser)
    // res.json({message:"user regester successfully"})
    }catch(err)
    {
        next(err)
    } 
   
}