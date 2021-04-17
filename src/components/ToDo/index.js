import 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFirestore } from 'reactfire';

function ToDo() {
    const history = useHistory();
    const db = useFirestore();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        db.collection('todos').orderBy('timestamp', 'desc').get().then(response => {
            const data = [];
            response.docs.map(doc => {
                let todo = {
                    id: doc.id,
                    ...doc.data()
                }
                data.push(todo);
            });

            setTodos(data)
        }).catch(error => {
            console.error('error: ', error);
        })
    }

    const createToDo = () => {
        history.push("/todo/create");
    }

    const deleteTodo = (id) => {
        let todoRef = db.collection('todos').doc(id);

        todoRef.delete();

        // get todos
        getTodos();
    }

    const completeTodo = (id) => {
        let todoRef = db.collection('todos').doc(id);

        todoRef.update({
            status: 'completed'
        });

        getTodos();
    }

    const renderUncompletedTodos = (todo) => {
        if (todo.status === 'todo') {
            return (
                <div className="card mb-3" key={todo.id}>
                    <div className="card-body">
                        <h5 className="card-title">{todo.title}</h5>
                        <p className="card-text">{todo.description}</p>
                        <button className="btn btn-primary mr-2" onClick={() => { completeTodo(todo.id) }}>Complete</button>
                        <Link to={`/todo/${todo.id}`} className="btn btn-warning mr-2">Edit</Link>
                        <button className="btn btn-danger mr-2" onClick={() => { deleteTodo(todo.id) }}>Delete</button>
                    </div>
                </div>
            );
        }
    }

    const renderCompletedTodos = (todo) => {
        if (todo.status === 'completed') {
            return (
                <div className="card mb-3" key={todo.id}>
                    <div className="card-body">
                        <h5 className="card-title">{todo.title}</h5>
                        <p className="card-text">{todo.description}</p>
                        <Link to={`/todo/${todo.id}`} className="btn btn-warning mr-2">Edit</Link>
                        <button className="btn btn-danger mr-2" onClick={() => { deleteTodo(todo.id) }}>Delete</button>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => createToDo()}>Add to do</button>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="bg-secondary p-2 rounded">
                        <h5 className="text-center text-light mb-3">Todos</h5>

                        <div className="bg-white py-2 px-1 mh-100 overflow-auto">
                            {
                                todos.length > 0 ?
                                    <>
                                        {
                                            todos.map(todo => (
                                                renderUncompletedTodos(todo)                                                
                                            ))
                                        }
                                    
                                    </>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-success p-2 rounded">
                        <h5 className="text-center text-light mb-3">Completed</h5>

                        <div className="bg-white py-2 px-1 mh-100 overflow-auto">
                            {
                                todos.length > 0 ?
                                    <>
                                        {
                                            todos.map(todo => (
                                                renderCompletedTodos(todo)                                                
                                            ))
                                        }
                                    
                                    </>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ToDo
