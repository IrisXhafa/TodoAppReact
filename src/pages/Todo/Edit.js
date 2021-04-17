import 'firebase/firestore';
import { useParams, useHistory } from 'react-router';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Formik } from 'formik';

function Edit() {
    const db = useFirestore();
    const history = useHistory();
    const { id } = useParams()

    let todoRef = useFirestore().collection('todos').doc(id);

    const { status, data } = useFirestoreDocData(todoRef);

    if (data === undefined) {
        history.push('/');
    }

    const updateTodo = (id, values) => {
        let todoRef = db.collection('todos').doc(id);
        todoRef.update(values);
        history.push('/');
    }


    return (
        <div>
            <h2>{data?.title || ""}</h2>
            
            <Formik
                initialValues={data || {}}
                onSubmit={(values, { setSubmitting }) => {
                    updateTodo(id, values);
                    setSubmitting(false);
                }}
            >
                {
                    ({values, handleSubmit, handleChange, isSubmitting}) => (
                        <form className="my-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" className="form-control" onChange={handleChange} value={values.title}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" name="description" id="description" value={values.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="status" id="status" value='todo' onChange={handleChange} checked={values.status === 'todo'} />
                                <label className="form-check-label" htmlFor="status">
                                    To do
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="status" id="status" value='completed' onChange={handleChange} checked={values.status === 'completed'} />
                                <label className="form-check-label" htmlFor="status">
                                    Complete
                                </label>
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting} >Edit</button>
                                <button type="button" className="btn btn-info ml-2" disabled={isSubmitting} onClick={() => {
                                    history.push("/");
                                }}>Go back</button>
                            </div>
                        </form>
                    )
                }
            </Formik>

            
        </div>
    )
}

export default Edit
