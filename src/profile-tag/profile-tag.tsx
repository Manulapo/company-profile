import React from "react";
import './profile-tag.css';

export interface ProfileTagProps {
    name: string,
    role: string,
    photo: string,
    id: number;
    onProfileTagClicked: ({ name, role, photo, id }: ProfileTagClick) => ProfileTagClick | undefined;
}

export interface ProfileTagClick {
    name?: string,
    role?: string,
    photo?: string,
    id: number;
}

export const ProfileTag: React.FC<ProfileTagProps> = ({ name, role, photo, id, onProfileTagClicked }) => {
    return (
        <div key={id} className="profile-tag mx-2 my-2">
            <div className="row d-flex profile">
                <div className="col-4 profile-img" onClick={() => onProfileTagClicked({ name, role, photo, id })}>
                    <img src={photo} alt={name + '-pic'} className="rounded-circle" />
                </div>
                <div className="col-6 profile-data mt-5">
                    <h3 className="profile-name">{name ?? 'N/A'}</h3>
                    <div className="profile-role">{role ?? 'N/A'}</div>
                </div>
            </div>
        </div>
    )
}
