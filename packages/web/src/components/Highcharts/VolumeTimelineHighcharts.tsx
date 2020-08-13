import {
  getVolumeTimeHighchartsConfig,
  RootState,
  TotalEmailSentDatum,
} from '@klonzo/common'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { useSelector } from 'react-redux'

// https://www.highcharts.com/demo/line-time-series

interface Props {
  title: string
  data: Array<TotalEmailSentDatum>
  handleClick: (date: string) => void
}
export default function VolumeTimelineHighcharts({
  title,
  data,
  handleClick,
}: Props) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getVolumeTimeHighchartsConfig(
        useSelector((state: RootState) => state.darkMode),
        title,
        data,
        useSelector((state: RootState) => state.darkMode)
          ? '#303030'
          : '#FAFAFA',
        handleClick
      )}
    />
  )
}
