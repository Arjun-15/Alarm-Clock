var nowDate = new Date();
const convert2Digit = (x) => x.toString().length > 1 ? x : '0'+x;
const getZone = (x) => x-12 > 0 ? 'PM' : 'AM';
const convertTimeString = (x) => {
    const date = new Date(x);
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${hours-12 > 0?convert2Digit(hours-12) : convert2Digit(hours)} : ${convert2Digit(min)} : ${convert2Digit(sec)} ${convert2Digit(getZone(hours))}`;
}
const showTime = () =>{
    const showtimeContainer = document.getElementsByClassName('digital-clock')[0];
    const h2 = document.querySelector('#digital-time');
    const date = new Date();
    h2.textContent = convertTimeString(date);
    alarmlist.forEach(alarm=>{
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        const ampm = hour > 11 ? 'PM' : 'AM';
        if(alarm === `${convert2Digit(hour)}:${convert2Digit(min)}:${convert2Digit(sec)} ${ampm}`){
            debugger;
            const audio =document.createElement('audio');
            audio.src = '/mixkit-rooster-crowing-in-the-morning-2462.mp3';
            audio.play();
        }
    })
    if(date === '0:0:0')
        setAlarm();
}
setInterval(showTime, 1000);
const makeSelector = (selectorlist) => {
    const select = document.createElement('select');
    selectorlist.forEach(element => {
        const option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        select.appendChild(option);
    });
    return select;
}
const alarmlist = [];
const alremlist = document.querySelector('.alrem-list');
let countalarm = 0;
// Optional: Combine hours and minutes into a single array for easier looping
const setAlarm = () => {
    const inputSelect = inputtime.querySelectorAll('select');
    if(inputSelect > 3)
        return;
    const alarmTime = `${inputSelect[0].value}:${inputSelect[1].value}:${inputSelect[2].value} ${inputSelect[3].value}`;
    // const alarmTime = prompt('Enter the time for the alarm (HH:MM:SS AM/PM):');
    const currentTime = new Date();
    let alarm = new Date(`${currentTime.getMonth()}/${currentTime.getDate()}/${currentTime.getFullYear()} ${alarmTime}`);

    const timeToAlarm = alarm - currentTime;
    if (timeToAlarm < 0) {        
        alarm = new Date(`${currentTime.getMonth()}/${currentTime.getDate()+1}/${currentTime.getFullYear()} ${alarmTime}`);
    } 
    alarmlist.push(alarmTime);
       
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const button = document.createElement('button');
    div.appendChild(h1);
    div.appendChild(button);
    countalarm++;
    if(countalarm<15)
    alremlist.appendChild(div);
    if(countalarm === 14){
        div.textContent = '...';
        alremlist.appendChild(div);
    }
    h1.textContent = alarmTime;
    button.textContent = 'Delete';
    button.style.backgroundColor='red'
    button.addEventListener('click',deletediv);
}
function deletediv(){
    let ampm = this.parentElement.textContent.includes('AM') ? 'AM': this.parentElement.textContent.includes('PM') ? 'PM' :'am';
    const currentTime = new Date();
    const alarmTime = this.parentElement.textContent.split(' ')[0] +' '+ampm;
    let index = alarmlist.indexOf(alarmTime);
    this.parentElement.remove(this.previousSibling)
    this.parentElement.remove(this)
    if (index > -1) 
    alarmlist.splice(index, 1);
    countalarm--;
}
  
const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
const minutes = [...hours, '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
const sec = [...minutes];
const timeInterval = ['AM','PM']

const inputtime = document.querySelector('#input-time');
const colonspan = document.createElement('span');
colonspan.textContent = ' : ';
const colonspan1 = document.createElement('span');
colonspan1.textContent = ' : ';
const spacespan = document.createElement('span');
spacespan.textContent = '  ';
const hour = makeSelector(hours);
hour.value = hours[4];
const inputs = document.querySelector('.inputs');
inputs.appendChild(hour);
inputs.appendChild(colonspan);
inputs.appendChild(makeSelector(minutes));
inputs.appendChild(colonspan1);
inputs.appendChild(makeSelector(sec));
inputs.appendChild(spacespan);
inputs.appendChild(makeSelector(timeInterval));
const setAlarmbutton = document.createElement('button');
setAlarmbutton.id = 'setAlarmbutton';
setAlarmbutton.type='button';
setAlarmbutton.textContent='Set Alarm'
inputtime.appendChild(inputs);
inputtime.appendChild(setAlarmbutton);
setAlarmbutton.addEventListener('click',setAlarm);
setAlarmbutton.style.backgroundColor='green'
