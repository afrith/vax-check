import { useState, useEffect } from 'react'
import { verifyCert, VerifyResult } from 'verify-za-vaccine-cert'

const useVerifyCert = (qrcode: string | null): { loading: boolean, result: any } => {
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<VerifyResult | null>(null)

  useEffect(() => {
    if (qrcode !== null) {
      setLoading(true)

      const doVerify = async (): Promise<void> => {
        try {
          const result = await verifyCert(qrcode, {
            endpointUrl: 'https://lrwt8ix8v0.execute-api.af-south-1.amazonaws.com/prod'
          })
          setResult(result)
        } catch (err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
      }

      void doVerify()
    } else {
      setResult(null)
      setLoading(false)
    }
  }, [qrcode])

  return { loading, result }
}

export default useVerifyCert
