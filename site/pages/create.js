import React, {useState} from 'react';

function Create(){

    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: '',
    });

    const onChangeInput = e => setMeta({...meta, [e.target.name]: e.target.value});

    const sendMeta = async e => {
        e.preventDefault();
        console.log(meta);
        try{
            const res = await fetch('http://localhost:8080/api/v1/test', {
                method: 'POST',
                body: JSON.stringify(meta),
                headers: {'Content-Type': 'application/json'}
            });
            const responseSend = await res.json();

            
            console.log(responseSend.message);
            


        } catch(err){
            console.log('Error: error to create meta, try again');
        }
    }

    return(
        <>
            <h1>Ceate Meta!</h1>
            <br />

            <form onSubmit={sendMeta}>
                <label>Name: </label>
                <input type="text" name="name" id="name" placeholder="Meta name" onChange={onChangeInput}></input>
                <br /><br />

                <label>Description: </label>
                <input type="text" name="description" id="description" placeholder="Meta description" onChange={onChangeInput}></input>
                <br /><br />

                <label>Status: </label>
                <select name="status" id="status" onChange={onChangeInput}>
                    <option>Pendding</option>
                    <option>Done</option>
                </select>
                <br /><br />

                <button type="submit">Create</button>
            </form>
        </>
    );
}

export default Create;