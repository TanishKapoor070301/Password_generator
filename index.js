const inputSlider=document.querySelector('[data-lengthSlider]');
console.log(inputSlider)

const lengthDisplay=document.querySelector('[data-lengthNumber]');

const passwordDisplay=document.querySelector('[data-passwordDisplay]');

const copyBtn=document.querySelector('[data-copy]');

const copyMsg=document.querySelector(' [data-copyMsg]');

const uppercaseCheck=document.querySelector('#uppercase');

const lowercaseCheck=document.querySelector('#lowercase');

const numberCheck=document.querySelector('#numbers');

const symbolsCheck=document.querySelector('#symbols');

const indicator=document.querySelector('[data-indicator]')

const generatebyn=document.querySelector('.generateButton')

const allCheckBox=document.querySelectorAll("input[type=checkbox]")

let symbolString="@#&$!*^%+-=?<>{}[]()/:;.,'"

let password="";
let passwordLength=10;
let checkCount=1;
lengthDisplay.innerHTML=passwordLength;
uppercaseCheck.checked=true;
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.textContent=passwordLength;
}


//when we generate pass give it strength color
function setIndicator(color){
    indicator.style.backgroundColor=color
}


//return random no from min to max .
function getRndInterger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRandomNumber(){
    return getRndInterger(0,9);
}

function getLowercase(){
    return String.fromCharCode(getRndInterger(97,123));
}

function getuppercase(){
    return String.fromCharCode(getRndInterger(65,91));
}
function getSymbol(){
    return symbolString.charAt(getRndInterger(0,symbolString.length))
}
// console.log(getSymbol())



function shufflePassword(sp){
    for(let i=sp.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=sp[i];
        sp[i]=sp[j];
        sp[j]=temp;
    }
    let str="";
    sp.forEach((ele)=>(str+=ele));
    return str;
}

//calcstrenght logic , it could be ur own
function calcStrength(){
    let hasUpper=false;
    let hasLower=true;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked){
        hasUpper=true;
    }
    if(lowercaseCheck.checked){
        hasLower=true;
    }
    if(numberCheck.checked){
        hasNum=true;
    }
    if(symbolsCheck.checked){
        hasSym=true;
    }

    if(hasUpper&&hasLower&&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator('#0f0')
    }
    else if((hasLower||hasUpper)&&(hasNum||hasSym)&&passwordLength>=6){
        setIndicator("#FFA500")
    }
    else{
        setIndicator('#FF0000')
    }

}


async function copyContent(){
    try{
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.textContent="copied";
            
    setTimeout(()=>{
                copyMsg.textContent="";
            },1000);
    }
    catch(e){
        copyMsg.textContent="not copied"

    }

    // copyMsg.classList.add("active");

    // setTimeout(()=>{
    //     copyMsg.classList.remove("active")
    // },2000);

}


inputSlider.addEventListener("input",(e)=>{
    passwordLength=e.target.value;
    handleSlider();

})



copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent()
    }

})


function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount=checkCount+1;
        }

    })



}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)


})



generatebyn.addEventListener("click",()=>{
    if(checkCount<=0){
            passwordDisplay.value='';

        return;
    }

        //1 rule
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();

    }

    //lets find password
    //remove p;d pass
    password='';

    // //lets put the stuff in password what requested
    // if(uppercaseCheck.checked){
    //     password+=getuppercase();
    // }


    // if(lowercaseCheck.checked){
    //     password+=getLowercase();
    // }


    // if(numberCheck.checked){
    //     password+=getRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password+=getSymbol();
    // }

    // let remaining=passwordLength-checkCount;
    // for(let i=0;i<remaining;i++){
    //     password+='i';

    // }



    let funcArr=[];
        if(uppercaseCheck.checked){
        funcArr.push(getuppercase);
    }


    if(lowercaseCheck.checked){
        funcArr.push(getLowercase);
    }


    if(numberCheck.checked){
        funcArr.push(getRandomNumber);
    }

    if(symbolsCheck.checked){
        funcArr.push(getSymbol);
    }


    //compulsaru addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let rnindex=getRndInterger(0,funcArr.length);
        password+=funcArr[rnindex]();

    }

    //here order of above mandetory is fixed 
    //shuffle all

    let sp=shufflePassword(Array.from(password))
    // password=shufflePassword(Array.from(password));

    passwordDisplay.value=sp;

    calcStrength()
    




})
 













