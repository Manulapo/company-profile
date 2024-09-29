import { IProfile } from "../profile-tag/profile-tag.model"
import './bio.css'

export interface BioProps {
    profile: IProfile | null,
    dynamicClass: string,
}

const Bio: React.FC<BioProps> = ({ profile }) => {
    if (!profile) return;
    const { name, age, years_of_service, role, photo, bio, hobbies } = profile;

    return (
        <>
            <h2 className="title">{name ?? 'N/A'}</h2>
            <p className="role">{role ?? 'N/A'}</p>
            <div className="d-flex justify-content-space-between gap-3">
                <div className="bio-image">
                    <img src={photo} alt={name + '-pic'} />
                </div>
                <div className="info">
                    <b>Bio:</b>
                    <br />
                    <div className="bio">{bio ?? 'no Bio'}</div>
                    <b>Anni in Azienda: <span className="years">{years_of_service && years_of_service === 1 ? 'Primo anno' : years_of_service}</span></b>
                    <br />
                    <b>Età: <span className="years">{age ?? 'N/A'}</span></b>
                    <br />
                    <b>Tempo Libero:</b>
                    <br />
                    {hobbies && hobbies.join(', ')}
                </div>
            </div>
        </>
    )
}

export default Bio