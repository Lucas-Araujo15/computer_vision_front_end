import { ChangeEvent, useState } from 'react'
import './App.css'
import { api } from './lib/axios'
import ResultBox from './components/ResultBox'

interface ResponseData {
  identifiedClass: string
  confidence: string
}

function App() {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [response, setResponse] = useState<ResponseData>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function sendImage(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData()

    if (file !== null) {
      form.append('image', file)

      await api.post('/upload', form).then((response) => {
        if (response.status === 200) {
          const data = response.data as ResponseData
          setResponse(data)
          setIsModalOpen(true)
        } else {
          alert("Error uploading the image")
        }
      }).catch(err => console.log(err))

      console.log(response)
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    if (e.target.files !== null) {
      setFile(e.target.files[0])
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <div className='image-box'>
        <h1 className='title'>Selecionar imagem</h1>
        {
          fileUrl === null ?
          <div className='image-not-found'>
              <p>Nenhuma imagem selecionada</p>
            </div>
            :
            <div className='preview-image'>
              <img className='image' src={fileUrl} alt="" />
            </div>
        }

        <ResultBox isModalOpen={isModalOpen} confidence={Math.floor(Number(response?.confidence) * 100)} identifiedClass={response?.identifiedClass}/>

        <form className='actions' onSubmit={sendImage}>
          <label className='btn-file' htmlFor='input-file'>Escolher arquivo</label>
          <input type="file" name='input-file' id='input-file' onChange={handleChange} />
          <button className='submit-button' type='submit' style={fileUrl === null ? { display: 'none' } : { display: 'block' }}>Enviar</button>
        </form>
      </div>
    </>


  )
}

export default App
