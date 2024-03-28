import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import calendarIcon from './assets/calendar.png';
import addIcon from './assets/plus.png';
import rmIcon from './assets/moins.png';
import editIcon from './assets/modifier.png';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // Initialiser la date sélectionnée à null
    const [showCalendar, setShowCalendar] = useState(false); // État pour afficher ou masquer le calendrier
    const [editingTask, setEditingTask] = useState(null); // État pour stocker la tâche en cours d'édition

    const addTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), name: inputValue, date: selectedDate }]);
            setInputValue('');
            setSelectedDate(null); // Réinitialiser la date sélectionnée après avoir ajouté une tâche
        }
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const editTask = (taskId, newName) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, name: newName } : task
        ));
    };

    const changeDate = (newDate) => {
        setTasks(tasks.map(task =>
            task.id === editingTask.id ? { ...task, date: newDate } : task
        ));
        setShowCalendar(false);
        setEditingTask(null);
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setSelectedDate(task.date);
        setShowCalendar(true);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ajouter une nouvelle tâche"
            />
            <button onClick={addTask}>
                <img src={addIcon} alt="Ajouter" width="20" height="20" />
            </button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input type={"checkbox"}/>
                        <span>{task.name}</span>&nbsp; {/* Ajout d'un espace */}
                        <span>Date: {task.date ? task.date.toLocaleDateString() : 'Aucune date sélectionnée'}</span>
                        <button onClick={() => deleteTask(task.id)}>
                            <img src={rmIcon} alt="Supprimer" width="20" height="20" />
                        </button>
                        <button onClick={() => editTask(task.id, prompt('Nouveau nom de la tâche', task.name))}>
                            <img src={editIcon} alt="Modifier" width="20" height="20" />
                        </button>
                        <button onClick={() => startEditing(task)}> {}
                            <img src={calendarIcon} alt="Changer la date" width="20" height="20" />
                        </button>
                    </li>
                ))}
            </ul>
            {showCalendar && (
                <Calendar
                    onChange={changeDate}
                    value={selectedDate}
                />
            )}
        </div>
    );
}

export default TodoList;
