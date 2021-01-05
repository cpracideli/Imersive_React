function Home({data}) {
    return (
        <>
            <h1>Metas</h1>
            <p>{console.log(data.metas)}</p>
            {
                data.metas.map(meta => (
                    <div key={meta._id} >
                        <h4>{ meta.name }</h4>
                        <p>{meta.description}</p>
                        <p>{meta.status}</p>
                        <hr/>
                    </div>
                ))
            }
        </>
    );
}

export async function getServerSideProps(){

    const response = await fetch('http://localhost:8080/api/v1/test');
    const data = await response.json();

    //console.log(data);

    return{
        props: {data}
    };
}

export default Home;