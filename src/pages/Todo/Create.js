import { Formik } from "formik";
import 'firebase/firestore';
import { useHistory } from 'react-router';
import { useFirestore, useFirestoreDocData } from 'reactfire';

function Create() {
    const history = useHistory();
    const db = useFirestore();

    const formModel = {
        title: '',
        description: '',
        status: ''
    }

    const createTodo = (values) => {
        const data = {
            ...values,
            timestamp: new Date().getTime()
        }
        db.collection('todos').add(data).then(response => {
            history.push('/');
        }).catch(error => {
            console.error(error)
        });
    }


    return (
        <div>
            <h2 className="my-3">Create todo</h2>
            <Formik
                initialValues={formModel}
                onSubmit={(values) => {
                    createTodo(values);
                }}
            >
                {
                    ({values, handleSubmit, handleChange}) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" name="description" id="description" onChange={handleChange}></textarea>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="status" id="status" value='todo' onChange={handleChange} />
                                <label className="form-check-label" htmlFor="status">
                                    To do
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="status" id="status" value='completed' onChange={handleChange} />
                                <label className="form-check-label" htmlFor="status">
                                    Complete
                                </label>
                            </div>
                            <div className="from-group mt-3">
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    )
                }
            </Formik>
        </div>
    )
}

export default Create
