import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { VerifyResult, VerificationError } from 'verify-za-vaccine-cert'

const vaxNames: Record<string, string> = {
  Comirnaty: 'Pfizer (Comirnaty)',
  Janssen: 'J&J (Janssen)'
}

const basicError = <>That is <span className='fw-bold text-danger'>not</span> a valid COVID-19 vaccination certificate.</>

const errorMessages: Record<VerificationError, JSX.Element> = {
  [VerificationError.InvalidJson]: basicError,
  [VerificationError.MissingField]: basicError,
  [VerificationError.InvalidHash]: <>{basicError} It may be an old Version 1 certificate, in which case please download a new Version 2 certificate from <a href='https://vaccine.certificate.health.gov.za/' target='_blank' rel='noreferrer'>the VCS</a>.</>,
  [VerificationError.CertFormat]: basicError,
  [VerificationError.ApiBadResponse]: <>That <span className='fw-bold text-warning'>looks like</span> a valid COVID-19 vaccination certificate, but we couldn't communicate with the Health Department server to verify it. Please check your internet connection.</>,
  [VerificationError.ApiBadJson]: <>That <span className='fw-bold text-warning'>looks like</span> a valid COVID-19 vaccination certificate, but we couldn't communicate with the Health Department server to verify it. Please check your internet connection.</>,
  [VerificationError.ApiNotValid]: <>{basicError} It looks like one, but the Health Department server says it is invalid.</>
}

const ResultDisplay = ({ result }: { result: VerifyResult }): JSX.Element => {
  if (result.valid) {
    const { cert } = result
    return (
      <div className='fs-4'>
        That is a <span className='fw-bold text-success'>valid</span> South
        African COVID-19 vaccine certificate.
        <Container className='mt-2'>
          <Row>
            <Col xs={5} className='fw-bold'>Name:</Col>
            <Col>{cert.firstName} {cert.surname}</Col>
          </Row>
          <Row>
            <Col xs={5} className='fw-bold'>ID:</Col>
            <Col>{cert.idMask}</Col>
          </Row>
          {cert.immunizationEvents.map((e: any, idx: number) => (
            <Row key={e.vaccineDate}>
              <Col xs={5} className='fw-bold'>Vaccine {idx + 1}:</Col>
              <Col>
                {vaxNames[e.vaccineReceived] ?? e.vaccineReceived}<br />
                on {e.vaccineDate}
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    )
  } else {
    return (
      <div className='fs-4'>
        {errorMessages[result.reason]}
      </div>
    )
  }
}

export default ResultDisplay
