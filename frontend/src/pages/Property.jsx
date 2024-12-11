import React from 'react'
import { useQuery } from 'react-query'
import { getProperty } from '../utils/api'
import { useLocation } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'

const Property = () => {
  const { pathname } = useLocation()
  const id = pathname.split("/").slice(-1)[0]
  const { data, isLoading, isError} = useQuery(
    ["resd", id],
    () => getProperty(id)
  )
  if (isError) {
    return (
      <div>
        <span>Error while fetchin data</span>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    )
  }
  return (
    <div>Property</div>
  )
}
