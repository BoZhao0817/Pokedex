//function to fetch data
//this function get all the info of pokemon list
export async function getAllPokemon(url){
    return new Promise((resolve,reject) =>{
        fetch(url)
            .then(res => res.json())
            .then(data =>{
                resolve(data);
            })
    })
}

//this function get info of each pokemon from pokemon.results
export async function getPokemon(url){
    return new Promise((resolve, reject) => {
        //iterating all the url {name: "ivysaur", url: "https://pokeapi.co/api/v2/po......
        fetch(url)
            .then(res => res.json())
            .then(data =>{
                resolve(data)
            })

    })
}