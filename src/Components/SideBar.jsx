export default function SideBar({ handleToggleModal, data }) {
    return (
        <div className="sideBar">
            {/* Clicking on the background overlay will trigger handleToggleModal */}
            <div onClick={handleToggleModal} className="bckgrdOverlay"></div>

            {/* Prevent clicking inside the sidebar content from closing the modal */}
            <div className="sideBarContent" onClick={(e) => e.stopPropagation()}>
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-right-long"></i>
                </button>
            </div>
        </div>
    );
}
