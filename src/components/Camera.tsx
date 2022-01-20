import React from 'react'
import QrReader from 'react-qr-reader'

interface CameraProps {
  onScan: (data: string) => void
  onError: (error: any) => void
}

const Camera = ({ onScan, onError }: CameraProps): JSX.Element => {
  const handleScan = (newData: string | null): void => {
    if (newData !== null) {
      onScan(newData)
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
