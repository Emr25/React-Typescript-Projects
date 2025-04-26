import React, { useEffect, useState } from "react"
import { User } from "../types/user"
import { fetchUsers } from "../services/api"


const UserList: React.FC = () => {

    const [users, setusers] = useState<User[]>([])
    const [loading, setloading] = useState<boolean>(true)
    const [error, seterror] = useState<string | null>(null)


    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setusers(data)
                setloading(false)
            } catch (error) {
                seterror("Kullanıcılar yüklenirken bir hata oluştu")
                setloading(false)
            }
        };
        getUsers();
    }, []);

    if (loading) return <div>Yükleniyor...</div>
    if (error) return <div>{error}</div>


    return (
        <div>
            <h1>Kullanıcı listesi</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h3>{user.name}</h3>
                        <p>Email : {user.email}</p>
                        <p>Telefon : {user.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList