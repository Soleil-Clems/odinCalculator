const keys = document.querySelectorAll('.all_keys')
const screen = document.getElementById('screen')
const back = document.getElementById('back')
const reset = document.getElementById('reset')
const equal = document.getElementById('equal')
const onOff = document.getElementById('on-off')

let operations = []
let block=""
let operators = ["+", "-", "*", "/", "%"]
let avoid = ["+", "*", "/", "%"]
let printScreen =operations.join('')

// functions to disabled or enabled button  the calculator
function switchOn() {
    keys.forEach(key=>{
        key.removeAttribute("disabled")
    })
}

function switchOff() {
    keys.forEach(key=>{
        key.setAttribute("disabled", true)
    })
}

switchOff()

// when we click on onOff we switch on or swicth of the calculator

onOff.addEventListener('click', ()=>{
    if (onOff.classList[0]=='off') {

        switchOn()
        onOff.classList.remove('off')
        onOff.classList.add('on')
        screen.style.opacity=1
        operations=[]
        block=''
        screen.innerText=''

    } else {

        onOff.classList.remove('on')
        onOff.classList.add('off')
        screen.style.opacity=.2
        operations=[]
        block=''
        screen.innerText=''
        switchOff()
        
    }
})

const multiplication =()=>{
    let length=operations.length
    let result=0

    for (let index = 0; index < length; index++) {

        if (operations.includes('*')) {
            let i =operations.indexOf('*');
            result = Number(operations[i-1])* Number(operations[i+1]);
            operations.splice(i-1, 3, result)
            
        }else{
            break
        }
        
        
    }
    
}

const division =()=>{
    let length=operations.length
    let result=0
    for (let index = 0; index < length; index++) {
        if (operations.includes('/')) {
            let i =operations.indexOf('/');
            result = Number(operations[i-1])/ Number(operations[i+1]);
            operations.splice(i-1, 3, result)
        }else{
            break
        }
        
        
    }

}

const addition =()=>{
    let length=operations.length
    let result=0
    for (let index = 0; index < length; index++) {
        if (operations.includes('+')) {
            let i =operations.indexOf('+');
            result = Number(operations[i-1])+ Number(operations[i+1]);
            operations.splice(i-1, 3, result)
        }else{
            break
        }
        
        
    }
    
}

const soustraction =()=>{
    let length=operations.length
    let result=0
    for (let index = 0; index < length; index++) {
        if (operations.includes('-')) {
            let i =operations.indexOf('-');
            result = (Number(operations[i-1]))+ (- Number(operations[i+1]));
            operations.splice(i-1, 3, result)
            
        }else{
            break
        }
        
        
    }
    
}

const remainder =()=>{
    let length=operations.length
    let result=0
    for (let index = 0; index < length; index++) {
        if (operations.includes('%')) {
            let i =operations.indexOf('%');
            result = (Number(operations[i-1]))% (Number(operations[i+1]));
            operations.splice(i-1, 3, result)

        }else{
            
            break
        }


    }

}

keys.forEach(key =>{ 

    key.onclick = () =>{
        // Verification que la valeur saisie est un operateur ou pas. Si ce n'est pas un operateur, la valeur est chaque fois ajoutee a let block
        // si c'est un operateur, la variable block ajoute son contenu dans le tableau operations[]
        if (operators.includes(key.value)) {

            verifBlock()
            let lastValue = operations[operations.length-1]
            
            // Si operations[] du contenu et que le dernier contenu n'est pas un operateur on ajoute l'operateur sinon, rien ne se passe
            if ((operations.length > 0) && operators.includes(lastValue)) {
                
            } else {
                block= key.value
                if (operators.includes(block)) {
                    operations.push(block)
                    block = ''
                }else{
                    block = ''
                }
                printScreen =operations.join('')
                screen.innerText=printScreen
                
                
            }
            
        } else {
            
            block += key.value
            
        }
        printScreen =operations.join('')
        screen.innerText=printScreen +  block


    }

    
})

back.onclick = () => {
    verifBlock()
    if (operations !='') {
        if (operations.length==1) {
            let oneValue = operations[0].toString()
            let element = [];
            for (let index = 0; index < oneValue.length; index++) {
                element[index] = oneValue[index];
                
            }

            if (element.length >0) {
                element.pop()
                console.log(element.length,element);
                if (element.length ==0) {
                    operations = []
                    console.log('zeeero',operations.length,operations);
                }else{
                    operations[0] =element.join('')

                }
            }
        } else {
            let selectedValue = operations[operations.length-1].slice(0, -1)
            operations.pop()
            if (selectedValue !='') {
            
            operations.push(selectedValue)
        }
        }
    }
    printScreen =operations.join('')
    screen.innerText=printScreen
}

reset.onclick= ()=>{
    operations = []
    block=''
    printScreen ='0'
    screen.innerText=printScreen
}

equal.onclick = () =>{
    verifBlock()
    if (avoid.includes(operations[0])) {
        operations.shift()
    }else if(operations[0]=='-'){
        operations.shift()
        let firstValue= -Number(operations[0])
        operations[0]=firstValue
        
    }

    if (operators.includes(operations[operations.length-1])) {
        operations.pop()
    }
    multiplication()
    division()
    soustraction()
    addition()
    remainder()
    if (isNaN(operations[0])) {
        printScreen ="Syntaxe Error"
        screen.innerText=printScreen
        block=''
        operations=[]
    } else {
        printScreen =operations.join('')
        screen.innerText=printScreen
        
    }
}


function verifBlock() {
    if (block !='') {
        operations.push(block)
        block = ''
        
    }

}