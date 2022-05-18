/* Global Variables */
// the weather api
const apikey = '2e10c38e6c44080b8edf03ad7b969558';
//the bottom of firing the event
const geneBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//-------------------------------------------------
// adding event listener to generating button
geneBtn.addEventListener('click',generatData);

// the call back function of generating data
function generatData(){
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  // check if the zipCode element has any value
  if (zipCode !== "") {
    // prepare the url for the weather api
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apikey}&units=imperial`;
    // start call the api to retrieve the data form the api server
    getWeatherData(url).then((data)=>{
      const temp = data["main"]["temp"];
      postData('/add',{date: newDate,
                      temp: temp,
                      userRes: feelings});
      // update the user interface with the data
      updateUserInterface();

    }).catch((err)=>{
      console.log("City Not Found Or Maybe Zip Code Not Right! check if it's the right one..",err)
    })
    
  } else {
    // setting warring message to the user
    document.getElementById("zip").focus();
    const dialogAlert = document.createElement("DIALOG");
    dialogAlert.innerText = "you must enter zipcode!"
    dialogAlert.setAttribute("open", "open");
    dialogAlert.style.cssText = "position:absolute;top:-50%; transform:translateY(-50%); transition: all 2s ease;"
    document.getElementById("app").appendChild(dialogAlert);
    setTimeout(()=>{
        dialogAlert.style.top = "50%";
        clearTimeout(this);
    },100);
    setTimeout(()=>{
      dialogAlert.style.top = "-50%";
      clearTimeout(this);
    },3000);
  }
}

// updating the user interface if the call request success
function updateUserInterface(){
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");
  retrieveData('/get').then((data)=>{
    date.textContent =  data.date ;
    temp.textContent = data.temp;
    temp.innerHTML += " <span>&#8457;</span>";
    content.textContent = "you are feeling " + data.userRes + " Today";
  })
  .catch((err)=>{
    console.log("some thing went wrong when trying to retrieve data from server ",err);
  })
}
// createing the GET request

// the api callback request
const getWeatherData = async (url__W)=> {
  const res = await fetch(url__W)
  try {
    const weather = await res.json();
    return weather
  } catch (err) {
    console.log(err)
  }
}
//-----------------------------------------------
// post data to projectData object 
const postData = async(url = '' , data = {})=> {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log("error: ", err);
  }
}
//-----------------------------------------------
// retrieve the data from the projectData object
const retrieveData = async(url = '')=> {
  const req = await fetch(url);
  try {
    const retrievedData  = await req.json();
    return retrievedData
  } catch (err) {
    console.log("error: ", err);
  }
}
//------------------------------------------------------------

