import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

interface CameraProps {
  onScan: (data: string) => void
  onError: (error: any) => void
}

const Camera = ({ onScan, onError }: CameraProps): JSX.Element => {
  const [data, setData] = useState<string | null>(null)

  const handleScan = (newData: string | null): void => {
    if (newData !== null && newData !== data) {
      onScan(newData)
      setData(newData)
    }
  }

  return (
    <QrReader
      className='viewfinder'
      delay={300}
      facingMode='environment'
      onError={onError}
      onScan={handleScan}
    />
  )
}

export default Camera
