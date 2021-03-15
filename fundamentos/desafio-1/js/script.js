window.addEventListener('load', start);

const inputNome = document.querySelector('#nome');
const buttonBuscar = document.querySelector('#buscar');
const filteredUsers = document.querySelector('#filteredUsers');
const detailsFilteredUsers = document.querySelector('#detailsFilteredUsers');
const totalUsuarios = document.querySelector('#totalUsuarios');
let searchUsers = null;
let arrayUsuario = [];
let objectUsuario = [];
let objectSearchUsuario = [];
let totalMasculino = 0;
let totalFeminino = 0;
let somaIdades = 0;
let mediaIdades = 0;

function start() {
    verificaInput();
    buscaUsuario();
}

function verificaInput() {
    inputNome.addEventListener('input', (event) => {
        searchUsers = inputNome.value;
        if (inputNome.value.length >= 1) {
            buttonBuscar.removeAttribute('disabled');
        } else {
            buttonBuscar.setAttribute('disabled', 'disabled');
        }
    });
}

function factoryUsers(arrayUsuario) {
    const usuarios = arrayUsuario.map((user) => {
        return {
            'nome': user.name.first,
            'sobrenome': user.name.last,
            'genero': user.gender,
            'idade': user.dob.age,
            'imagem': user.picture.thumbnail
        }
    });
    return usuarios;
}

async function buscaUsuario() {
    const usuario = await fetch('http://localhost:3001/users');
    arrayUsuario = await usuario.json();
    objectUsuario = factoryUsers(arrayUsuario);
    verificaBusca(objectUsuario);
}

function verificaBusca(objectUsuario) {

    inputNome.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            resolveSearchUsers(objectUsuario, event);
        }
    });

    buttonBuscar.addEventListener('click', (event) => {
        resolveSearchUsers(objectUsuario, event);
    });

    if (objectSearchUsuario.length === 0) {
        filteredUsers.innerHTML = 'Nenhum usuário filtrado';
        detailsFilteredUsers.innerHTML = 'Nada a ser exibido';
    } 
}

function resolveSearchUsers(objectUsuario, event) {
    event.preventDefault();
    objectSearchUsuario = objectUsuario.filter((person) => {
        return person.nome.toLowerCase().includes(searchUsers.toLowerCase()) || person.sobrenome.toLowerCase().includes(searchUsers.toLowerCase());
    });

    if (objectSearchUsuario.length == 0) {
        totalUsuarios.innerHTML = '';
        filteredUsers.innerHTML = 'Nenhum usuário filtrado';
        detailsFilteredUsers.innerHTML = 'Nada a ser exibido';
    } else {
        if (objectSearchUsuario.length != 0) {
            totalUsuarios.innerHTML = `${objectSearchUsuario.length} usuário(s) encontrado(s)`;
        }
        
        renderUserListFiltered(objectSearchUsuario);
        renderDetails(objectSearchUsuario);
    }
}

function renderDetails() {

    totalMasculino = objectSearchUsuario.filter((user) => {
        return user.genero === 'male';
    }).length;

    totalFeminino = objectSearchUsuario.filter((user) => {
        return user.genero === 'female';
    }).length;

    somaIdades = objectSearchUsuario.reduce((acc, atual) => {
        return acc + atual.idade;
    }, 0);

    mediaIdades = (somaIdades / objectSearchUsuario.length).toFixed(2);

    const details = `
        <h4>Estatísticas</h4>
        <div class='filtered-details'>
            Sexo masculino: <strong>${totalMasculino}</strong> <br />
            Sexo feminino: <strong>${totalFeminino}</strong> <br />
            Soma das idades: <strong>${somaIdades}</strong> <br />
            Média das idades: <strong>${mediaIdades}</strong> <br />
        </div>
    `;

    detailsFilteredUsers.innerHTML = details;

}

function renderUserListFiltered() {
    let filteredUsersHtml = '<div>';

    objectSearchUsuario.forEach(users => {

        let {nome, sobrenome, idade, imagem} = users;

        const filteredUserHtml = `
            <div class='listUsers'>
                <div class='filtered-users'>
                    <img src="${imagem}" alt="${nome}">
                    ${nome} ${sobrenome}, ${idade} anos 
                </div>
            </div>
        `;

        filteredUsersHtml += filteredUserHtml;

    });

    filteredUsers.innerHTML = filteredUsersHtml;
}