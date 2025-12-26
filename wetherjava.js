const wetherform= document.querySelector(".wetherform");
const cityinput= document.querySelector(".cityinput");
const box= document.querySelector(".box");
const apikey ="7fe949013d7b46925088f4d5dda46ea9";

wetherform.addEventListener("submit",  async event =>{
    event.preventDefault();

    const city= cityinput.value;

    if(city){
       try{
         const wetherdata = await getwethercity(city);
        wetherinfo(wetherdata);

       }catch(error){
        console.error(error);
        displayerror(error);


       }
    }else{
        displayerror("please Enter a city");
    }
})

async function getwethercity(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiurl);
    console.log(response);
    if(!response.ok){
        throw new error ("could not fetch wether data");
    }

    return await response.json();
}

function wetherinfo(data){
    const {name: city,
         main:{temp,humidity},
         weather:[{description,id}] }=data;

     box.textContent="";
     box.style.display="flex";

     const cityinput= document.createElement("h1");
     const tempdisplay= document.createElement("p");
     const humiditydisplay= document.createElement("p");
     const descdisplay= document.createElement("p");
     const emojidisplay= document.createElement("h1");

     cityinput.textContent= city;
     tempdisplay.textContent=`${((temp -273.15).toFixed(1)) } °c`;
     humiditydisplay.textContent=`humidity ${humidity}`;
     descdisplay.textContent=description;
     emojidisplay.textContent=wetherimg(id);

    cityinput.classList.add("h1");
    tempdisplay.classList.add("temprature");
    humiditydisplay.classList.add("humidity");
    descdisplay.classList.add("decdisplay");
    emojidisplay.classList.add("emoji");


     box.appendChild(cityinput)
    box.appendChild(tempdisplay);
    box.appendChild(humiditydisplay);
    box.appendChild(descdisplay);
    box.appendChild(emojidisplay);

}

function wetherimg(weatherid){
    switch(true){
        case(weatherid>=200 && weatherid< 300):
        return "⛈️";
         case(weatherid>=300 && weatherid< 400):
        return "🌨️";
         case(weatherid>=500 && weatherid< 600):
        return "🌧️";
         case(weatherid>=600 && weatherid< 700):
        return "❄️";
        case(weatherid>=700 && weatherid< 800):
        return "🌫️";
        case(weatherid===800):
        return "☀️";
        case(weatherid>=801 && weatherid< 810):
        return "☁️";
        default:
            return"🛸";
    }
}

function displayerror(messsage){
    const error =document.createElement("p")
    error.textContent=messsage;
    error.classList.add("errordisplay");

    box.textContent="";
    box.style.display= "flex";
    box.appendChild(error)

}
