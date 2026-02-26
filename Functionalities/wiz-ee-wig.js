document.addEventListener("DOMContentLoaded",() => {
  AdminNavigation()
})

document.getElementById("content-template").addEventListener("submit",(ev) => {
  ev.preventDefault()
  let content = tinymce.get("mytextarea").getContent()
  let form =  ev.target
  // let test = form.querySelector("[name = 'sourceMaterialName']")
  // console.log(test.value)
  let payload = ProcessPayload(content,form)
  AddSourceMaterial(payload)
  
})

const editorCredentials = {
    selector: '#mytextarea',
    images_upload_handler: function(blobInfo){
    return new Promise((resolve,reject) =>{

        var formData = new FormData()
        formData.append("file",blobInfo.blob())

        fetch("https://localhost:57561/api/Media/UploadMedia",{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`
          },
          body: formData
        }).then(response => {

          if(!response.ok){
            console.log("A server error occured")
          }
          return response.json()

        }).then(payload => {

          resolve(payload.location)
          
        }).catch(error => {

          console.log("Error"+error.message)
          reject(error.message)

        })

      })
    },
    automatic_uploads:true,
    plugins: [
      // Core editing features
      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'save', 'preview','image',
      // Your account includes a free trial of TinyMCE premium features
      // Try the most popular premium features until Feb 17, 2026:
      // 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', /*'uploadcare',*/ 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
    ],

    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare image | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | save | preview',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
    // uploadcare_public_key: '720f50de8a866476046a',
  }

tinymce.init(editorCredentials);



async function AddMedia(blobInfo){
  console.log("inside upload function")
    return new Promise((resolve,reject) =>{

        var formData = new FormData()
        formData.append("file",blobInfo.blob())

        fetch("https://localhost:57561/api/Media/UploadMedia",{
          method:"POST",
          headers:{
            // "Authorization":`Bearer ${sessionStorage.getItem("token")}`
          },
          body: formData
        }).then(response => {

          if(!response.ok){
            console.log("A server error occured")
          }
          return response.json()

        }).then(payload => {

          resolve(payload.location)
          
        }).catch(error => {

          console.log("Error"+error.message)
          reject(error.message)

        })

      })
}

function ProcessPayload(content,form){
  let formData = new FormData()

  formData.append("content",content)
  formData.append("SourceMaterialName",form.querySelector("[name = 'sourceMaterialName']").value)
  formData.append("category",form.querySelector("[name = 'category']").value)
  formData.append("description",form.querySelector("[name = 'Description']").value)
  formData.append("createdOn",new Date().toISOString())

//  formData.forEach((value,key) => {
//   console.log(`value: ${value} + key: ${key}`)
//  })
 return formData
}

function PromptToAddQuestions(){
  const shouldProceed = window.confirm(
    "source material saved successfully.\nwould you like to proceed to add questions for this material"
  )

  if(shouldProceed){
    window.location.href = "/Pages/TempQuestionPage.html"
    return
  }

  window.location.reload()
}

async function AddSourceMaterial(payload){
  try {
    let request = await fetch("https://localhost:57561/api/SourceMaterial/AddNewSourceMaterial",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${sessionStorage.getItem("token")}`
    },
    body:payload
  })

  if(!request.ok){
    throw new Error("Unable to save source material")
  }

  let response = await request.json()
  console.log(response.data)
  sessionStorage.setItem("sourceId",response.data)
  PromptToAddQuestions()

  } catch (error) {
    console.log(error)
  }
}

function AdminNavigation(){
  let content = `
  <nav class="admin-nav">
    <ul class="admin-nav-list">
      <li class="admin-nav-item"><a href="/Pages/wiz-ee-wig.html">Create Content(WYSIWYG) </a></li>
      <li class="admin-nav-item"><a href="/Pages/Admin/Content_Creation.html">Create Content(Casual) </a></li>
      <li class="admin-nav-item"><a href="/Pages/Admin/User_Management.html">Get Learners</a></li>
    </ul>
  </nav>

  <style>
    .admin-nav{
      max-width: 20%;
      background-color: #1a3e5e;
    }

    .admin-nav-list{
      display: flex;
      flex: 1;
      justify-content: flex-start;
      flex-direction: column;
      list-style: none;
    }

    .admin-nav-item{
      margin: 5px;
      padding: 10px;
    }

      .admin-nav-item:hover{
        background-color: var(--primary-button-color);
        border-radius: 10px;
      }

    a{
      text-decoration: none;
      color: white;
      font-size: 25px;
    }
  </style>
  `
  document.body.insertAdjacentHTML("afterbegin",content)
}

