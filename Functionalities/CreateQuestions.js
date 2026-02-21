const editor = document.getElementById('editor')

window.tf.createWidget('gHV5PQpR', {
    container: editor,
    hideHeaders: true,
    hideFooter:true,
    onSubmit: function (response) {
        console.log('Typeform response:', response)
        const question1 = response.answers[0].text
    }
})