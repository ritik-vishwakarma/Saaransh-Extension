const summary=document.getElementById("summary")
const majorPoints=document.getElementById("majorPoints")
const content=document.getElementById("content")
const loading=document.getElementById("loading")
const copy=document.getElementById("copy")
const heading=document.getElementById("heading")


var URL=null

/* Current Opened Tab URL extraction */
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    URL = tabs[0].url;
});

/* Summary Function */
const summaryFunc=()=>{
    loading.style.display="block"
    copy.style.display="none"
    heading.style.display="none"
    copy.innerText="Copy to Clipboard"
    content.innerText=""
    fetch("http://127.0.0.1:3000/getsummary",{
        method:"POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "url":URL
        }),
    }).then((data)=>{
        return data.json()
    }).then((data2)=>{
        loading.style.display="none"
        console.log(data2.summary)
        content.innerText=data2.summary
        heading.innerText="SUMMARY"
        heading.style.display="block"
        content.style.display="block"
        copy.style.display="block"
    }).catch((e)=>{
        loading.style.display="none"
        window.alert("Error Occured!")
        console.log(e)
    })
}
summary.addEventListener('click',summaryFunc)

/* Major Point Funtion */
const majorPointsFunc=()=>{
    loading.style.display="block"
    copy.style.display="none"
    heading.style.display="none"
    copy.innerText="Copy to Clipboard"
    content.innerText=""
    fetch("http://127.0.0.1:3000/getmajorpoints",{
        method:"POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "url":URL
        }),
    }).then((data)=>{
        return data.json()
    }).then((data2)=>{
        loading.style.display="none"
        console.log(data2.majorPoints)
        content.innerText=data2.majorPoints
        heading.innerText="MAJOR POINTS"
        heading.style.display="block"
        content.style.display="block"
        copy.style.display="block"
    }).catch((e)=>{
        loading.style.display="none"
        window.alert("Error occured")
        console.log(e)
    })
}
majorPoints.addEventListener('click',majorPointsFunc)

/* Copy Function */
const copyFunc=()=>{
    if (content.innerText) {
      let inputEle=document.createElement("input")
      inputEle.setAttribute("value",content.innerText)
      document.body.appendChild(inputEle)
      inputEle.select()
      document.execCommand("copy")
      inputEle.parentNode.removeChild(inputEle)
      copy.innerText = "Copied!"
    }
  };
copy.addEventListener('click',copyFunc)