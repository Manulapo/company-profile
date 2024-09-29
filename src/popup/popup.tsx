import './popup.css';

export interface PopupProps {
    componentToRender: JSX.Element;
    dynamicClass?: string;
    closePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({componentToRender, dynamicClass, closePopup}) => {
    return (
        <div className={`popup-window fade-in ${dynamicClass}`}>
            <div className="popup-content">
                <button className="close-icon" onClick={closePopup}>x</button>
                {componentToRender}
            </div>
        </div>
    );
}

export default Popup;