import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout'
import '../styles/globals.scss';
import 'tailwindcss/tailwind.css';

function myApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps}/>
      </Layout>
  )
}

export default myApp
