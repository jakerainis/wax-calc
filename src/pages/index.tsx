import { FunctionComponent, useState } from 'react'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

import Input from 'components/Input'
import styles from 'styles/Home.module.css'
import { FormData, FormField } from 'types/FormData'

const { LOAD, WAX } = FormField

const Home: FunctionComponent = () => {
  const { handleSubmit, getValues, register } = useForm<FormData>({ defaultValues: { [LOAD]: '10', [WAX]: '16' } })
  const [frag, setFrag] = useState<number>(0.625)

  const calculate = ({ load, wax }: FormData) => {
    setFrag(parseFloat((parseFloat(wax) / parseFloat(load)).toFixed(2)))
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Fragrance Load Calculator</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fragrance Load Calculator</h1>
        <form onChange={handleSubmit(calculate)}>
          <Input defaultValue={10} getValues={getValues} id={LOAD} label="Desired Load (%)" register={register} />
          <Input defaultValue={1} getValues={getValues} id={WAX} label="Wax Used (oz)" register={register} />
          <div>
            Fragrance Needed: {frag}oz ({(frag / 16).toFixed(2)}lb)
          </div>
        </form>
      </main>
    </div>
  )
}

export default Home
