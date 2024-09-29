import { useEffect, useState } from "react";
import ProfileGrid from "../profile-grid/profile-grid";
import SearchBar from "../searchbar/searchbar";
import Bio from "../bio/bio";
import { IProfile } from "../profile-tag/profile-tag.model";
import profiles_JSON from "../../API/profiles.json";
import { ProfileTagClick } from "../profile-tag/profile-tag";
import "./home.css";
import Popup from "../popup/popup";
import AddUser from "../add-user/add-user";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const [profileToDisplay, setProfileToDisplay] = useState<IProfile | undefined>(undefined);
    const [fadeInClass, setFadeInClass] = useState("");
    const [popupType, setPopupType] = useState<"bio" | "addUser" | null>(null);

    useEffect(() => {
        setFadeInClass("");
        if (popupType) {
            setTimeout(() => {
                setFadeInClass("show");
            }, 100);
        }
    }, [popupType]);

    const getProfileInfo = (id: number): IProfile[] | null => {
        const fullProfile =
            profiles_JSON.filter(
                (profile_JSON: IProfile) => profile_JSON.id === id
            ) ?? undefined;

        return fullProfile;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const buttonClicked = () => {
        setPopupType("addUser");
    };

    const setProfileReady = (profile: ProfileTagClick): IProfile | undefined => {
        const fullProfile: IProfile | undefined =
            profile && getProfileInfo(profile.id)?.[0];
        if (fullProfile) {
            setProfileToDisplay(fullProfile);
            setPopupType("bio");
            return fullProfile;
        }
    };

    return (
        <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.currentTarget === e.target && popupType && setPopupType(null)
            }
        >
            {popupType === "bio" && profileToDisplay && (
                <Popup
                    componentToRender={
                        <Bio
                            profile={profileToDisplay}
                            dynamicClass={fadeInClass}
                        />
                    }
                    closePopup={() => setPopupType(null)}
                    dynamicClass={fadeInClass}
                />
            )}
            {popupType === "addUser" && (
                <Popup
                    componentToRender={<AddUser />}
                    closePopup={() => setPopupType(null)}
                    dynamicClass={fadeInClass}
                />
            )}
            <div className={`search ${popupType ? "blurred" : ""}`}>
                <SearchBar
                    searchValue={searchValue}
                    onSearchChange={handleSearchChange}
                    onAddUserClick={() => buttonClicked()}
                />
            </div>
            <div className={`grid ${popupType ? "blurred" : ""}`}>
                {profiles_JSON.length ? (
                    <ProfileGrid
                        profileName={searchValue}
                        onProfileClicked={(profile: ProfileTagClick) =>
                            setProfileReady(profile)
                        }
                    />
                ) : (
                    <div className="not-found">404 No profiles found...</div>
                )}
            </div>
        </div>
    );
};

export default Home;
