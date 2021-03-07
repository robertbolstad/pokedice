import { useState, useEffect } from 'react';
import { baseUrl } from '../components/settings/Api';
import axios from 'axios'

const Game = () => {

    const [pokemonOne, setPokemonOne] = useState('mew')
    const [pokemonTwo, setPokemonTwo] = useState('mewtwo')

    const [pokemonOneData, setPokemonOneData] = useState()
    const [pokemonTwoData, setPokemonTwoData] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [playerHp, setPlayerHp] = useState()
    const [enemyHp, setEnemyHp] = useState()

    const [gameStart, setGameStart] = useState(false);

    const [render, setRender] = useState()

    const attack = 5;

    useEffect(() => {
        const fetchPokemon = async () => {
            try{
                const getPokemonOne = await axios.get(`${baseUrl}${pokemonOne}`);

                if (getPokemonOne.status === 200) {
                    setPokemonOneData(getPokemonOne.data)
                }else{
                    setError('An error occured')
                }
                const getPokemonTwo = await axios.get(`${baseUrl}${pokemonTwo}`);

                if (getPokemonTwo.status === 200) {
                    setPokemonTwoData(getPokemonTwo.data)
                }else{
                    setError('An error occured')
                }
            } catch (error) {
                setError(error.toString())
            } finally {
                setLoading(false)
            }
        };

        fetchPokemon();
    }, [render, gameStart]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    function renderFunc() {
        setRender(Math.random())
    }

    function startGameFunc() {
        setPlayerHp(pokemonOneData.base_experience)
        setEnemyHp(pokemonTwoData.base_experience)
        setGameStart(true)
    }

    function play (button) {
        button.disabled = true;
        const power = (Math.random() * 5 | 0) + 1
        const hpDrain = attack * power;
        const critiacl = hpDrain + 10;

        if (hpDrain == 25) {
            console.log(critiacl);
            setEnemyHp(enemyHp - critiacl)
            
        }else{
            console.log(hpDrain);
            setEnemyHp(enemyHp - hpDrain)
        }
        setTimeout(function(){
            loader.style.display = "block";
            textOutput.innerHTML = `${enemy.name} turn`
        },2000);
        
        setTimeout(function(){
            const power = (Math.random() * 5 | 0) + 1
            const hpDrain = attack * power;
            const critiacl = hpDrain + 10
            if (hpDrain == 25) {
                console.log(critiacl);
                playerHp = playerHp - critiacl;
                calculateHp()
                textOutput.innerHTML = `Critacl hit ${critiacl} on ${player.name}`
                
            }else{
                console.log(hpDrain);
                playerHp = playerHp - hpDrain;
                calculateHp()
                textOutput.innerHTML = `${enemy.name} hit ${hpDrain} on ${player.name}`
            }
        },5000);
        setTimeout(function(){
            button.disabled = false;
            loader.style.display = "none";
            textOutput.innerHTML = "Your turn"
        },8000);
        
    }

    if (gameStart) {
        return (
            <div className="game">
                <h1>Game</h1>
                <div className="game__container">
                    <div className="game__players">
                        <div className="game__player">
                            <img src={pokemonOneData.sprites.front_default} alt={pokemonOne.name}/>
                            <p className="game__player-name">{pokemonOneData.name}</p>
                            <p className="game__player-hp">HP: {playerHp}</p>
                        </div>
                        <div className="game__enemy">
                            <img src={pokemonTwoData.sprites.front_default} alt={pokemonTwo.name}/>
                            <p className="game__enmey-name">{pokemonTwoData.name}</p>
                            <p className="game__enemy-hp">HP: {enemyHp}</p>
                        </div>
                    </div>
                    <div class="loader">
                        <div class="loader__spin"></div>
                    </div>
                    <div>Your Turn</div>
                    <button onClick={event => play(event.currentTarget)}>play</button>
                </div>
            </div>

        )
    }

    return (
        <div className="game">
            <h1>Game</h1>
            <div className="game__container">
                <div className="game__players">
                    <div className="game__player">
                        <img src={pokemonOneData.sprites.front_default} alt={pokemonOne.name}/>
                        <p className="game__player-name">{pokemonOneData.name}</p>
                        <p className="game__player-hp">HP: {pokemonOneData.base_experience}</p>
                        <div>
                            <input onChange={event => setPokemonOne(event.target.value)}className="game__search" type="search" name="search" id=""/>
                            <button onClick={renderFunc}>search</button>
                        </div>
                    </div>
                    <div className="game__enemy">
                        <img src={pokemonTwoData.sprites.front_default} alt={pokemonTwo.name}/>
                        <p className="game__enmey-name">{pokemonTwoData.name}</p>
                        <p className="game__enemy-hp">HP: {pokemonTwoData.base_experience}</p>
                        <div>
                            <input onChange={event => setPokemonTwo(event.target.value)} className="game__search" type="search" name="search" id=""/>
                            <button onClick={renderFunc}>search</button>
                        </div>
                    </div>
                </div> 
                <button onClick={startGameFunc}>Start Game</button>
            </div>
        </div>
    )
}

export default Game
