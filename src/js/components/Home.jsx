import { useState } from "react";
import Hover from "./Hover";
//import Counter from "./Counter"

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDoList, setToDoList] = useState([]);
	const [firstReplaced, setFirstReplaced] = useState(false);

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (!firstReplaced) {
				setToDoList([inputValue]);
				setFirstReplaced(true);
			} else {
				setToDoList([...toDoList, inputValue]);
			}
			setInputValue("");
		}
	};

	const handleDelete = (indexToDelete) => {
		setToDoList(toDoList.filter((_, index) => index !== indexToDelete));
	};

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">To-Do</h1>
			<div className="container" style={{boxShadow: "-2px 11px  20px darkgrey"}}>
				<ul style={{padding: 0}}>
					<li className="list-group-item">
						<input
							type="text"
							placeholder="What needs to be done?"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</li>

					{!firstReplaced ? (
						<li className="list-group-item">No tasks, add a task</li>
					) : null}

					{toDoList.map((item, index) => (
						<Hover
							key={index}
							text={item}
							index={index}
							onDelete={handleDelete}
						/>
					))}
				</ul>
				<p>{toDoList.length} item left</p>
			</div>
		</div>
	);
};

export default Home;
