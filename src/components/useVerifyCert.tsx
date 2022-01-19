import { useState, useEffect } from 'react'
import { verifyCert, VerifyResult } from 'verify-za-vaccine-cert'

const useVerifyCert = (qrcode: string | null): any => {
  const [result, setResult] = useState<VerifyResult | null>(null)

  useEffect(() => {
    if (qrcode !== null) {
      const doVerify = async (): Promise<void> => {
        try {
          const result = await verifyCert(qrcode, {
            endpointUrl: '/ms/rs/verification/verify2_0/'
          })
          setResult(result)
        } catch (err) {
          console.log(err)
        }
      }

      void doVerify()
    } else {
      setResult(null)
    }
  }, [qrcode])

  return result
}

export default useVerifyCert
