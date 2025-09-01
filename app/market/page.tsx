"use client";
import { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

const BINANCE_ENDPOINT =
  'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m';

export default function CandleChart() {
  const chartContainerRef = useRef();
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const fetchCandlestickData = async () => {
      try {
        const response = await fetch(BINANCE_ENDPOINT);
        const data = await response.json();

        const formattedData = data.map((item) => ({
          time: item[0] / 1000, // milliseconds to seconds
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));

        setCandlestickData(formattedData);
      } catch (error) {
        console.error('Error fetching Binance data:', error);
      }
    };

    fetchCandlestickData();
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || candlestickData.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        textColor: 'white',
        background: { type: 'solid', color: 'black' },
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      borderVisible: false,
    });

    candlestickSeries.setData(candlestickData);
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [candlestickData]);

  return (
    <div
      style={{
        width: '75%',
        height: '85vh',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5vh', // vertical spacing
      }}
    >
      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
