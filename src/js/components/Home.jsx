import { useEffect, useState } from "react";
import Hover from "./Hover";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);
    const API = "https://playground.4geeks.com/todo";


    const getToDos = async () => {
        try {
            const response = await fetch(`${API}/users/wdym`);
            const data = await response.json();
            setTasks(data.todos);
        } catch (error) {
            console.log("Get user error:", error);
        }
    };


    const handleKeyDown = async () => {
        const newTask =
        {
            "label": inputValue,
            "is_done": false
        }
        try {
            const response = await fetch(`${API}/todos/wdym`, {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            getToDos();
            setInputValue("");
        } catch (error) {
            console.log("Creating post error:", error);
        }
    };


    const deletePost = async (taskId) => {
        try {
            await fetch(`${API}/todos/${taskId}`, { method: "DELETE" })
            getToDos();
        } catch (error) {
            console.log("Delete post error:", error);
        }
    };

    const deleteAllButton = async () => {
        try {
            const response = await fetch(`${API}/users/wdym`);
            const data = await response.json();
            if (Array.isArray(data.todos)) {
            for (const task of data.todos) {
                await fetch(`${API}/todos/${task.id}`, {method: "DELETE"});
            }}
            await getToDos();
        }
        catch (error) {
            console.error('Delete all post error:', error);
        }
    }


    useEffect(() => {
        getToDos();
    }, [])

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">To-Do</h1>
            <div className="container" style={{ boxShadow: "-2px 11px  20px darkgrey" }}>
                <ul style={{ padding: 0 }}>
                    <li className="list-group-item">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleKeyDown()
                                }
                            }}
                        />
                    </li>

                    {tasks.length === 0 ? (
                        <li className="list-group-item">No tasks, add a task</li>
                    ) : tasks.map((task, index) => (
                        <Hover
                            key={task.id}
                            text={task.label}
                            index={index}
                            onDelete={() => deletePost(task.id)}
                        />
                    ))}
                </ul>
                <p>{tasks.length} item left</p>
            </div>

            <button onClick={deleteAllButton} className="btn btn-danger">
                Delete All Items
            </button>
        </div>
    );
};

export default Home;
