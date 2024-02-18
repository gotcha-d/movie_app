import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const bbb = () => {
  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          BBB
        </h2>
      }>
      <Head>
          <title>Laravel - Dashboard</title>
      </Head>

    </AppLayout>
  )
}

export default bbb