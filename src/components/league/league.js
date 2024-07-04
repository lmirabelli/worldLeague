

export const League = () => {

    
    fetch('http://localhost:3001/database/leagues.json')
        .then(response => {response.json()
            console.log(response)
        })
        
        .then(leagues => {
            console.log('si')
        })

    return(
        <h1>
            ACA VAN LAS LIGAS
        </h1>
    )
}