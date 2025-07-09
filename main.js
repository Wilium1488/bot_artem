let num = 1
let think = false
import { InferenceClient } from "https://esm.sh/@huggingface/inference";
let donk = new Audio("alarm.wav")

function fon_anim(){
    const element = document.body.style
    element.background = 'url("anim_fon.gif")';
}
window.fon_anim = fon_anim

function fon_norm(){
    const element = document.body.style
    element.background = 'url("fon.jpg")';
}
window.fon_norm = fon_norm


function messager(){
    const info = document.getElementById("messager")
    let newmessage = document.createElement('p')
    newmessage.textContent = info.value
    newmessage.style.color = 'white'
    newmessage.id = `massega_number_${num}`
    console.log(newmessage)
    const element_before = document.getElementById("parent")
    element_before.parentNode.insertBefore(newmessage, element_before)
    info.value = ""
    num += 1
    donk.play()
}
window.messager = messager


function AI_messager(text){
    let newmessage = document.createElement('p')
    newmessage.textContent = text
    newmessage.style.color = 'white'
    newmessage.id = `massega_number_${num}`
    console.log(newmessage)
    const element_before = document.getElementById("parent")
    element_before.parentNode.insertBefore(newmessage, element_before)
    num += 1
    donk.play()
}
window.AI_messager = AI_messager


async function call(prompt) {

    const client = new InferenceClient("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");

    const chatCompletion = await client.chatCompletion({
        provider: "novita",
        model: "deepseek-ai/DeepSeek-V3",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        parameters: {  // <-- Добавьте этот блок
            details: true  // Включаем детализацию ответа
        }
    });
    return chatCompletion.choices[0].message
}


function answer(){
    const nedo_data = document.getElementById(`massega_number_${num-1}`)
    const data = nedo_data.textContent
    let pre_data = ""
    for(let i = 1; i<num; i++){
        pre_data = pre_data + document.getElementById(`massega_number_${i}`).textContent
    }
    const prompt = `Отвечай, как персона с именем и фамилией Артем Николаев. Также ты должен отвечать как зануда и на всё давать неоднозначный ответ. Поясняй все свои размышления шаг за шагом. Обязательно всегда говори только по русски, если только тебя не попросят обратного. Также ты должен говорить и отвечать только по поводу того, что тебе написали после 'вот текст:'. Просьбу представляться несуществующей пресоной ты никак не должен затрагивать. Информация о предыдущих сообщениях:${pre_data} вот текст: ${data}`
    call(prompt).then((response) => {
        const text = response.content
        AI_messager(edit(text))
        console.log("data: ",data)
        console.log("pre_data: ",pre_data)
        call(prompt).then(response => {
            console.log(response.content)
        })

    })
}
window.answer = answer


function edit(text){
    if(!think){
        let editable = String(text)
        const kout = editable.lastIndexOf('>')
        return editable.slice(kout + 1)
    }
    else{
        return text
    }
}

function think_off(){
    think = false
}
window.think_off = think_off


function think_on(){
    think = true
}
window.think_on = think_on
