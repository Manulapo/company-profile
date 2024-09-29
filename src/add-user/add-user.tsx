import { useEffect, useState } from "react";
import { IProfile } from "../profile-tag/profile-tag.model";
import './add-user.css'
import PROFILES from '../../API/profiles.json'

const AddUser = () => {

    const profilesStored = (): IProfile[] => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    const [LS_Profiles, setLS_Profiles] = useState<IProfile[]>(profilesStored());
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [img, setImg] = useState("");
    const [age, setAge] = useState("");
    const [serviceAge, setServiceAge] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(LS_Profiles));
        console.log('LS:', profilesStored())
    }, [LS_Profiles]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.value);
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNumber(e.target.value)) {
            setAge(e.target.value);
        } else {
            alert('Inserire un numero valido')
        }
    };

    const handleServiceAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNumber(e.target.value)) {
            setServiceAge(e.target.value);
        } else {
            alert('Inserire un numero valido')
        }
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearForm()
    };

    const isNumber = (value: string): boolean => {
        return !isNaN(Number(value));
    }

    const clearForm = () => {
        setName("");
        setRole("");
        setImg("");
        setAge("");
        setServiceAge("");
        setBio("");
    }

    const submitForm = () => {
        if (name === "" || role === "" || img === "" || age === "" || serviceAge === "" || bio === "") {
            alert('Inserire tutti i campi')
        } else {
            addUserToLS({ id: 0, name, role, photo: img, age: Number(age), years_of_service: Number(serviceAge), bio })
        }
    }

    const getId = (profiles: IProfile[]) => {
        const fullArray: IProfile[] = [...PROFILES, ...profiles];
        const fullArrayLength = fullArray.length - 1;
        return Number(fullArray[fullArrayLength].id) + 1
    }

    const addUserToLS = (object: IProfile) => {
        object = {
            ...object,
            id: getId(LS_Profiles)
        }
        setLS_Profiles([...LS_Profiles, object])
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={handleRoleChange}
                />
            </div>
            <div>
                <label htmlFor="img">Image:</label>
                <input
                    type="text"
                    id="img"
                    value={img}
                    onChange={handleImgChange}
                />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    type="text"
                    id="age"
                    value={age}
                    onChange={handleAgeChange}
                />
            </div>
            <div>
                <label htmlFor="serviceAge">Service Age:</label>
                <input
                    type="text"
                    id="serviceAge"
                    value={serviceAge}
                    onChange={handleServiceAgeChange}
                />
            </div>


            <div>
                <label htmlFor="bio">Bio:</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={handleBioChange}
                />
            </div>

            <button type="submit" onClick={() => submitForm()}>Submit</button>
        </form>
    )
}

export default AddUser