/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner'
import Message from './Message'

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map((el) => el.country).includes(cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji }]
    } else {
      return acc
    }
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}
