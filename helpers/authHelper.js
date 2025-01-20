import bcrypt from 'bcrypt';

export const hashPassword = async(password)=>{
    try{
        const saltRounds = 10;
        const hasedPassword = await bcrypt.hash(password, saltRounds)
        return hasedPassword;
    }
    catch(error){
        console.log(error);
    }
}

export const comaprePassword = async (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
}

