import { buildSelectQuery } from "../utils/qb.js"
import bcrypt from 'bcrypt'

export const getAuthModel = async (db, { req }) => {
    try {
        const { username, email, password } = req
    
        const dataSql =  buildSelectQuery({
            table: 'm_users',
            where: ` m_users.username = ${db.escape(username)} or m_users.email = ${db.escape(email)}`,
            limit: 1
        })
        
        const [data] = await db.query(dataSql)

        if (!data || data.length === 0) {
            throw new Error('Username atau email anda salah!');
        }

        const user = data[0]

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Password salah')
        }

        delete user.password;
        
        return user

    } catch (error) {
        throw new Error(error.message)
    }
}