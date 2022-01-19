import React, { useState, useEffect } from 'react'
import './App.css'
import { Alert, Container, Button } from 'react-bootstrap'
import Camera from './components/Camera'
import useVerifyCert from './components/useVerifyCert'
import ResultDisplay from './components/ResultDisplay'

// const qrcode = '{"alg":"sha256","kid":"9e9e5863-b900-4f2f-b572-c48ee4ddee75cwtG6ZL54We1MmE","iss":"ZAF","iat":"2021-12-03T18:55:37.790","exp":"3M","hcert":"eyJ2ZXJzaW9uIjoiMi4wIiwiaWRUeXBlIjoiUlNBSUQiLCJpZE1hc2siOiI4ODAyMTAqKioqKio2IiwiZmlyc3ROYW1lIjoiQWRyaWFuIEpvaG4iLCJzdXJuYW1lIjoiRnJpdGgiLCJkYXRlT2ZCaXJ0aCI6IjEwLUZlYi0xOTg4IiwiaW1tdW5pemF0aW9uRXZlbnRzIjpbeyJ2YWNjaW5lUmVjZWl2ZWQiOiJDb21pcm5hdHkiLCJ2YWNjaW5lRGF0ZSI6IjIwLUF1Zy0yMDIxIn0seyJ2YWNjaW5lUmVjZWl2ZWQiOiJDb21pcm5hdHkiLCJ2YWNjaW5lRGF0ZSI6IjA0LU9jdC0yMDIxIn1dLCJleHBpcnlEYXRlIjoiMDMtTWFyLTIwMjIifQ==","hashalg":"sha256","hash":"caed4092ce4cd4af205aa90653126b836ea94e2d2619fe7fb53ea71af24c11fa"}'

function App (): JSX.Element {
  const [qrcode, setQrcode] = useState<string | null>(null)
  const [error, setError] = useState<any>(null)

  const result = useVerifyCert(qrcode)

  const handleError = (error: any): void => {
    console.error('camera error', error)
    setError(error)
  }

  useEffect(() => {
    if (result?.valid === true) {
      console.log('ding')
    } else if (result?.valid === false) {
      console.log('boop')
    }
  }, [result])

  return (
    <Container className='mt-4 mb-8 narrow'>
      {error !== null ? <Alert variant='danger'>We experienced an error when trying to use your camera to scan for a QR code. Please check that you have allowed this site to use your camera.</Alert> : null}
      {result === null
        ? (
          <>
            <Camera onScan={setQrcode} onError={handleError} />
            <Alert variant='info' className='fs-5'>
              Scan a QR code with your camera.
              If you are asked, please allow this site to use your camera.
            </Alert>
          </>
          )
        : (
          <>
            <ResultDisplay result={result} />
            <Button variant='primary' className='my-3 py-3 w-100' onClick={(): void => { setQrcode(null) }}>Scan again</Button>
          </>
          )}
      <div className='fixed-bottom m-2 fst-italic'>
        This site is run by <a href='https://adrian.frith.dev/'>Adrian Frith</a>.
        It is not affiliated with the Department of Health.
        It does not store any of the information from scanned certificates.
      </div>
    </Container>
  )
}

export default App
