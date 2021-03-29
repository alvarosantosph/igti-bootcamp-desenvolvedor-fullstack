import {promises as fs} from 'fs';

async function returnStates() {
    const data = await fs.readFile('./files/Estados.json');
    const states = JSON.parse(data);
    return states;
};

async function returnCities() {
    const data = await fs.readFile('./files/Cidades.json');
    const cities = JSON.parse(data);
    return cities;
};

async function createFiles() {
    const statesArrayObjects = await returnStates();
    const citiesArrayObjects = await returnCities();
    for (let state of statesArrayObjects) {
        const stateCities = citiesArrayObjects.filter(city => city.Estado === state.ID);
        fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(stateCities));
    }
}

async function getCitiesCount(uf) {
    const data  = await fs.readFile(`./states/${uf}.json`);
    const cities = JSON.parse(data);
    return cities.length;
}

async function getStatesWithMoreOrLessCities(more) {
    const states = await returnStates();
    const list = [];
    for (let state of states) {
        const count = await getCitiesCount(state.Sigla);
        list.push({uf: state.Sigla, count});
    }
    list.sort((a, b) => {
        return b.count - a.count;
    });
    const result = [];
    
    if (more) {
        list.slice(0, 5).forEach(item => result.push(`${item.uf} - ${item.count}`)); // More
    } else {
        list.slice(-5).forEach(item => result.push(`${item.uf} - ${item.count}`)); // Less
    }

    return result;
}

async function getBiggerOrSmallerNameCities(bigger) {
    const states = await returnStates();
    const result = [];
    for (let state of states) {
        let city;
        if (bigger) {
            city = await getBiggerName(state.Sigla);
        } else {
            city = await getSmallerName(state.Sigla);
        }
        result.push(`${city.Nome} - ${state.Sigla}`);
    }
    return result;
}

async function getBiggerName(uf) {
    const cities  = JSON.parse(await fs.readFile(`./states/${uf}.json`));
    let result;
    cities.forEach(city => {
        if (!result) {
            result = city;
        } else if (city.Nome.length > result.Nome.length) {
            result = city;
        } else if ((city.Nome.length === result.Nome.length) && (city.Nome.toLowerCase() < result.Nome.toLowerCase())) {
            result = city;
        }
    });
    return result;
}

async function getSmallerName(uf) {
    const cities  = JSON.parse(await fs.readFile(`./states/${uf}.json`));
    let result;
    cities.forEach(city => {
        if (!result) {
            result = city;
        } else if (city.Nome.length < result.Nome.length) {
            result = city;
        } else if ((city.Nome.length === result.Nome.length) && (city.Nome.toLowerCase() < result.Nome.toLowerCase())) {
            result = city;
        }
    });
    return result;
}

async function getBiggerOrSmallerCityName(bigger) {
    const states = await returnStates();
    const list = [];
    for (let state of states) {
        let city;
        if (bigger) {
            city = await getBiggerName(state.Sigla);
        } else {
            city = await getSmallerName(state.Sigla);
        }
        list.push({name: city.Nome, uf: state.Sigla});
    }
    const result = list.reduce((prev, current) => {

        if (bigger) {
            if (prev.name.length > current.name.length) {
                return prev;
            } else if (prev.name.length < current.name.length) {
                return current;
            } else {
                return prev.name.toLowerCase() < current.name.toLowerCase() ? prev : current;
            }
        } else {
            if (prev.name.length < current.name.length) {
                return prev;
            } else if (prev.name.length < current.name.length) {
                return current;
            } else {
                return prev.name.toLowerCase() < current.name.toLowerCase() ? prev : current;
            }
        }
    });

    return `${result.name} - ${result.uf}`;
}

export default {createFiles, getCitiesCount, getStatesWithMoreOrLessCities, getBiggerOrSmallerNameCities, getBiggerOrSmallerCityName};

