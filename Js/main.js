// ------------ Globle------------
let apiResponse = [],
    calcWdith = $('.tabMenu').innerWidth(),
    reuseIcon = document.getElementById('icon'),
    byWordInput = document.getElementById('byWord'),
    searchInput = document.getElementById('search'),
    searchInputResult = '',
    byWordInputResult = byWordInput.value,
    userName = document.getElementById("name"),
    userEmail = document.getElementById("email"),
    userPhone = document.getElementById("phone"),
    userAge = document.getElementById("age"),
    userPassword = document.getElementById("password"),
    userRePassword = document.getElementById("rePassword"),
    userNameAlert = document.getElementById("namealert"),
    userEmailAlert = document.getElementById("emailalert"),
    userPhoneAlert = document.getElementById("phonealert"),
    userAgeAlert = document.getElementById("agealert"),
    userpasswordAlert = document.getElementById("passwordalert"),
    userRepasswordAlert = document.getElementById("repasswordalert");
// ------------ End Globle------------
// ------------ Api Connecting ------------

(async function getApiMovies() {
    let myApi = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=c7d85eddc11720e4dcd6f6ae40d56a39`),
        myApiJeson = await myApi.json(),
        finalApi = myApiJeson.results;
    apiResponse = finalApi;
    displayApi();
}) ();
function displayApi(movielist) {
    let apiPackageData = ``;
    for (let i = 0;i < apiResponse.length ; i++)
    {
        if (apiResponse[i].title === undefined)
        {
            apiPackageData += `
        <div class="col-md-4 py-2 justify-content-center position-relative rounded-3">
            <div class="content-movie rounded-3">
                <img src="https://image.tmdb.org/t/p/w500${apiResponse[i].poster_path}" alt="" class="w-100">
                <div class="movie-blur p-3 d-flex justify-content-center align-items-center w-100 h-100">
                    <div class="blur-info text-center p-2 w-100 h-100">
                        <h2 class="py-3">${apiResponse[i].original_name}</h2>
                        <p class="py-3">${apiResponse[i].overview}</p>
                        <p>rate : ${apiResponse[i].vote_average}</p>
                        <p>${apiResponse[i].release_date}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        }
        else
        {
            apiPackageData += `
        <div class="col-md-4 py-2 justify-content-center position-relative rounded-3">
            <div class="content-movie rounded-3">
                <img src="https://image.tmdb.org/t/p/w500${apiResponse[i].poster_path}" alt="" class="w-100">
                <div class="movie-blur p-3 d-flex justify-content-center align-items-center w-100 h-100">
                    <div class="blur-info text-center p-2 w-100 h-100">
                        <h2 class="py-3">${apiResponse[i].title}</h2>
                        <p class="py-3">${apiResponse[i].overview}</p>
                        <p>rate : ${apiResponse[i].vote_average}</p>
                        <p>${apiResponse[i].release_date}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        }
    }
    document.getElementById('displayApiData').innerHTML = apiPackageData;
}

$('.list a[id]').click(async function (e) {
    let idTarget = $(e.target).attr('id');
    if (idTarget == 'trending') {
        await getApiMovies('trending/all/day');
    }
    else {
        await getApiMovies(`movie/${idTarget}`);
    }
});
// ------------ End Api Connecting ------------
// ------------ Jquery ------------
$('.sideNav').css('left', '-211px');
$('.toggelMenu i').click(function () {
    if ($('.sideNav').css('left') == '0px')
    {
        $('.sideNav').animate({ left: `-${calcWdith}` }, 400);
        reuseIcon.classList.replace('fa-xmark', 'fa-align-justify');
    }
    else
    {
        $('.sideNav').animate({ left: '0px' }, 400);
        reuseIcon.classList.replace('fa-align-justify', 'fa-xmark');
    }
})

$("a[href^='#']").click(function (e) {
    let link = $(e.target).attr('href'),
        SectionOffset = $(link).offset().top;
    $('html,body').animate({scrollTop : SectionOffset} , 50)
    
})
// ------------ End Jquery-----------
// ------------ Search Function ------------
function search(searchTerm) {
    for (let i = 0;i<apiResponse.length ;i++)
    {
        let searchResult = [];
        if (apiResponse[i].original_name.toLowerCase().includes(searchTerm.toLowerCase())== true)
        {
            searchResult.push(apiResponse[i]);
            displayApi(searchResult);
        }
    };
    $('searchInput').on('input', function (e) {
        let searchValue = e.target.value;
        search(searchValue);
    })
};
searchByApiWord();
async function searchByApiWord() {
    let myMovies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c7d85eddc11720e4dcd6f6ae40d56a39&language=en-US&page=1&include_adult=true&query=${byWordInputResult}`),
        myMoviesResponse = await myMovies.json(),
        moviesResults = myMoviesResponse.results;
    displayApi(moviesResults);
}
byWordInput.addEventListener('input', function () {
    searchByApiWord();
})
// ------------ End Search Function ------------
// ------------ ReGex Function ------------
function validName() {
    let regex = /^[a-zA-Z0-9]+$/;
    userName.addEventListener('focus', function () {
        userNameAlert.classList.replace('d-none', 'd-block');
        userName.classList.add('is-invalid');
    })
    userName.addEventListener('input', function () {
        if (regex.test(userName.value) == true)
        {
            userName.classList.replace('is-invalid' , 'is-valid');
            userNameAlert.classList.replace('d-block', 'd-none');
            return true;
        }
        else
        {
            userName.classList.replace('is-valid' , 'is-invalid');
            userNameAlert.classList.replace('d-none', 'd-block');
        }
    })
}
function validEmail() {
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    userEmail.addEventListener('focus', function () {
        userEmailAlert.classList.replace('d-none' , 'd-block')
        userEmail.classList.add('is-invalid');
    })
    userEmail.addEventListener('input', function () {
        if (regex.test(userEmail.value) == true)
        {
            userEmail.classList.replace('is-invalid', 'is-valid');
            userEmailAlert.classList.replace('d-block', 'd-none');
            return true;
        }
        else
        {
            userEmail.classList.replace('is-valid', 'is-invalid');
            userEmailAlert.classList.replace('d-none', 'd-block');
        }
    })
}
function validPhone() {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    userPhone.addEventListener('focus', function () {
        userPhoneAlert.classList.replace('d-none', 'd-block');
        userPhone.classList.add('is-invalid');
    })
    userPhone.addEventListener('input', function () {
        if (regex.test(userPhone.value) == true)
        {
            userPhone.classList.replace('is-invalid' , 'is-valid');
            userPhoneAlert.classList.replace('d-block', 'd-none');
            return true;
        }
        else
        {
            userPhone.classList.replace('is-valid' , 'is-invalid');
            userPhoneAlert.classList.replace('d-none', 'd-block');
        }
    })
}
function validAge() {
    let regex = /^[1-9][0-9]?$|^100$/;
    userAge.addEventListener('focus', function () {
        userAgeAlert.classList.replace('d-none', 'd-block');
        userAge.classList.add('is-invalid');
    })
    userAge.addEventListener('input', function () {
        if (regex.test(userAge.value) == true)
        {
            userAge.classList.replace('is-invalid' , 'is-valid');
            userAgeAlert.classList.replace('d-block', 'd-none');
            return true;
        }
        else
        {
            userAge.classList.replace('is-valid' , 'is-invalid');
            userAgeAlert.classList.replace('d-none', 'd-block');
        }
    })
}
function validPassword() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    userPassword.addEventListener('focus', function () {
        userpasswordAlert.classList.replace('d-none', 'd-block');
        userPassword.classList.add('is-invalid');
    })
    userPassword.addEventListener('input', function () {
        if (regex.test(userPassword.value) == true)
        {
            userPassword.classList.replace('is-invalid' , 'is-valid');
            userpasswordAlert.classList.replace('d-block', 'd-none');
            return true;
        }
        else
        {
            userPassword.classList.replace('is-valid' , 'is-invalid');
            userpasswordAlert.classList.replace('d-none', 'd-block');
        }
    })
}
function validRePassword()
{
    userRePassword.addEventListener('focus', function () {
        userRePassword.classList.add('is-invalid');
        userRepasswordAlert.classList.replace('d-none', 'd-block');
    })
    userRePassword.addEventListener('input', function () {
        if (userRePassword.value === userPassword.value)
        {
            userRePassword.classList.replace('is-invalid', 'is-valid');
            userRepasswordAlert.classList.replace('d-block', 'd-none');
            return true;
        }
        else
        {
            userRePassword.classList.replace('is-valid' , 'is-invalid');
            userRepasswordAlert.classList.replace('d-none', 'd-block');
        }
    })
}
validName();
validEmail();
validPhone();
validAge();
validPassword();
validRePassword();
// ------------ End ReGex Function ------------

