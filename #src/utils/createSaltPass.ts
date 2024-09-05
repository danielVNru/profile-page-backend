import md5 from "md5"


export const saltPassword = (password: string, salt?: string) => {    
    return {
        salt: salt?? md5(`${new Date().getTime()}pop3`),
        sPass: md5(salt+ password)
    }
} 