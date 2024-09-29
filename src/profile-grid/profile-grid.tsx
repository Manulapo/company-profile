/* eslint-disable @typescript-eslint/no-explicit-any */
import PROFILES from '../../API/profiles.json';
import { ProfileTag, ProfileTagClick } from '../profile-tag/profile-tag';
import './profile-grid.css';
import { IProfile } from '../profile-tag/profile-tag.model';
import { useEffect, useState } from 'react';

export interface ProfileGridProps {
    profileName: string,
    onProfileClicked: (output: ProfileTagClick) => IProfile | undefined
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ profileName, onProfileClicked }) => {
    const [profileArray, setProfileArray] = useState<IProfile[]>(PROFILES);
    const notPresent = 'N/A';

    const profilesStored = (): IProfile[] => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    useEffect(() => {
        setProfileArray([...PROFILES,...profilesStored(),])
    }, [profileArray]);

    const displayOnSearchResult = (profileArray: IProfile[]) => {
        let filteredProfileArray: IProfile[] | undefined;

        if (profileArray.length !== 0) {
            filteredProfileArray = profileArray.filter(profile => profile.name?.toLowerCase().includes(profileName.toLowerCase()) || profile.role?.toLowerCase().includes(profileName.toLowerCase()));
        }

        return displayArray(filteredProfileArray);
    };

    const displayArray = (profileArray: IProfile[] = []) => {
        if (profileArray.length === 0) {
            return <div className="not-found">404 No profiles found...</div>;
        } else {
            return (profileArray.map((profile: IProfile, i: number) => {
                return (
                    <ProfileTag name={profile.name ?? notPresent} role={profile.role ?? notPresent} photo={profile.photo ?? notPresent} key={i} id={profile.id} onProfileTagClicked={(profileTag: ProfileTagClick) => onProfileClicked(profileTag)} />
                );
            }));
        }
    };

    return (
        <div className="profile-grid">
            {displayOnSearchResult(profileArray)}
        </div>
    );
};

export default ProfileGrid;