import LinearProgressWithLabel from '../ConfidenceBar'
import './style.css'

interface ResultModalProps {
  isModalOpen: boolean
  confidence: number
  identifiedClass: string | undefined
}

export default function ResultBox({ isModalOpen, identifiedClass, confidence }: ResultModalProps) {
  return (
    <div style={isModalOpen === false ? { display: 'none' } : { display: 'block' }} className='result-box'>
      <div>
        <h2>Classe encontrada:</h2>
        <p>{identifiedClass}</p>
      </div>
      <div>
        <h2>Confiança:</h2>
        <LinearProgressWithLabel value={confidence} />
      </div>
    </div>
  )
}