const Hover = (props) => {

    return (
        <li className="list-group-item closeButton d-flex justify-content-between align-items-center">
            {props.text}
            <button type="button" className="btn-close" aria-label="Close" onClick={props.onDelete}></button>
        </li>
    )
};

export default Hover;