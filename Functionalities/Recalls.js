export function DisplayAlert(){
    
}

export function CollectAnswer() {
    let startTime = Date.now()
    return new Promise(resolve => {
        const container = document.getElementById("container");

        const input = document.createElement("input");
        input.placeholder = "Input your Answer";
        input.type = "number";
        input.classList.add("answer");

        const button = document.createElement("button");
        button.textContent = "Submit";
        button.classList.add("answer")

        container.append(input, button);
        input.focus()

        button.addEventListener("click", () => {
            let stopTime = Date.now()
            let time = ((stopTime-startTime)/1000).toFixed(2)

            timeSpent.push(time)
            console.log(time)
            
            const value = parseFloat(input.value);

            input.remove();
            button.remove();

            resolve(value);
        });
        input.addEventListener("keydown",(ev) => {
            if(ev.key==="Enter"|| ev.key===" "){
                ev.preventDefault

                let stopTime = Date.now()
                timeSpent.push(stopTime-startTime)
                console.log((stopTime-startTime)/1000)
                
                const value = parseFloat(input.value);

                input.remove();
                button.remove();

                resolve(value);
            }
            
        })
    });
}