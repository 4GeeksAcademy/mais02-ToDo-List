const Hover = ({ text, index, onDelete }) => {
    return (
        <li className="list-group-item closeButton d-flex justify-content-between align-items-center">
            {text}
            <button type="button" class="btn-close" aria-label="Close" onClick={() => onDelete(index)}></button>
        </li>
    )
};

export default Hover;