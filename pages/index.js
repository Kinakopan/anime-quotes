import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <Head>
        <title>Welcome to Anime Quotes</title>
        <meta name="description" content="This is a website that you can search Anime quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Mio Takagi" />

        <link rel="icon" href="/favicon.ico" alt="favicon image by Icons8 (https://icons8.com)"/>
      </Head>
      <main className={`${styles.main} ${styles.main_home}`}>
        <span className={`${styles.bgImg} ${styles.bgImg_home}`}></span>

        <Link className={styles.logo} href="/">
          <Image src="/logo.png" width={60} height={60} alt="logo image by Icons8 (https://icons8.com)"/>
        </Link>

        <div className={`${styles.wrapper} ${styles.wrapper_home}`}>

          <h1 className={styles.title}>
            Anime Quotes
          </h1>

          <Link
            className={`${styles.click} ${styles.homeLink}`}
            href="/quote"
            >
            Search The Quotes by Anime Name!
          </Link>
        </div> {/* .wrapper */}
      </main>
    </>
  )
}
