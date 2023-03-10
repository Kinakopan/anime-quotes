import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import record from '../data/animequotes.json'
import { useState, useEffect } from 'react'

export default function Quote() {
  const [capResult, setCapResult] = useState('Default');
  const [inputValue, setInputValue] = useState('Default');
  const [searchResult, setSearchResult] = useState('Default');
  const [filterState, setFilterState] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [resultHeading, setResultHeading] = useState('');
  const [resultQuotes, setResultQuotes] = useState([]);

  const showAll = async () => {
    setCapResult('ALL')
    setSearchResult('Default')
  }

  const handleBlur = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCapResult('Default')
    const ResultString = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setCapResult(ResultString);
    setSearchResult(inputValue.toLowerCase());
    let result = record.filter((e)=>{
      if(e.Anime.toLowerCase() === searchResult){
        return true
      }
    })

    if(result.length > 0){
      setResultQuotes(searchResult);
      console.log('result is: ', result)
      console.log('resultQuotes is: ', resultQuotes)
      console.log('searchResult is: ', searchResult)
    }
    return { capResult, searchResult };
  }
  console.log('returned searchResult is: ', searchResult)
  console.log('returned resultQuotes is: ', resultQuotes)

  useEffect(() => {
    handleColor(capResult, searchResult, setFilterState, setBgColor, setResultHeading);
  }, [capResult, searchResult]);

  function handleColor(capResult, searchResult, setFilterState, setBgColor, setResultHeading) {
    if(capResult !== 'Default' && searchResult == 'Default') {
      setFilterState('invert(1)');
      setBgColor('rgb(11 30 59)');
      setResultHeading('white');
    } else if (searchResult !== 'Default') {
      setFilterState('hue-rotate(319deg)');
      setBgColor('rgb(255 218 213)');
    }
  };

  return (
    <>
      <Head>
        <title>Anime Quote Search Page</title>
        <meta name="description" content="You can either see all the Anime quotes, or look up by Anime name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Mio Takagi" />

        <link rel="icon" href="/favicon.ico" alt="favicon image by Icons8 (https://icons8.com)"/>
      </Head>
      <main
        className={`${styles.main} ${styles.main_quote}`}
        style={{backgroundColor: `${bgColor}`}}>
        <span
          className={`${styles.bgImg} ${styles.bgImg_quote}`}
          style={{filter:`${filterState}`}}></span>

        <Link className={styles.logo} href="/">
          <Image src="/logo.png" width={60} height={60} alt="logo image by Icons8 (https://icons8.com)"/>
        </Link>

        <div className={`${styles.wrapper} ${styles.wrappe_quote}`}>

          <div className={styles.btnContainer}>
            <button
              className={`${styles.click} ${styles.submitBtn}`}
              onClick={() => showAll()}>
                SHOW ALL
            </button>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
              >
              <input
                className={styles.AnimenameInput}
                type="text"
                placeholder='Enter Anime Name'
                onBlur={handleBlur}
                />
                <button
                  className={`${styles.click} ${styles.submitBtn}`}
                  type="submit">SEARCH
                </button>
            </form>
          </div>

          <div className={styles.animeNameList_container}>
            {
              [...new Set(record.map(rec => rec.Anime))].map((animeName, index, array) => {
                const isLast = index === array.length - 1;
                // Check if it's the last element
                const comma = isLast ? '' : ',';
                // Add comma if it's not the last element
                return (
                  <div className={styles.animeNameList_wrapper} key={index}>
                    <ul className={styles.list}>
                      <li className={styles.animeName}>
                        {animeName}{comma}
                      </li>
                    </ul>
                  </div>
                );
              })
            }
          </div>

          {
            capResult == 'ALL' ? <h1 style={{color: `${resultHeading}`}} className={styles.title}>ALL Quotes</h1> : resultQuotes === searchResult ? <h1 className={styles.title}>{capResult}</h1> : <></>
          }

          <div className={styles.return_body}>
            {
              record.map( (rec, index) => {
                return (
                  <div className={styles.return_wrapper}>
                    {
                      capResult == 'ALL'
                      ? //Show all data
                        <ul
                          key={index}
                          className={styles.list}>
                          <li className={styles.list_anime}>
                            {rec.Anime}
                          </li>
                          <li className={styles.list_character}>
                            {rec.Character}
                          </li>
                          <li className={styles.list_quote}>
                            "{rec.Quote}"
                          </li>
                        </ul>
                        ://Only when there is an Anime matching with input
                          rec.Anime.toLowerCase() == searchResult
                          ?//Show that inputted Anime data
                            <ul
                              key={index}
                              className={styles.list}>
                              <li className={styles.list_character}>
                                  {rec.Character}
                              </li>
                              <li className={styles.list_quote}>
                                  "{rec.Quote}"
                              </li>
                            </ul>
                            ://Show nothing
                              <></>
                      }
                  </div>
                )

              })
            }
          </div>


        </div> {/* .wrapper */}
      </main>
    </>
  )
}
